import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Modal from '../compunents/Modal'
import { login } from '../redux/apiCalls'
import { mobile } from '../responsive'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #A0C860;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    padding: 20px;
    width: 18%;
    background-color: white;
    ${mobile({width: "75%"})};
`
const Form = styled.form`
    display: flex;
    flex-direction: column;

`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0;
    padding: 10px;
`

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    cursor: pointer;
    color: white;
    margin-bottom: 10px;
    &:disabled{
        color: green;
        cursor: not-allowed;
    }
`
const LinkA = styled.a`
    margin: 5px 0;
    font-size: 13px;
    text-decoration: underline;
    cursor: pointer;
`

const linkStyle = {
    textDecoration: "none",
    color: "inherit"
}

// const Error = styled.span`
//     color: red;
// `


const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [modal,setModal] = useState(false)
    const dispatch = useDispatch()
    const isFetching = useSelector((state) => state.user.isFetching)
    const error = useSelector(state => state.user.error)
    const handleClick = (e) => {
        e.preventDefault()
        login(dispatch,{username,password})
        if(error) {
            setModal(true)
        } else {
            
        }
    }
    return (
        <Container>
            <Wrapper>
                <Title>ĐĂNG NHẬP</Title>
                <Form onSubmit={handleClick}>
                    <Input placeholder="Username" value={username} required onChange={(e)=>setUsername(e.target.value)}/>
                    <Input type="password" value={password} required placeholder="Mật khẩu" onChange={(e)=>setPassword(e.target.value)}/>
                    <Button type='submit' disabled={isFetching}>ĐĂNG NHẬP</Button>
                    {/* {error && <Error>Có lỗi xảy ra...Vui lòng thử lại</Error>} */}
                    <Link to="/register" style={linkStyle}>
                        <LinkA>Tạo tài khoản mới</LinkA>
                    </Link>
                </Form>
            </Wrapper>
            {error && modal && <Modal stateModal={setModal} message="Username hoặc mật khẩu không chính xác, vui lòng thử lại"/>}
        </Container>
    )
}

export default Login
