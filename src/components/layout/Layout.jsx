import React from 'react'
import Header from '../header/Header'
import { Footer } from '../footer/Footer'
import Routers from '../../routers/Routers'

export const Layout = () => {
  return (
    <>  
        <Header />
        <div>
            <Routers />
        </div>
        <Footer />
    </>
  )
}
