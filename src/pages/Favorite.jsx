import styled from 'styled-components';
import React from 'react';
import Announcement from '../compunents/Announcement';
import Navbar from '../compunents/Navbar';
import Navigation from '../compunents/Navigation';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { deleteFavorProduct } from '../redux/favorRedux';
import {useDispatch, useSelector} from "react-redux"

const Container = styled.div`

`

const Header = styled.h4`
  margin: 20px;
  color: #484848;
`

const FavoriteWrapper = styled.div``

const ProductWrapper = styled.div`
  display: flex;
  margin-left: 20px;
  padding: 10px;
  border-bottom: 2px solid #eeeeee;
  width: 40vw;
`

const ProductInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-left: 20px;
  width: 100%;
`

const ProductName = styled.span`
  margin: auto;
  margin-top: 0;
  font-size: 20px;
`

const ProductImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 5px;
`

const BtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const InfoButton = styled.button`
  width: 100%;
  margin-right: 10px;
  height: 30px;
  border-radius: 8px;
  background-color: white; 
  color: #388e3c; 
  border: 2px solid #4CAF50;
  &:hover {
    background-color: #4CAF50;
    color: white;
  }
`

const DeleteButton = styled.button`
  width: 30%;
  height: 30px;
  border: none;
  border-radius: 8px;
  background-color: white; 
  color: #f44336; 
  border: 2px solid #f44336;
  &:hover{
    background-color: #f44336;
    color: white;
  }
`

const Favorite = () => {

  const dispatch = useDispatch()
  const favorList = useSelector(state => state.favor.products)
  const handleDelete = (id) => {
    dispatch(deleteFavorProduct(id))
  }

  return (
  <Container>
      <Announcement/>
      <Navbar/>
      <Navigation/>
      <Header>Danh sách sản phẩm yêu thích</Header>
      <FavoriteWrapper>
        {favorList.map((item) => (
          <ProductWrapper key={item.productID}>
            <ProductImg src={item.img}></ProductImg>
            <ProductInfoWrapper>
              <ProductName>{item.title}</ProductName>
              <BtnWrapper>
                <Link to={`/product/${item.productID}`}>
                  <InfoButton>Xem chi tiết</InfoButton>
                </Link>
                <DeleteButton onClick={() => handleDelete(item.productID)}><DeleteOutline/></DeleteButton>
              </BtnWrapper>
            </ProductInfoWrapper>
          </ProductWrapper>
        ))}
      </FavoriteWrapper>
  </Container>
    
 )
};

export default Favorite;
