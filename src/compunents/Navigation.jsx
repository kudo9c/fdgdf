import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
    width:100vw;
    background-color: #edecec;
    font-size: 16px;
    font-weight: 500;
`

const NaviList = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: row;
    padding: 10px;
`

const NaviItem = styled.li`
    padding: 0 10px;
    cursor: pointer;
    text-decoration: none;
    color: black;
`

const linkStyle = {
    textDecoration: "none",
    color: "inherit"
}

const Navigation = () => {
    return (
        <Container>
            <NaviList>
                <Link to="/" style={linkStyle}>
                    <NaviItem>Trang chủ</NaviItem>
                </Link>
                <Link to="/products" style={linkStyle}>
                    <NaviItem>Sản phẩm</NaviItem> 
                </Link>
                <Link to="/products/sock" style={linkStyle}>
                    <NaviItem>Tất chân</NaviItem>
                </Link>
                <Link to="/products/beanie" style={linkStyle}>
                    <NaviItem>Mũ len</NaviItem>
                </Link>
            </NaviList>
        </Container>
    )
}

export default Navigation
