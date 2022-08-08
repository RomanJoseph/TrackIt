import styled from "styled-components"
import axios from 'axios'
import { ThreeDots } from 'react-loader-spinner'
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import UserContext from "../contexts/userContext"
import { useContext } from "react"

import logo from "./logo.png"

export default function LoginPage() {
    const [form, setForm] = useState({})
    const [button, setButton] = useState(false)
    const [isLogged, setIsLogged] = useState(false)
    const [error, setError] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const navigate = useNavigate()

    const { user, setUser } = useContext(UserContext)


    if (isLogged) {
        navigate("/hoje")
    }

    if (error) {
        setButton(false)
        setIsDisabled(false)
        setError(false)
    }

    function handleForm(event) {
        setForm({
            ...form, [event.target.name]: event.target.value
        })
    }

    function login() {
        const body = form;
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", body)
        promise.then(response => {
            setUser(response.data)
            setIsLogged(true)
        })
        promise.catch(() => {
            alert("Algo deu errado")
            setError(true)
        })
        setButton(true)
        setIsDisabled(true)
    }

    return (
        <Page>
            <Logo src={logo} alt="logo"></Logo>
            <Form onSubmit={event => {
                event.preventDefault()
                login()
            }}>
                <input type="text" name="email" placeholder="email" onChange={handleForm} required disabled={isDisabled}></input>
                <input type="password" name="password" placeholder="senha" onChange={handleForm} required disabled={isDisabled}></input>
                <button type="submit" required disabled={isDisabled}>{button ? <ThreeDots color="#FFFFFF" height={80} width={80} /> : "Entrar"}</button>
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

    input::-webkit-input-placeholder{
        color: #DBDBDB;
        font-size: 20px;
        padding-left: 11px;
    }

    input[type=text],input[type=password]{
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
        border-radius: 5px;
    }

    button[type=submit]:disabled {
        opacity: 0.7
    }
        
`

