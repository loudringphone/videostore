import React from 'react';
import { Helmet } from "../components/helmet/Helmet";
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';

import Services from "../services/Services"
import Promotion from './Promotion';
import ProductsLists from '../components/UI/ProductsLists';

const Home = () => {

    const year = new Date().getFullYear();
    return (
        <div>
            <Helmet title={"Low prices on Movies!"}>
                <Promotion />
                <ProductsLists />
                <Services />
            
            </Helmet>
        </div>
    )

}

export default Home;