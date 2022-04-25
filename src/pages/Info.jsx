import { Publish } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import Announcement from '../compunents/Announcement';
import Footer from '../compunents/Footer';
import Modal from '../compunents/Modal';
import Navbar from '../compunents/Navbar';
import Navigation from '../compunents/Navigation';
import { editInfo } from '../redux/apiCalls';
import {
    getDownloadURL, getStorage,
    ref,
    uploadBytesResumable
} from "firebase/storage"
import app from "../firebase"

const Container = styled.div`
    
`

const Wrapper = styled.div``
const InfoWrapper = styled.form`
    width: 800px;
    border: 1px solid #e0e0e0;
    margin: auto;
    margin-top:20px;
    margin-bottom: 20px;
`

const InfoHeader = styled.h4`
    padding: 5px;
    background-color: #eceff1;
`

const InfoInputWrapper = styled.div`
    margin: 30px;
    display:flex;
    flex-direction: row;
    align-items: center;
`

const AvartarWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-right: 155px;
`

const Image = styled.img`
    height: 50px;
    width: 50px;
    border-radius: 5px;
    object-fit: cover;
    
`

const InfoInputHeader = styled.label`
    margin-left: 100px;
    flex:1;
`

const InfoInput = styled.input`
    flex:3;
    border: 1px solid #e0e0e0;
`

const InfoButton = styled.button`
    margin-left: 50%;
    font-size: 14px;
    margin-bottom: 10px;
    background-color: #0277bd;
    color: white;
    border: none;
    width: 50px;
    height: 30px;
    cursor: pointer;
`


const Info = () => {
    const user = useSelector(state => state.user.currentUser)
    const error = useSelector(state => state.user.error)
    const [modal,setModal] = useState(false)
    const [file, setFile] = useState("")
    const dispatch = useDispatch()
    const [inputs, setInputs] = useState({
        ...user
    })
    const handleChange = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value};
        })
    }
    const handleClick = (e) => {
        e.preventDefault();
        Object.keys(inputs).forEach(key => inputs[key] === undefined && delete inputs[key])
        if(file === "") {
            editInfo(user._id,dispatch,inputs)
            setModal(true)
        }
        else {
            const fileName = new Date().getTime() + file.name
            const storage = getStorage(app)
            const storageRef = ref(storage, fileName)
            const uploadTask = uploadBytesResumable(storageRef, file);
                 // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case "paused":
                        console.log("Upload is paused");
                        break;
                        case "running":
                        console.log("Upload is running");
                        break;
                        default:
                    }
                },
                (error) => {
                // Handle unsuccessful uploads
                },
                () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const user = {...inputs,img: downloadURL}
                    editInfo(user._id,dispatch,user)
                });
                }
                );
                setModal(true)
        }
    }
  return (
  <Container>
      {modal && <Modal stateModal={setModal} message={error ? "Có lỗi xảy ra, vui lòng thử lại!" : "Cập nhật thông tin thành công"}/>}
      <Wrapper>
        <Announcement/>
        <Navbar/>
        <Navigation/>
        
        <InfoWrapper onSubmit={handleClick}>
            <InfoHeader>Sửa thông tin cá nhân</InfoHeader>
            <InfoInputWrapper>
                <InfoInputHeader >Avatar</InfoInputHeader>
                <AvartarWrapper>
                    <Image src={user.img}/>
                    <label for="file" >
                        <Publish/>
                    </label>
                    <input type="file" name="file" id="file" onChange={e => setFile(e.target.files[0])}/>
                </AvartarWrapper>
            </InfoInputWrapper>
            <InfoInputWrapper>
                <InfoInputHeader >Username</InfoInputHeader>
                <InfoInput disabled placeholder={user.username} />
            </InfoInputWrapper>
            <InfoInputWrapper>
                <InfoInputHeader >Họ tên</InfoInputHeader>
                <InfoInput name='fullname' value={inputs.fullname} onChange={handleChange}/>
            </InfoInputWrapper>
            <InfoInputWrapper>
                <InfoInputHeader>Địa chỉ</InfoInputHeader>
                <InfoInput name='address' onChange={handleChange} value={inputs.address}/>
            </InfoInputWrapper>
            <InfoInputWrapper>
                <InfoInputHeader >Email</InfoInputHeader>
                <InfoInput name='email' value={inputs.email} type="email" onChange={handleChange}/>
            </InfoInputWrapper>
            <InfoInputWrapper>
                <InfoInputHeader >Số điện thoại</InfoInputHeader>
                <InfoInput name='tel' onChange={handleChange} value={inputs.tel} type="tel"/>
            </InfoInputWrapper>
            <InfoButton type='submit' >Lưu</InfoButton>
        </InfoWrapper>
        <Footer/>
      </Wrapper>
  </Container>
  )
};

export default Info;
