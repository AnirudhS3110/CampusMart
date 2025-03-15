import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function Protected({children})
{
    const nav = useNavigate;

    const isLoggedIn = useSelector((state)=>state.authentication.isLoggedIn);

    useEffect(() => {
        if (!isLoggedIn) {
            nav('/Signin');
        }
    }, [isLoggedIn, nav]);

    return isLoggedIn ? children:null;

}