import React from 'react'
import { Container, Row, Col } from "reactstrap";

import "../../styles/product-card.css"
import ProductCard from './ProductCard';

const ProductList = (props) => {
   
    return (
        
        <section>
           
            <Container>
                <Row>
                    <Col lg="12" className="product_list">
                        <section className="products">
                    {
                        props.items?.map((item, i) => (
                            <ProductCard key={i} item={item}/>
                        ))
                    }
                    
                        </section>
                    </Col>
                </Row>
            </Container>
                            
    </section>
            



    )
}

export default ProductList