import { Add, DeleteOutlined, Remove } from '@material-ui/icons'
import React, { useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Announcement from '../compunents/Announcement'
import Footer from '../compunents/Footer'
import Navbar from '../compunents/Navbar'
import Navigation from '../compunents/Navigation'
import { mobile } from '../responsive'
import { deleteProduct, updatePrice, addQuantity, descQuantity } from '../redux/cartRedux'
import { useEffect } from 'react'



const Container = styled.div`

`
const Wrapper = styled.div`
    padding: 20px;
    ${mobile({padding: "10px"})};
`
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`
const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props => props.type === "filled" && "none"};
    background-color: ${props => props.type === "filled" ? "black" : "transparent"};
    color: ${props => props.type === "filled" && "white"};
`
const TopTexts = styled.div`
    ${mobile({display: "none"})};
`
const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0 10px;
`
const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({flexDirection: "column"})};
`
const Info = styled.div`
    flex: 3;
`
const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({flexDirection: "column"})};
    margin-bottom: 20px;
`
const ProductDetail = styled.div`
    flex: 2;
    display: flex;

`
const Image = styled.img`
    width: 200px;
    height: 200px;
`
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const ProductName = styled.span`
    
`
const ProductID = styled.span`
    
`
const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%; 
    background-color: ${props => props.color};
`

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;

`
const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({margin: "5px 15px"})};
    width: 40px;
    text-align: center;
    border: none;
`
const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    margin-bottom: 20px;
    ${mobile({marginBottom: "20px"})};
`
const ProductSize = styled.span``;
const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
    margin: 10px;
`
const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 35vh;
`
const SummaryTitle = styled.h1`
    font-weight: 200;
`
const SummaryItem = styled.div`
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
    font-weight: ${props => props.type === "total" && "500"};
    font-size:${props => props.type === "total" && "24px"};
`
const SummaryItemText = styled.span`

`
const SummaryItemPrice = styled.span`

`
const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
`

const linkStyle = {
    textDecoration: "none",
    color: "inherit"
}


const Cart = () => {
    const cart = useSelector((state)=>state.cart)
    const products = useSelector(state=>state.cart.products)
    const userID = useSelector(state => state.user.currentUser._id)
    const favor = useSelector(state => state.favor)
    const [totalPrice, setTotalPrice] = useState(0)
    const [dataCart, setDataCart] = useState({})
    const dispatch = useDispatch()
    const handleDelete = (id) => {
        dispatch(deleteProduct(id))
    }
    const addQty = (id) => {
        dispatch(addQuantity(id))
    }
    const descQty = (id) => {
        dispatch(descQuantity(id))
    }
    // if(userID) {
    //     setInterval(() => {
    //         updateCart(dispatch,userID,dataCart)
    //     },60000)
    // }
    useEffect(() => {
        let price = 0
        let listProduct = []
        products.forEach((item) => {
            price += item.price * item.quantity
            listProduct.push({productID: item._id,quantity: item.quantity})
        })
        setTotalPrice(price)
        dispatch(updatePrice(price))
        const data = {products: listProduct,quantity: cart.quantity,total: price}
        setDataCart(data)
    },[cart,products,dispatch])
    
    return (
        <Container>
            <Navbar dataCart={dataCart}/>
            <Announcement/>
            <Navigation/>
            <Wrapper>
                <Title>GIỎ HÀNG</Title>
                <Top>
                    <Link to="/">
                        <TopButton>TIẾP TỤC MUA SẮM</TopButton>
                    </Link>
                    <TopTexts>
                        <TopText>Giỏ hàng ({cart.quantity})</TopText>
                        <Link to="/favor" style={linkStyle}>
                            <TopText>Sản phẩm yêu thích ({favor.quantity})</TopText>    
                        </Link>
                    </TopTexts>
                    <Link to="/checkout">
                        <TopButton type="filled">THANH TOÁN</TopButton>
                    </Link>
                </Top>
                <Bottom>
                    <Info>
                    {cart.products.map((product,index) => (
                        <Product key={index}>
                            <ProductDetail>
                                <Image src={product.img}/>
                                <Details>
                                    <ProductName>
                                    <b>Sản phẩm:</b> {product.title}
                                    </ProductName>
                                    <ProductID>
                                    <b>ID:</b> {product._id}
                                    </ProductID>
                                    <ProductColor color={product?.color} />
                                    <ProductSize>
                                    <b>Combo:</b> {product.combo}
                                    </ProductSize>
                                </Details>
                            </ProductDetail>
                            <PriceDetail>
                                <ProductAmountContainer> 
                                    <Remove onClick={() => descQty(index)} />
                                    <ProductAmount>{product.quantity}</ProductAmount>
                                    <Add onClick={() => addQty(index)}/>
                                </ProductAmountContainer>
                                <ProductPrice>
                                    {product.price * product.quantity}.000Đ
                                </ProductPrice>
                                <DeleteOutlined onClick={() => handleDelete(index)}/>
                            </PriceDetail>
                        </Product>
                    ))}
                    <Hr/>
                    </Info>
                    
                    <Summary>
                        <SummaryTitle>ĐƠN HÀNG</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Tạm tính</SummaryItemText>
                            <SummaryItemPrice>{totalPrice}.000Đ</SummaryItemPrice>
                        </SummaryItem>
                        {/* <SummaryItem>
                            <SummaryItemText>Phí giao hàng</SummaryItemText>
                            <SummaryItemPrice>{totalPrice}0.000Đ</SummaryItemPrice>
                        </SummaryItem> */}
                        {/* <SummaryItem>
                            <SummaryItemText>Giảm giá phí giao hàng</SummaryItemText>
                            <SummaryItemPrice>-{totalPrice}0.000Đ</SummaryItemPrice>
                        </SummaryItem> */}
                        <SummaryItem type="total">
                            <SummaryItemText >Tổng tiền</SummaryItemText>
                            <SummaryItemPrice>{totalPrice}.000Đ</SummaryItemPrice>
                        </SummaryItem>
                        <Link to="/checkout">
                            <Button >TIẾP TỤC THANH TOÁN</Button>
                        </Link>
                        
                    </Summary>
                    
                </Bottom>
            </Wrapper>
            <Footer/>
        </Container>
    )
}

export default Cart
