
import React, { useState } from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
import { createCart, register } from '../redux/apiCalls'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../compunents/Modal'



const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #90EEEB;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    padding: 20px;
    width: 40%;
    background-color: white;
    ${mobile({width: "75%"})};

`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`

const Error = styled.span`
    font-size: 12px;
    padding: 3px;
    color: red;
    display: none;
`

const Input = styled.input`
    flex: 1;
    min-width: 90%;
    margin: 20px 10px 0 0;
    padding: 10px;
    &:invalid[data-myAttr="true"] {
        border: 1px solid red;
    }
    &:invalid[data-myAttr="true"] ~ ${Error} {
        display: block;
    }
`
const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0;
`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    cursor: pointer;
    color: white;
    &:disabled {
        cursor: default;
    }
`

const Label = styled.label`
    display: none;
`




const Register = () => {
    const [focused, setFocused] = useState(false)
    const [modal,setModal] = useState(false)
    const dispatch = useDispatch()
    const [inputs, setInputs] = useState({})
    const error = useSelector(state => state.user.error)
    const handleChange = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value };
        })
    }
    const handleFocus = (e) => {
        setFocused(true)
    }
    const handleClick = (e) => {
        e.preventDefault();
        register(dispatch, inputs)
        setModal(true)    
    }
    // const cart = {userID: user._id, products: [], quantity:0, total:0,}
    // createCart(dispatch, cart)
    return (
        <>
            <Container>
                <Wrapper>
                    <Title >TẠO TÀI KHOẢN</Title>
                    <Form onSubmit={handleClick}>
                        <Label>Fullname</Label>
                        <Input name='fullname' placeholder="Họ Tên" value={inputs.fullname} onChange={handleChange}  data-myattr={focused} onBlur={handleFocus}/>
                        
                        <Label>Username</Label>
                        <Input name='username' placeholder="Username" onChange={handleChange} value={inputs.username} required pattern="^[A-Za-z0-9]{3,15}$" onBlur={handleFocus} data-myattr={focused}/>
                        <Error>Username chứa 3-15 kí tự, không bao gồm các kí tự đặc biệt</Error>
                        <Label>Email</Label>
                        <Input name='email' placeholder="Email" type="email" onChange={handleChange}  value={inputs.email} required onBlur={handleFocus} data-myattr={focused}/>
                        <Error>Vui lòng nhập email hợp lệ!</Error>
                        <Label>password</Label>
                        <Input name='password' placeholder="Mật khẩu" type="password" onChange={handleChange}  value={inputs.password} required pattern="^[A-Za-z0-9]{6,}$" onBlur={handleFocus} data-myattr={focused}/>
                        <Error>Mật khẩu yêu cầu 6 kí tự trở lên</Error>
                        <Label>Confirmpassword</Label>
                        <Input placeholder="Nhập lại mật khẩu" type="password" onChange={handleChange}  value={inputs.confirmpassword} required name="confirmpassword" pattern={inputs.password} onBlur={handleFocus} data-myattr={focused}/>
                        <Error>Mật khẩu không khớp, vui lòng nhập lại.</Error>
                        <Agreement>
                            Bằng việc đăng kí, bạn đã đồng ý với FuwaMise về <b>ĐIỀU KHOẢN DỊCH VỤ</b> & <b>CHÍNH SÁCH BẢO MẬT</b>
                        </Agreement>
                        <Button type='submit' >TẠO</Button>
                    </Form>  
                </Wrapper>
                {modal && <Modal stateModal={setModal} message={error ? "Username hoặc email đã được sử dụng, vui lòng thử lại" : "Đăng kí thành công!"}/>}
            </Container>
            
        </>
        
        
    )
}

export default Register
