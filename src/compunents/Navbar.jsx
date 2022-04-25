
import { Badge } from '@material-ui/core'
import { Search, ShoppingCartOutlined } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {mobile} from "../responsive.js"
import {useDispatch, useSelector} from "react-redux"
import { Link } from 'react-router-dom'
import { logout } from '../redux/userRedux.js'
import { resetCart } from '../redux/cartRedux.js'
import { updateFavor } from '../redux/apiCalls';
import { updateCart } from '../redux/apiCalls'
import { resetFavor } from '../redux/favorRedux.js'
import axios from 'axios'

const Container = styled.div`
    height: 60px;  
    ${mobile({height: "70px"})};
`
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${mobile({padding: "5px 0"})};
    position: relative;
`
const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({display: "none"})};
`
const Left = styled.div`
    flex:1;
    display:flex;
    align-items: center;
`
const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
    ${mobile({padding: "0"})};
   
`

const Input = styled.input`
    border: none;
    ${mobile({width: "50px"})};
    &:focus {
        outline: none;
    }
`

const ResultContainer = styled.div`
    z-index: 10;
    background-color: white;
    position: absolute;
    top: 75px;
    width: 193px;
    left: 57px;
    border: 1px solid #eee;
    padding-top: 10px;
`

const ResultWrapper = styled.ul`
    display: flex;
    justify-content: space-between;
    margin: 0px;
    padding-bottom: 10px;
    padding-left: 10px;
    list-style: none;
    &:hover {
        background-color: #e0e0e0;
    }
`

const ResultTitle = styled.li`
    cursor: pointer;
`

const Logo = styled.h1`
    font-weight: bold;
    ${mobile({fontSize: "24px"})};
`
const Center = styled.div`flex:1;
    text-align: center;    
`
const Right = styled.div`flex:1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({flex:2,justifyContent: "center"})};
`
const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({fontSize: "12px",marginLeft:"10px"})};
    position: relative;
`

const InfoUserWrapper = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({fontSize: "12px",marginLeft:"10px"})};
    position: relative;
`

const InfoUserList = styled.ul`
    position: absolute;
    width: 200px;
    min-height: 110px;
    background-color: white;
    top: 31px;
    right: -15px;
    z-index: 5;
    padding: 0;
    list-style: none;
    box-shadow: 0 1px 3.125rem rgba(0, 0, 0, 0.2);
    &::before{
        content: "";
        border-width: 15px 30px;
        border-style:solid;
        border-color: transparent transparent white transparent;
        position: absolute;
        right: 10px;
        top: -30px;
    }
    display: none;
    ${InfoUserWrapper}:hover & {
        display: block;
    }
`

const InfoUser = styled.li`
    padding: 5px;
    cursor: pointer;
    font-size: 14px;
    &:hover {
        background-color: #e0e0e0;
    }
`

const linkStyle = {
    textDecoration: "none",
    color: "inherit"
}


const Navbar = ({dataCart}) => {
    const dispatch = useDispatch()
    const [products,setProducts] = useState([])
    const [query, setQuery] = useState("")
    const getProducts = async () => {
        try{
            const res = await axios.get("http://localhost:5000/api/products")
            setProducts(res.data)
        }catch(err){
                
        }
    }
    const search = (data) => {

    }
    const favorList = useSelector(state => state.favor.products)
    const userID = useSelector(state => state.user.currentUser?._id)
    const quantity = useSelector(state => state.cart.quantity)
    const user = useSelector(state => state.user.currentUser)
    const logout2 = () => {
        dispatch(logout())
        dispatch(resetCart())
        dispatch(resetFavor())
    }
    const data = {
        products: favorList
    }
    // if(user) {
    //     setInterval(() => {
    //         updateFavor(dispatch,userID,data)
    //         updateCart(dispatch,userID,dataCart)
    //     },180000)
    // }
    return (
        <Container>
            <Wrapper> 
                <Left>
                    <Language>VI</Language>
                    <SearchContainer>
                        <Input placeholder='Search' onFocus={() => getProducts()} onChange={e => setQuery(e.target.value)}/>
                        {/* <Search style={{color:"gray", fontSize:16}}/> */}
                       
                    </SearchContainer>
                </Left>
                <Link to="/" style={linkStyle}>
                    <Center><Logo>FUWA MISE</Logo></Center>
                </Link>
                
                <Right>
                    {!user && <Link to="/register" style={linkStyle}>
                        <MenuItem>ĐĂNG KÍ</MenuItem>
                    </Link>}
                    {!user && <Link to="/login" style={linkStyle}>
                        <MenuItem>ĐĂNG NHẬP</MenuItem>
                    </Link>}
                    {user && 
                        <InfoUserWrapper>
                            {user.username}
                            <InfoUserList className='InfoUserList'>
                                <Link to="/info" style={linkStyle}>
                                    <InfoUser>Thông tin cá nhân</InfoUser>
                                </Link>
                                <Link to="/favor" style={linkStyle}>
                                    <InfoUser>Danh sách yêu thích</InfoUser>
                                </Link>
                                <Link to="/cart" style={linkStyle}>
                                    <InfoUser>Giỏ hàng của tôi</InfoUser>
                                </Link>
                                <Link to="/" style={linkStyle}>
                                    <InfoUser onClick={() => logout2()}>Đăng xuất</InfoUser>
                                </Link>
                            </InfoUserList>
                        </InfoUserWrapper>  
                    }
                   
                    {user && <Link to="/cart" style={linkStyle}>
                        <MenuItem>
                            <Badge badgeContent={quantity} color="secondary">
                                <ShoppingCartOutlined />
                            </Badge>
                        </MenuItem>
                    </Link>}
                    
                </Right>
            </Wrapper>
            {query &&<ResultContainer>
                {products.filter((item) => item.title.toLowerCase().includes(query)).map(item => (
                    <Link to={`/product/${item._id}`} style={linkStyle}>
                        <ResultWrapper key={item._id}>
                            <ResultTitle>{item.title}</ResultTitle>
                        </ResultWrapper>
                    </Link>
                ))}
            </ResultContainer>}  
        </Container>
    )
}

export default Navbar
