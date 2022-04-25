import styled from "styled-components"
import Navbar from "../compunents/Navbar"

const Container = styled.div`

`

const Img = styled.img`
    width: 100vw;
    height: 100vh;
`

const NotFound = () => {
    return (
        <Container>
            <Navbar/>
            <Img src="/img/notfound.png"/>
        </Container>
    )
}

export default NotFound
