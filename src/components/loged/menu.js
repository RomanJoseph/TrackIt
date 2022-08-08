import styled from "styled-components"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from "react-router-dom";
import { useContext } from "react";
import BarContext from "../contexts/todayBar";

export default function Menu(){
    const { bar } = useContext(BarContext)

    return(
        <Bottom>
            <Link to="/habitos"><span>Hábitos</span></Link>
            <Link to="/hoje"><Bar><CircularProgressbar
            value={bar*100}
            text={"Hoje"}
            background
            backgroundPadding={6}
            styles={buildStyles({
              backgroundColor: "#52B6FF",
              textColor: "#FFFFFF",
              pathColor: "#FFFFFF",
              trailColor: "transparent"
            })} /></Bar></Link>
            <Link to="/historico"><span>Histórico</span></Link>
        </Bottom>
    )
}


const Bottom = styled.div`
    width: 375px;
    height: 70px;
    background-color:#FFFFFF;
    position:fixed;
    bottom:0;
    left:0;
    display:flex;
    align-items:center;
    justify-content: space-around;
    z-index: 1;

    span{
        color: #52B6FF;
        font-size: 18px;
    }
`

const Bar = styled.div`
    width: 90px;
    margin-bottom: 50px;
`