import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { ThreeDots } from "react-loader-spinner"
import axios from "axios"
import styled from "styled-components"

import logo from "./logo.png"

export default function Register(){
    const [form, setForm] = useState()
    const [button, setButton] = useState(false)
    const navigate = useNavigate()

    function handleForm(event){
        setForm({
            ...form,[event.target.name]:event.target.value
        })
    }

    function register(){
        setButton(true)
        const body = form
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",body)
        promise.then(() => navigate("/"))
        promise.catch(() => alert("Algo deu errado"), navigate("/cadastro"))
    }

    return(
        <Page>
            <Logo src={logo} alt="logo"></Logo>
            <Form onSubmit={(event) => {
                event.preventDefault()
                register()
            }}>
                <input type="text" placeholder="email" name="email" onChange={handleForm} required></input>
                <input type="password" placeholder="senha" name="password" onChange={handleForm} required></input>
                <input type="text" placeholder="nome" name="name" onChange={handleForm} required></input>
                <input type="text" placeholder="foto" name="image" onChange={handleForm} required></input>
                <button type="submit">{button ? <ThreeDots color="#FFFFFF" height={80} width={80} /> : "Cadastrar"}</button>
            </Form>
            <Link to="/"><p>Já tem uma conta ? Faça login!</p></Link>
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

    input[type=text], input[type=password]{
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