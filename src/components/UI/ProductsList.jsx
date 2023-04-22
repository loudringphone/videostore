import React from 'react'
import { Container, Row, Col } from "reactstrap";

import "../../styles/product-card.css"
import ProductCard from './ProductCard';

const ProductsList = (props) => {
   
    return (
        
        <section>
           
            <Container>
                <Row>
                    <Col lg="12" className="product_list">
                        <section className="products">
                    {
                        props.items?.map((item, i) => (
                            <ProductCard key={i} id={item.id} title={item.title} image={item.image[0].downloadURL} format={item.format} price={item.price} originator={item.originator}/>
                        ))
                    }
                    
                        </section>
                    </Col>
                </Row>
            </Container>
                            
    </section>
            



    )
}

export default ProductsList