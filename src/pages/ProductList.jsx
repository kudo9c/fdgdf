
import React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Announcement from '../compunents/Announcement'
import Footer from '../compunents/Footer'
import Navbar from '../compunents/Navbar'
import Navigation from '../compunents/Navigation'
import Products from '../compunents/Products'
import { mobile } from '../responsive'

const Container = styled.div`
`
const Title = styled.h1`
    margin: 20px;
`
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const Filter = styled.div`
    margin: 20px;
`
const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
    ${mobile({marginRight: "0"})};
`
const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobile({margin: "10px 0"})};
`
const Option = styled.option`
`
const ProductList = () => {
    const location = useLocation()
    const cat = location.pathname.split("/")[2]
    const [filter, setFilter] = useState({})
    const [sort, setSort] = useState("Mới nhất")
    // const handleFilter = (e) => {
    //     const value = e.target.value
    //     setFilter({
    //         ...filter,
    //         [e.target.name]: value,
    //     })
    // }
    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <Navigation/>
            <Title>{cat==="sock" ? "Tất" : "Mũ len"}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>
                        Sắp xếp:
                    </FilterText>
                    <Select onChange={e=>setSort(e.target.value)}>
                        <Option value="newest">Mới nhất</Option>
                        <Option value="asc" >Giá giảm dần</Option>
                        <Option value="desc" >Giá tăng dần</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products cat={cat} filter={filter}  sort={sort}/>
            <Footer/>
        </Container>
    )
}

export default ProductList
