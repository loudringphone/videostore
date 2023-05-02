import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from "reactstrap";
import { collection, query, getDocs, Timestamp } from "firebase/firestore";
import {db} from '../../firebase_setup/firebase';
import "../../styles/product-card.css"
import ProductCard from './ProductCard';





const ProductsLists = () => {
    const [items, setItems] = useState([]);

    const fetchItem = async () => {
        const q = query(collection(db, "products"))
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
            
            setItems(newData);})
    }

    
    

   const uniqueFormats = [...new Set(items.map(item => item.format ?? null))] // use null if format is undefined
   .sort((a, b) => {
     if (a === null && b === null) {
       return 0; // both are null, keep the order unchanged
     } else if (a === null) {
       return 1; // a is null, move it to the end
     } else if (b === null) {
       return -1; // b is null, move it to the end
     } else {
       return a.localeCompare(b); // sort alphabetically
     }
   });

    const uniqueBoutiqueLabels = [...new Set(items
        .filter(item => item.format && item.format !== "CD" && item.label)
        .map(item => item.label))
      ].sort();
    
   
    useEffect(()=>{
        fetchItem();
    }, [])
   
return (
    <>
        {items.length > 0 ? (
            <section className="product_lists">
            
                    <Container>
                        <Row>
                            <Col lg="12" className="product_list">
                                
                                <h3 className="section_title">New Arrivals</h3>
                                <section className="products">
                            {
                                items.slice(0, 8).map((item, i) => (
                                    <ProductCard key={i} item={item} />
                                ))
                            }
                                </section>
                            </Col>
                        </Row>
                    </Container>
                

                    {
                    uniqueFormats?.map((format,index)=>(
                        <Container key={index}>
                            <Row>
                                <Col lg="12" className="product_list">
                                    <h3 className="section_title">{format}s</h3>
                                    <section className="products">
                                {
                                    items?.filter(item => item.format === format).map((item, i) => (
                                        <ProductCard key={i} item={item} />
                                    ))
                                }
                                    </section>
                                </Col>
                            </Row>
                        </Container>
                    ))
                    }

        {
                    uniqueBoutiqueLabels?.map((label,index)=>(
                        <Container key={index}>
                            <Row>
                                <Col lg="12" className="product_list">
                                    <h3 className="section_title">{label} collections</h3>
                                    <section className="products">
                                {
                                    items?.filter(item => item.label === label).map((item, i) => (
                                        <ProductCard key={i} item={item} />
                                    ))
                                }
                                    </section>
                                </Col>
                            </Row>
                        </Container>
                    ))
                    }
                
            </section>
            ) : (
                <section className="product_lists" style={{ display: 'flex', alignItems: 'center' }}>
                    <p className='loading'>Fetching the latest product information...</p>
                </section>
            )
        }
            
    </>


    )
    
}

export default ProductsLists