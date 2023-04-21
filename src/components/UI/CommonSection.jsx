import React from 'react'
import { Container } from "reactstrap"
import '../../styles/common-section.css'

import {useParams} from 'react-router-dom';
import arrowBackground from '../../assets/images/arrow-background.jpeg';
import bfiBackground from '../../assets/images/bfi-background.jpeg';
import indicatorBackground from '../../assets/images/indicator-background.jpeg';


const CommonSection = ({title}) => {



  const {id} = useParams();


  let bgImg = {};
  if (id === 'arrow') {
    bgImg = {
      background: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(${arrowBackground}) no-repeat center center / cover`,
      
    }
  }
  else if (id === 'bfi') {
    bgImg = {
      background: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(${bfiBackground}) no-repeat center center / cover`,
      
    };
  }
  else if (id === 'indicator') {
    bgImg = {
      background: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(${indicatorBackground}) no-repeat center center / cover`,
      
    };
  }
  
  return (
    <section className="common_section"  style={bgImg}>
      <Container className='text-center'>
        <h1>{title}</h1>
      </Container>
        
    </section>
  )
}

export default CommonSection
