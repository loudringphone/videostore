import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from "reactstrap";

import { collection, getDocs } from "firebase/firestore";
import { Timestamp } from 'firebase/firestore';
import {db} from '../../firebase_setup/firebase';
import "../../styles/product-card.css"
import ProductCard from './ProductCard';





const ProductsLists = () => {
    const [items, setItems] = useState([]);

    const fetchItem = async () => {
        await getDocs(collection(db, "items"))
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

                
            });
    }

   
    
    

    const uniqueFormats = [...new Set(items.map(item => item.format))].sort();
    // console.log(uniqueFormats);

    const uniqueBoutiqueLabels = [...new Set(items.filter(item => item.format !== "CD").map(item => item.label))].sort();
// console.log(uniqueBoutiqueLabels);
    
   
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