import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { mobile } from '../responsive'


const Container = styled.div`
    flex: 1;
    margin: 3px;
    height: 60vh;
    position: relative;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    over-fit: cover;
    ${mobile({height: "30vh"})};
`
const Info = styled.div`
    position: absolute;
    width:100%;
    height: 100%;
    top:0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const Title = styled.h1`
    color: #2aa1c9;
    margin-bottom: 20px;
`
const Button = styled.button`
    border: none;
    padding: 10px;
    background-color: white;
    color: gray;
    cursor: pointer;
    font-weight: 600;
`

const CategoryItem = ({item}) => {
    return (
        <Container>
            <Link to={`/products/${item.cat}`}>
                <Image src={item.img}/>
                <Info>
                    <Title>{item.title}</Title>
                    <Button>SHOP NOW</Button>
                </Info>
            </Link> 
        </Container>
    )
}

export default CategoryItem
