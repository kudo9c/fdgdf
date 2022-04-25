import styled from 'styled-components'
import React from 'react'
import { Favorite,  SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from './Modal'



const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.2);
    z-index: 3;
    transition: all 0.5s ease;
    cursor: pointer;
    
`
const Container = styled.div`
    flex: 1;
    margin: 5px;
    width: 20%;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;
    &:hover ${Info}{
    opacity: 1;
    }
`
const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;

`
const Image = styled.img`
    height: 250px;
    z-index: 2;
`

const Icon = styled.div`
    display: flex;
    height: 100px;
    width: 100px;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    &:hover {
        transform: scale(1.1);
    }
    color: #424242;
`

const linkStyle = {
    textDecoration: "none",
    color: "inherit"
}

const Product = ({item}) => {
    return (
            <Container>
                <Link to={`/product/${item._id}`}>
                    <Image src={item.img}/>
                    <Info style={linkStyle}>
                        <Icon><SearchOutlined style={{fontSize: "50px", color: "white"}}/></Icon>
                    </Info>
                </Link>
            </Container>
    )
}

export default Product
