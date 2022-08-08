import styled from "styled-components"
import UserContext from "../contexts/userContext"
import { useContext } from "react"

export default function Header() {
    const { user } = useContext(UserContext)

    return (
        <>
            <Top>
                <h1>TrackIt</h1>
                <img src={user.image}></img>
            </Top>
        </>
    )


}

const Top = styled.header`
    background-color: #126BA5;
    height: 70px;
    width: 375px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    top: 0;
    left: 0;
    position:fixed;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    z-index:1;

    h1{
        font-size:40px;
        color: #FFFFFF;
    }

    img{
        width: 50px;
        border-radius: 100%;
    }
`

