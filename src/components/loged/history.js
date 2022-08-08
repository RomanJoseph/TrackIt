import Header from "./header";
import Menu from "./menu";
import styled from "styled-components";

export default function History() {
    return (
        <>
            <Header />
            <Main>
                <Top>
                    <h1>Histórico</h1>
                    <p>Em breve você poderá o histórico dos seus hábitos aqui!</p>
                </Top>
            </Main>
            <Menu />
        </>
    )
}

const Main = styled.div`
    height: 1vh;
    width: 375px;
    height: 1080px;
    background-color: #E5E5E5;
    padding-left:18px;
    padding-right: 18px;
`

const Top = styled.div`
    padding-top: 30px;
    margin-bottom: 30px;

    h1{
        color: #126BA5;
        font-size: 23px;
        margin-bottom: 18px;
    }

    p{
        font-size: 18px;
        color: #666666;
    }
`