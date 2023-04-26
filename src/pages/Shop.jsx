import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import CommonSection from '../components/UI/CommonSection'
import { Helmet } from '../components/helmet/Helmet'
import { Container, Row } from "reactstrap"

import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import {db} from '../firebase_setup/firebase';

import '../styles/shop.css'

import ProductsList from '../components/UI/ProductsList';


export const Shop = () => {
  const location = useLocation()
  let searchQuery = null
  let searchArray = null

    if (location.pathname === "/search") {
      searchQuery = decodeURIComponent(location.search).substring(3)
      searchArray = searchQuery.toLowerCase().split(' ')
      if (searchQuery.length > 74) {
        searchQuery = searchQuery.substring(0, 72) + '...'
      }
    }
  
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState(null);
  const [filterValue, setFilterValue] = useState('');
  const [sortValue, setSortValue] = useState('featured');

  const {id} = useParams();
  let title;
  let q

  if (id === undefined && (searchQuery === '')) {
    if (items.length === 1) {
      title = "1 Result found"
      q = query(collection(db, "items"))
    } else {
      title = `${items.length} Results found`
      q = query(collection(db, "items"))
    }
  }
  else if (id === undefined && searchQuery != null) {
    if (items.length === 1) {
      title = `1 Result found for '${searchQuery}'`
    } else {
      title = `${items.length} Results found for '${searchQuery}'`
    }
    q = query(collection(db, "items"), where("searchArray", "array-contains", searchArray[0]))
  }
  else if (id === 'all') {
    title = 'All products'
    q = query(collection(db, "items"))
  }
  else if (id === '4kuhd') {
    title = '4K Ultra HDs'
    q = query(collection(db, "items"), where("format", "==", "4K Ultra HD"))
  } 
  else if (id === 'bluray') {
    title = 'Blu-rays'
    q = query(collection(db, "items"), where("format", "==", "Blu-ray"))

  }
  else if (id === 'cd') {
    title = 'CDs'
    q = query(collection(db, "items"), where("format", "==", "CD"))

  }
  else if (id === 'bfi') {
    title = 'BFI collections'
    q = query(collection(db, "items"), where("label", "==", "BFI"))

  }
  else {
    title = id.charAt(0).toUpperCase() + id.slice(1)
    q = query(collection(db, "items"), where("label", "==", title))
    title = title + ' collections'
  }

  const [loading, setLoading] = useState(true);
  const fetchItems = async () => {
    setLoading(true);
    await getDocs(q)
        .then((querySnapshot) => {
            const newData = querySnapshot.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }))
                .sort((a, b) => {
                    const aTime = new Timestamp(a.createdAt.seconds, a.createdAt.nanoseconds).toDate();
                    const bTime = new Timestamp(b.createdAt.seconds, b.createdAt.nanoseconds).toDate();
                    return bTime - aTime;
                }); // Sort by createdAt field
            
            setItems(newData);
            // console.log(items, newData);
            if (newData) {
              let searchItems = newData
              if (searchArray && searchArray.length > 1) {
                searchItems = newData.filter(item => {
                  for (let i = 0; i < searchArray.length; i++) {
                    
                    if (searchArray[i] !== '' && !item.searchArray.includes(searchArray[i])) {
                      return false;
                    }
                  }
                  return true;
                });
                setItems(searchItems)
              }
            }
            setLoading(false)
        });
  }
  



  useEffect(()=>{
    setItems([])
    fetchItems();
    setFilteredItems(null);
    setFilterValue('');
    setSortValue('featured')
  }, [id])
  useEffect(()=>{
    setItems([])
    fetchItems();
    setFilteredItems(null);
    setFilterValue('');
    setSortValue('featured')
  }, [searchQuery])


  const sortFilteredItems = function(arr, order) {
    if (order === 'featured') {
      setFilteredItems(arr.sort((a, b) => {
        const aTime = new Timestamp(a.createdAt.seconds, a.createdAt.nanoseconds).toDate();
        const bTime = new Timestamp(b.createdAt.seconds, b.createdAt.nanoseconds).toDate();
        return bTime - aTime;
      }))
    }
    else {
      let num = -1
      if (order === 'descending') {num = 1}
      setFilteredItems(arr.sort((a, b) => {
        let titleA = a.title.toLowerCase();
        let titleB = b.title.toLowerCase();
      
        // Ignore 'the' at the beginning of the title
        const wordsA = titleA.split(' ');
        const wordsB = titleB.split(' ');
        if (wordsA[0] === 'the') {
          titleA = wordsA.slice(1).join(' ');
        }
        if (wordsB[0] === 'the') {
          titleB = wordsB.slice(1).join(' ');
        }
      
        // Compare the modified titles
        if (titleA < titleB) {
          return num;
        }
        if (titleA > titleB) {
          return -num;
        }
        return 0;
      }));
    }
  }



  const handleFilter = e => {
    setFilterValue(e.target.value)
    if (e.target.value === 'all' || e.target.value === '' ) {
        sortFilteredItems(items, sortValue)
    }
    else if (e.target.value === '4K Ultra HD') {
      setFilteredItems(items.filter(item => item.format === '4K Ultra HD'))
    }
    else if (e.target.value === 'Blu-ray') {
      setFilteredItems(items.filter(item => item.format === 'Blu-ray'))
    }
    else if (e.target.value === 'CD') {
        setFilteredItems(items.filter(item => item.format === 'CD'))
    }
  }

  const handleSort = e => {
    setSortValue(e.target.value)
    if (filteredItems === null) {
      sortFilteredItems(items, e.target.value)
    } else {
      sortFilteredItems(filteredItems, e.target.value)
    }
    
  }

  

  return (
    <>
      {searchQuery === null ? (
        <>
        <Helmet title={title}></Helmet>
        <CommonSection title={title} />
        </>
      ) : (
        loading ? (
          <>
            <Helmet title="Loading results..."></Helmet>
            <CommonSection title="Loading results..." />
          </>
        ) : (
          <>
            <Helmet title={title}></Helmet>
            <CommonSection title={title} />
          </>
        )
          
        
        
      )}
      
      <section className='filter_and_sort'>
        
              <div className="filter_widget">
                <h6>Format</h6>
                <select onChange={handleFilter} value={filterValue}>
                  <option>Filter by Format</option>
                  <option value="all">All formats</option>
                  <option value="4K Ultra HD">4K Ultra HD</option>
                  <option value="Blu-ray">Blu-ray</option>
                  <option value="CD">CD</option>
                </select>
              </div>
           
              <div className="sort_widget">
                <h6>Sort by</h6>
                <select onChange={handleSort} value={sortValue}>
                  <option value="featured">Featured</option>
                  <option value="ascending">Alphabetically, A-Z</option>
                  <option value="descending">Alphabetically, Z-A</option>
                </select>
              </div>
            
      </section>
      <section className="product_list">
        <Container>
          <Row>
            {
              loading ? (
                <p className='loading'>Fetching the latest product information...</p>
              ) :
              !filteredItems ? (
                items.length === 0 ? (
                  searchArray === null ? (
                    <p className='notFound'>No products are found!</p>
                  ) : (
                    <p className='notFound'>Sorry, we can't find any results for that keyword. Please check your spelling or try another search term.</p>
                  )
                ) : (
                  <ProductsList items={items} />
                )
              ) : (
                
                filteredItems.length === 0 ? (
                  searchArray === null ? (
                    <p className='notFound'>No products are found!</p>
                  ) : (
                    <p className='notFound'>Sorry, we can't find any results for that keyword. Please check your spelling or try another search term.</p>
                  )
                ) : (
                  <ProductsList items={filteredItems} />
                )
              )
              
            
            
            }
          </Row>
        </Container>
      </section>
    </>
  )
}

