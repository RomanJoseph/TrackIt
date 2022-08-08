import dayjs from "dayjs"
import { useContext, useEffect, useState } from "react"
import UserContext from "../contexts/userContext"
import BarContext from "../contexts/todayBar"
import styled from "styled-components"
import axios from "axios"

export default function TodayContent() {
    const { user } = useContext(UserContext)
    const { bar,setBar } = useContext(BarContext)
    const week = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
    const monthDay = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
    const [data, setData] = useState([])
    const [done, setDone] = useState([])
    const [update, setUpdate] = useState(true)
    const now = dayjs()

    const config = { headers: { Authorization: `Bearer ${user.token}` } }
    setBar(done.length / data.length)

    useEffect(() => {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)
        promise.then(response => {
            setData(response.data)
            setDone(response.data.filter((item) => item.done))
        })
    }, [update])



    return (
        <Main>
            <Top>
                <h1>{week[now.$W]}, {monthDay[now.$D - 1]}/{monthDay[now.$M]}</h1>
                {bar !== 0 ? <p>{bar*100}% dos hábitos concluídos</p>: <p style={{color: "#BABABA"}}>Nenhum hábito concluído ainda</p>}
            </Top>
            {data.map((habit) => {
                console.log(done)
                return (
                    <Habit>
                        <Text>
                            <h1>{habit.name}</h1>
                            <p>Sequência atual: <span style={{ color: habit.done ? "#8FC549" : "" }}>{`${habit.currentSequence} ${habit.currentSequence === 1 ? "dia" : "dias"}`}</span></p>
                            <p>Seu recorde: <span style={{ color: habit.highestSequence === habit.currentSequence ? "#8FC549" : "" }}>{`${habit.highestSequence} ${habit.currentSequence === 1 ? "dia" : "dias"}`}</span></p>
                        </Text>
                        <ion-icon id={Number(habit.id)} style={{ color: habit.done ? "#8FC549" : "#E7E7E7" }} onClick={(event) => {
                            if (!habit.done) {
                                const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${event.target.id}/check`, {}, config)
                                setUpdate(!update)

                            } else {
                                const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${event.target.id}/uncheck`, {}, config)
                                setUpdate(!update)

                            }
                        }} name="checkbox"></ion-icon>
                    </Habit>
                )
            })}

        </Main>
    )
}

const Main = styled.div`
    height: 1vh;
    width: 375px;
    height: 1080px;
    background-color: #E5E5E5;
    padding-left:18px;
    padding-right: 18px;
    font-family: 'Lexend Deca', sans-serif;
    font-family: 'Roboto', sans-serif;
`

const Habit = styled.div`
    height: 95px;
    width:340px;
    border-radius: 5px;
    background-color: #FFFFFF;
    display: flex;
    justify-content: space-between;
    padding: 15px 15px 0 15px;
    margin-bottom: 10px;

    h1{
        font-size: 20px;
        margin-bottom: 10px;
    }

    p{
        font-size:13px;
    }

    ion-icon{
        font-size: 70px;
    }
`

const Top = styled.div`

    padding-top: 30px;
    margin-bottom: 30px;

    h1{
        color: #126BA5;
        font-size: 23px;
    }

    p{
        font-size: 18px;
        color: #8FC549;
    }
`

const Text = styled.div`
    display: flex;
    flex-direction: column;

`