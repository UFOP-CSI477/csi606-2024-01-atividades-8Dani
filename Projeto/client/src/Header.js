import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
    const {setUserInfo,userInfo} = useContext(UserContext);
    useEffect(() => {
        fetch('http://localhost:4000/profile', {
            credentials: 'include',
        }).then(response => {
           response.json().then(userInfo => {
             setUserInfo(userInfo);
            }) 
        })
    }, []);

    function logout() {
        //invalidar o cookie
        fetch('http://localhost:4000/logout', {
           credentials: 'include',
           method: 'POST', 
        })
        setUserInfo(null);
    }

    const username = userInfo?.username;

    return (
        <header>
        <Link to = "/" className="logo">Banco de receitas</Link>
        <nav>
           {username && (
            <>
                <span>Olá, {username}</span>
                <Link to="/create">Criar novo post</Link>
                <a onClick={logout}>Sair</a>
            </>
           )} 
           {!username && (
            <>
                <Link to = "/login"> Login </Link>
                <Link to = "/registro"> Registro </Link>
            </>
           )}

        </nav>
      </header>
    );
}