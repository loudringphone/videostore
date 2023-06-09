import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import CommonSection from '../components/UI/CommonSection'
import { Helmet } from '../components/helmet/Helmet'
import { Container, Row } from "reactstrap"
import { useSelector } from "react-redux"
import { Timestamp } from "firebase/firestore";
import '../styles/shop.css'

import ProductList from '../components/UI/ProductList';

import { firebaseQuery } from '../functions/firebaseQuery';


export const Wishlist = () => {
    const wishlist = useSelector(state => state.wishlist)
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState(null);
    const [filterValue, setFilterValue] = useState('');
    const [sortValue, setSortValue] = useState('featured');
    const {id} = useParams();
    let title = "WISHLIST";
    const [loading, setLoading] = useState(true);
    

    const fetchItems = async () => {
      setLoading(true);
      const newData = await firebaseQuery(wishlist, "products");
      setItems(newData);
      setLoading(false);
    }
  
    
  


  useEffect(()=>{
    fetchItems();
    setFilteredItems(null);
    setFilterValue('');
    setSortValue('featured')
  }, [])

  useEffect(()=>{
    let wishedItems
    if (items && items.length > 0) {
        wishedItems = items
        for (let item of items) {
            if (!wishlist.includes(item.id)) {
                wishedItems = wishedItems.filter(function(element) {
                    return element.id !== item.id;
                  });
            }
        }
        setItems(wishedItems)
    }
    if (filteredItems != null) {
        wishedItems = filteredItems
        for (let item of filteredItems) {
            if (!wishlist.includes(item.id)) {
                wishedItems = wishedItems.filter(function(element) {
                    return element.id !== item.id;
                  });
            }
        }
        setFilteredItems(wishedItems)
    }
  }, [wishlist])
  


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
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();
      
        // Ignore 'the' at the beginning of the title
        const wordsA = nameA.split(' ');
        const wordsB = nameB.split(' ');
        if (wordsA[0] === 'the') {
          nameA = wordsA.slice(1).join(' ');
        }
        if (wordsB[0] === 'the') {
          nameB = wordsB.slice(1).join(' ');
        }
      
        // Compare the modified titles
        if (nameA < nameB) {
          return num;
        }
        if (nameA > nameB) {
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
        <Helmet title={title}></Helmet>
        <CommonSection title={title} />
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
                    items && items.length === 0 ? (
                        <p className='notFound'>Your wishlist is empty.</p>
                    ) : (
                        <ProductList items={items} />
                    )
                ) : (
                    
                    filteredItems.length === 0 ? (
                        <p className='notFound'>Your wishlist is empty.</p>
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

