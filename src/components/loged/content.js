import styled from "styled-components"
import { useEffect, useState } from "react"
import UserContext from "../contexts/userContext"
import { useContext } from "react"
import { ThreeDots } from 'react-loader-spinner'
import axios from "axios"

export default function Content() {
    const week = ["D", "S", "T", "Q", "Q", "S", "S"]
    const [createHabit, setCreateHabit] = useState(false)
    const [habitName, setHabitName] = useState()
    const [days, setDays] = useState([])
    const [habits, setHabits] = useState([])
    const [update, setUpdate] = useState(true)
    const { user, setUser } = useContext(UserContext)
    const [isDisabled, setIsDisabled] = useState(false)
    const [button, setButton] = useState(false)
    const [isSend,setIsSend] = useState(false)
    const [error, setError] = useState(false)
    const [enabled,setEnabled] = useState(true)

    const noHabit = (
        <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
    )

    const config = { headers: { Authorization: `Bearer ${user.token}` } }

    if(isSend){
        setCreateHabit(true)
        setButton(false)
        setCreateHabit(false)
        setIsDisabled(false)
        setIsSend(false)
        setEnabled(true)
    }

    if(error){
        setButton(false)
        setError(false)
        setIsDisabled(false)
        setEnabled(true)
    }

    useEffect(() => {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
        promise.then(response => {
            console.log(response.data)
            setHabits([...response.data])
            setIsSend(true)
        })
    }, [update])

    function postHabit(event) {
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", { name: habitName, days }, config)
        setButton(true)
        setIsDisabled(true)
        setEnabled(false)
        promise.then(() => {
            setDays([])
            setUpdate(!update)}
        )
        promise.catch(() => {
            alert("Algo deu errado")
            setError(true)
        })
    }

    const element = (
        <form onSubmit={(event) => event.preventDefault()}>
            <NewHabit>
                <input type="text" placeholder="Nome do hábito" onChange={(event) => setHabitName(event.target.value)} value={habitName} disabled={isDisabled ? true : false}></input>
                {enabled ? (                    <Days>
                    {week.map((item, index) => {
                        if (days.includes(index)) {
                            return (
                                <DaySelected key={index} onClick={() => {
                                    let n = days.indexOf(index)
                                    days.splice(n, 1)
                                    setDays([...days])
                                }}>{item}</DaySelected>
                            )
                        } else {
                            return (
                                <Day key={index} onClick={() => setDays([...days, index])}>{item}</Day>
                            )
                        }

                    })}
                </Days>):(                    <Days>
                    {week.map((item, index) => {
                        if (days.includes(index)) {
                            return (
                                <DaySelected key={index}>{item}</DaySelected>
                            )
                        } else {
                            return (
                                <Day key={index}>{item}</Day>
                            )
                        }

                    })}
                </Days>)}
                
                <End>
                    <div onClick={() => setCreateHabit(false)}>Cancelar</div>
                    <button disable={isDisabled} type="submit" onClick={(event) => {
                        postHabit(event)
                        setHabitName()
                    }}>{button ? <ThreeDots color="#FFFFFF" height={80} width={80} /> : "Salvar"}</button>
                </End>
            </NewHabit>
        </form>
    )

    return (
        <Main>
            <Top>
                <h1>Meus Hábitos</h1>
                <div onClick={() => setCreateHabit(true)}>+</div>
            </Top>
            {createHabit ? element : ""}
            {habits.length !== 0 ? "":noHabit}

            {habits.map((habit) => {
                return (
                    <Habit key={habit.id}>
                        <main>
                            <h1>{habit.name}</h1>
                            <ion-icon id={habit.id} name="trash-outline" onClick={(event) => {
                                if (window.confirm("Deseja realmente apagar o hábito ?")) {
                                    const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}`, config)
                                    promise.then(() => setUpdate(!update))
                                }

                            }}></ion-icon>
                        </main>
                        <Days>
                            {week.map((item, index) => {
                                if (habit.days.includes(index)) {
                                    return (
                                        <DaySelected key={index}>{item}</DaySelected>
                                    )
                                } else {
                                    return (
                                        <Day key={index}>{item}</Day>
                                    )
                                }
                            })}
                        </Days>
                    </Habit>
                )
            })}
        </Main>
    )
}

const Main = styled.div`
    height: 1vh;
    width: 375px;
    height: 100%;
    background-color: #E5E5E5;
    padding-left:18px;
    padding-right: 18px;
    padding-bottom: 70px;

    p{
        font-size: 18px;
        color: #666666;
    }
`

const Top = styled.div`
    display:flex;
    justify-content: space-between;
    padding-top: 30px;
    margin-bottom: 30px;

    h1{
        color: #126BA5;
        font-size: 23px;
    }

    div{
        width:40px;
        height:35px;
        background-color: #52B6FF;
        font-size:35px;
        display:flex;
        justify-content:center;
        align-items:center;
        color:#FFFFFF;
        font-weight:700;
        border-radius: 5px;
        cursor: pointer;
    }
`

const Day = styled.div`
    height:30px;
    width: 30px;
    margin-right: 4px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items:center;
    color: #DBDBDB;
`

const DaySelected = styled.div`
    height:30px;
    width: 30px;
    margin-right: 4px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items:center;
    color: #FFFFFF;
    background-color: #CFCFCF;
`
const NewHabit = styled.div`
    width:340px;
    height: 180px;
    border-radius: 5px;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items:center;
    margin-bottom: 30px;

    input{
        width:300px;
        height:45px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        margin-top: 18px;
        margin-bottom: 8px;
    }

    input:disabled{
        color:#F2F2F2;
    }

    input::-webkit-input-placeholder{
        font-size:20px;
        color:#DBDBDB;
        padding-left:11px;
    }
`

const Days = styled.div`
    display: flex;
    align-self: flex-start;
    margin-left: 20px;
`

const End = styled.div`
    align-self: flex-end;
    display: flex;
    margin-top: 30px;

    button{
        all:unset;
        width: 85px;
        height: 35px;
        background-color: #52B6FF;
        margin-right: 16px;
        text-align: center;
        color: #FFFFFF;
        font-size: 16px;
        border-radius: 5px;
        cursor: pointer;
        margin-bottom: 20px;
        
    }
    
    button:disabled{
        opacity: 0.7;
    }

    div{
        width: 85px;
        height: 35px;
        color:#52B6FF;
        font-size: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
`

const Habit = styled.div`
    width: 340px;
    height: 90px;
    border-radius: 5px;
    background-color: #FFFFFF;
    margin-bottom: 20px;


    h1{
        font-size: 20px;
        color: #666666;
        margin-left: 20px;
        padding-top: 13px;
        margin-bottom: 8px;
    }

    main{
        display: flex;
        justify-content: space-between;
        padding-right: 10px;
    }

    ion-icon{
        padding-top: 15px;
        margin-left: 110px;
        font-size: 15px;
    }


`