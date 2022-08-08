import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { ThreeDots } from "react-loader-spinner"
import axios from "axios"
import styled from "styled-components"

import logo from "./logo.png"

export default function Register(){
    const [form, setForm] = useState()
    const [button, setButton] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [isRegistered, setIsRegistered] = useState(false)
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    if(isRegistered){
        navigate("/")
    }

    if(error){
        setButton(false)
        setError(false)
        setIsDisabled(false)
    }

    function handleForm(event){
        setForm({
            ...form,[event.target.name]:event.target.value
        })
    }

    function register(){
        const body = form
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",body)
        promise.then(() => setIsRegistered(true))
        promise.catch(() => {
            alert("Algo deu errado") 
            setError(true)})
        setButton(true)
        setIsDisabled(true)
    }

    return(
        <Page>
            <Logo src={logo} alt="logo"></Logo>
            <Form onSubmit={(event) => {
                event.preventDefault()
                register()
            }}>
                <input type="text" placeholder="email" name="email" onChange={handleForm} disabled={isDisabled} required></input>
                <input type="password" placeholder="senha" name="password" onChange={handleForm} disabled={isDisabled} required></input>
                <input type="text" placeholder="nome" name="name" onChange={handleForm} disabled={isDisabled} required></input>
                <input type="text" placeholder="foto" name="image" onChange={handleForm} disabled={isDisabled} required></input>
                <button type="submit" disabled={isDisabled}>{button ? <ThreeDots color="#FFFFFF" height={80} width={80} /> : "Cadastrar"}</button>
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

    input::-webkit-input-placeholder{
        color: #DBDBDB;
        font-size: 20px;
        padding-left: 11px;
    }

    input[type=text], input[type=password]{
        all:unset;
        width: 300px;
        height:45px;
        margin-bottom:5px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
    }

    input[type=text]:disabled,input[type=password]:disabled{
        color: #AFAFAF;
        background-color: #F2F2F2;
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
        opacity:${(props) => props.disabled ? 0.7:1.0};
        border-radius: 5px;
    }

    button[type=submit]:disabled{
        opacity: 0.7;
    }
`