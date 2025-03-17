import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export default function Protected({children})
{
    const nav = useNavigate();

    const isLoggedIn = useSelector((state)=>state.authentication.isLoggedIn);

    useEffect(() => {
        console.log("Login status cahnged to:", isLoggedIn);
        if (!isLoggedIn) {
            nav('/Signin');
        }
    }, [isLoggedIn]);

    return isLoggedIn ? children:null;

}