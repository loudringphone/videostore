import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import CommonSection from '../components/UI/CommonSection'
import { Helmet } from '../components/helmet/Helmet'
import { Container, Row } from "reactstrap"

import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import {db} from '../firebase_setup/firebase';

import '../styles/shop.css'

import ProductList from '../components/UI/ProductList';


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

  if (id === undefined && searchQuery === null) {
    q = query(collection(db, "products"))
  }
  else if (id === undefined && searchQuery === '') {
    if (items.length === 1) {
      title = "1 Result found"
      q = query(collection(db, "products"))
    } else {
      title = `${items.length} Results found`
      q = query(collection(db, "products"))
    }
  }
  else if (id === undefined && searchQuery != null) {
    if (items.length === 1) {
      title = `1 Result found for '${searchQuery}'`
    } else {
      title = `${items.length} Results found for '${searchQuery}'`
    }
    q = query(collection(db, "products"), where("searchArray", "array-contains", searchArray[0]))
  }
  else if (id === 'all') {
    title = 'All products'
    q = query(collection(db, "products"))
  }
  else if (id === '4kuhd') {
    title = '4K Ultra HDs'
    q = query(collection(db, "products"), where("format", "==", "4K Ultra HD"))
  } 
  else if (id === 'bluray') {
    title = 'Blu-rays'
    q = query(collection(db, "products"), where("format", "==", "Blu-ray"))

  }
  else if (id === 'cd') {
    title = 'CDs'
    q = query(collection(db, "products"), where("format", "==", "CD"))

  }
  else {
    title = id.charAt(0).toUpperCase() + id.slice(1)
    q = query(collection(db, "products"), where("labelId", "==", title.toLowerCase()))
    if (title == 'Bfi') {
      title = 'BFI'
    }
    else if  (title == 'Studiocanal') {
      title = 'Studio Canal'
    }
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
                        const aTime = a.createdAt ? new Timestamp(a.createdAt.seconds, a.createdAt.nanoseconds).toDate() : null;
                        const bTime = b.createdAt ? new Timestamp(b.createdAt.seconds, b.createdAt.nanoseconds).toDate() : null;

                        if (!aTime && !bTime) {
                        return 0; // both documents have no createdAt property
                        } else if (!aTime) {
                        return 1; // a has no createdAt property, move it to the end
                        } else if (!bTime) {
                        return -1; // b has no createdAt property, move it to the end
                        } else {
                        return bTime - aTime; // sort by createdAt field
                        }
                    });
            
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
    fetchItems();
    setFilteredItems(null);
    setFilterValue('');
    setSortValue('featured')
  }, [id])
  useEffect(()=>{
    fetchItems();
    setFilteredItems(null);
    setFilterValue('');
    setSortValue('featured')
  }, [searchQuery])


  const sortFilteredItems = function(arr, order) {
    if (order === 'featured') {
      setFilteredItems(arr.sort((a, b) => {
        const aTime = a.createdAt ? new Timestamp(a.createdAt.seconds, a.createdAt.nanoseconds).toDate() : null;
        const bTime = b.createdAt ? new Timestamp(b.createdAt.seconds, b.createdAt.nanoseconds).toDate() : null;
  
        if (!aTime && !bTime) {
          return 0; // both documents have no createdAt property
        } else if (!aTime) {
          return 1; // a has no createdAt property, move it to the end
        } else if (!bTime) {
          return -1; // b has no createdAt property, move it to the end
        } else {
          return bTime - aTime; // sort by createdAt field
        }
      }))
    } else {
      let num = -1
      if (order === 'title-descending' || order === 'price-descending') {num = 1}
      setFilteredItems(arr.sort((a, b) => {
        let titleA = a.name.toLowerCase();
        let titleB = b.name.toLowerCase();
        let priceA = a.price;
        let priceB = b.price;
  
        // Ignore 'the' at the beginning of the title
        const wordsA = titleA.split(' ');
        const wordsB = titleB.split(' ');
        if (wordsA[0] === 'the') {
          titleA = wordsA.slice(1).join(' ');
        }
        if (wordsB[0] === 'the') {
          titleB = wordsB.slice(1).join(' ');
        }
  
        // Compare the modified titles or prices
        if (order === 'price-ascending' || order === 'price-descending') {
          if (priceA < priceB) {
            return num;
          }
          if (priceA > priceB) {
            return -num;
          }
          return 0;
        } else {
          if (titleA < titleB) {
            return num;
          }
          if (titleA > titleB) {
            return -num;
          }
          return 0;
        }
      }));
    }
  }



  const handleFilter = e => {
    setFilterValue(e.target.value)
    if (e.target.value === 'all' || e.target.value === '' ) {
        sortFilteredItems(items, sortValue)
    }
    else if (e.target.value === '4K Ultra HD') {
      setFilteredItems(items.filter(item => item.format && item.format === '4K Ultra HD'))
    }
    else if (e.target.value === 'Blu-ray') {
      setFilteredItems(items.filter(item => item.format && item.format === 'Blu-ray'))
    }
    else if (e.target.value === 'CD') {
        setFilteredItems(items.filter(item => item.format && item.format === 'CD'))
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
                  <option value="title-ascending">Alphabetically, A-Z</option>
                  <option value="title-descending">Alphabetically, Z-A</option>
                  <option value="price-ascending">Price, low to high</option>
                  <option value="price-descending">Price, high to low</option>
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
                  <ProductList items={items} />
                )
              ) : (
                
                filteredItems.length === 0 ? (
                  searchArray === null ? (
                    <p className='notFound'>No products are found!</p>
                  ) : (
                    <p className='notFound'>Sorry, we can't find any results for that keyword. Please check your spelling or try another search term.</p>
                  )
                ) : (
                  <ProductList items={filteredItems} />
                )
              )
              
            
            
            }
          </Row>
        </Container>
      </section>
    </>
  )
}

