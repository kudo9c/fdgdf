import React from 'react'
import Announcement from '../compunents/Announcement'
import Categories from '../compunents/Categories'
import Footer from '../compunents/Footer'
import Navbar from '../compunents/Navbar'
import Navigation from '../compunents/Navigation'
import Products from '../compunents/Products'
import Slider from '../compunents/Slider'

const Home = () => {
    return (
        <div>
            <Announcement/>
            <Navbar/>
            <Navigation/>
            <Slider/>
            <Categories/>
            <Products/>
            <Footer/>
        </div>
    )
}

export default Home
