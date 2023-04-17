import React, { Component } from 'react';
import {Link } from "react-router-dom";
import { Helmet } from "../components/helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import trendImg from "../assets/images/the_shiver_of_the_vampires.webp"
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';

import Services from "../services/Services"
import Promotion from './Promotion';
import ProductsLists from '../components/UI/ProductsLists';

const Home = () => {

    const year = new Date().getFullYear();
    return (
        <div>
            <Helmet title={"Home"}>
                <Promotion />
            <ProductsLists />
                     
            <Services />
            
            </Helmet>
        </div>
    )

}

export default Home;