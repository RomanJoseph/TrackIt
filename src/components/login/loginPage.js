import { ThreeDots } from  'react-loader-spinner'
import { Link } from "react-router-dom"
import styled from "styled-components"

import logo from "./logo.png"
import { useState } from "react"
import axios from 'axios'

export default function LoginPage() {
    const [form, setForm] = useState({})
    const [button,setButton] = useState(false)

    function handleForm(event){
        setForm({
            ...form,[event.target.name]:event.target.value
        })
    }

    function login (){
        const body = form;
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", body)
        setButton(true)
        promise.then(response => console.log(response.data))
    }

    return (
        <Page>
            <Logo src={logo} alt="logo"></Logo>
            <Form onSubmit={event => {
                event.preventDefault()
                login()
                console.log("enviou")
                }}>
                <input type="text" name="email" placeholder="email" onChange={handleForm} required></input>
                <input type="password" name="password" placeholder="senha" onChange={handleForm} required></input>
                <button type="submit">{button ? <ThreeDots color="#FFFFFF" height={80} width={80} />: "Entrar"}</button>
            </Form>
            <Link to="/cadastro"><p>Não tem uma conta ? Cadastre-se!</p></Link>
        </Page>
    )
}

const Page = styled.div`
    display:flex;
    flex-direction:column;
    align-items: center;

    p {
        font-size:14px;
        text-decoration:underline;
        margin-top: 20px;
        color: #52B6FF;
    }
`

const Logo = styled.img`
    width: 160px;
    margin-top: 70px; 
    margin-bottom: 30px;
`

const Form = styled.form`
    display:flex;
    flex-direction:column;

    ::placeholder{
        color: red;
        font-size: 20px;
        margin-left:10px
    }

    input[type=text],input[type=password]{
        all:unset;
        width: 300px;
        height:45px;
        margin-bottom:5px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
    }

    button[type=submit]{
        all: unset;
        width: 300px;
        height:45px;
        background-color: #52B6FF;
        font-size: 21px;
        color: #FFFFFF;
        text-align:center;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`