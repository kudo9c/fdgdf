import { Apps, Facebook, MailOutline, Phone } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'

const Container = styled.div`
    display: flex;
    ${mobile({flexDirection: "column"})};
`
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;

`
const Logo = styled.h1`
`
const Desc = styled.p`
    margin: 20px 0;
`
const SocialContainer = styled.div`
    display: flex;

`
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props => props.color};
    display:flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`
const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({display: "none"})};
`
const Title = styled.h3`
    margin-bottom: 30px;
`
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`
const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
    cursor: pointer;
`
const Right = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({backgroundColor: "#fff8f8"})};
`
const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`
const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>FUWA MISE.</Logo>
                <Desc>Winter Shopping? Shopping on us.</Desc>
                <SocialContainer>
                    <SocialIcon color="3B5999">
                        <Facebook />
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Điều hướng</Title>
                <List>
                    <ListItem>Trang chủ</ListItem>
                    <ListItem>Giỏ hàng</ListItem>
                    <ListItem>Tài khoản của tôi</ListItem>
                    <ListItem>Theo dõi đơn hàng</ListItem>
                    <ListItem>Điều khoản</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Liên hệ</Title>
                <ContactItem>
                <Apps style={{marginRight:"10px"}}/>Shopee: https://shopee.vn/fuwa_mise
                </ContactItem>
                <ContactItem>
                <Phone style={{marginRight:"10px"}}/>+84 97 578 49 25
                </ContactItem>
                <ContactItem>
                <MailOutline style={{marginRight:"10px"}}/>fuwamise@gmail.com
                </ContactItem>
            </Right>
        </Container>
    )
}

export default Footer
