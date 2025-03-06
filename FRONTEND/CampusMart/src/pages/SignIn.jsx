import { motion } from "motion/react";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';





export default function Signin()
{
    const [password,setPassword] = useState("");
    const [rollno,setRollNo] = useState("");
    const [error,setError] = useState("");
    const nav = useNavigate();

    return(
        <section className="bg-cblue flex items-center w-[100vw] h-[100vh]  px-[140px] ">

            <div className=" flex  flex-row justify-start flex-wrap mx-auto">

                    <div className="bg-cyello h-auto flex align-middle text-white font-poppins border-white border-[2px] rounded-l-[20px] items-center">
                        <Form  password={password} setPassword={setPassword}  rollno = {rollno} setRollNo = {setRollNo} error={error} setError={setError} ></Form>
                    </div>


                    <div className="flex h-full  lg:flex-col gap-[30px] justify-center text-poppins bg-[#0C4CAB] text-white font-semibold lg:text-[40px] border-[2px] rounded-r-2xl border-white lg:px-[80px] lg:pt-[110px] pb-[90px]">
                            <div className="lg:leading-[40px]">
                                <p className="text-center mb-[0px] ">Welcome</p>
                                <p className="text-center mb-[0px]">to</p>
                                <p className="text-center mb-[0px] font-normal"  ><span className="text-cyello font-semibold">Campus</span>Mart</p>
                            </div>
                            <motion.button whileTap={{scale:0.95}} className="bg-cyello rounded-[32px] font-normal lg:text-[28px] py-[8px] px-[16px]" onClick={hitServer}>
                                Sign in
                            </motion.button>
                            <p className="text-[14px] font-normal text-center">New to CampusMart? <Link className="transition-colors duration-200 font-semibold hover:text-cyello" to={'/signup'}>Signup</Link></p>

                    </div>

            </div>

        </section>
        
    )

    async function hitServer()
    {
        if(password != '' && rollno!= '')
        {
            try{
                
                const result = await axios.get('http://localhost:3000/authentication/signin',
                    
                    {
                        headers:{
                            'Content-Type': 'Application/json',
                            'rollnumber': rollno,
                            'password': password
                        }
                    }
                )

              
                
                if(result.data.success)
                {
                    const token = result.data.token;
                    console.log(token);
                    localStorage.setItem("authToken",token);
                    console.log("Login successful!");
                    setPassword("");
                    setRollNo("");
                    nav('/dashboard');

                }
                else{
                    setError(result.data.message);
                }
            }
            catch(e)
            {
                setError(e.response ? e.response : "server error");
            }
        }
        else{
            setError("Please enter all the fields");
        }
    }
}

function Form({password,setPassword,rollno,setRollNo,error})
{
    return(
        <div className="w-full py-[50px] ">
            <form onSubmit={(e)=>{e.preventDefault();}} className="flex   justify-start  flex-col gap-[15px] ">
                
                <div className="flex flex-col justify-start gap-[8px] lg:px-[50px]">
                    <label className=" w-full justify-start font-semibold text-[20px]">Enter your Roll Number</label>
                    <input className="w-full bg-white rounded-[18px] px-[12px] py-[6px] text-black focus:outline-white" value={rollno} onChange={e=>setRollNo(e.target.value)} type="text" placeholder="Enter your Roll Number" />
                </div>
                <div className="flex flex-col justify-start gap-[8px] lg:px-[50px]">
                    <label className="font-semibold text-[20px]">Enter Your password</label>
                    <input className="bg-white rounded-[18px] px-[12px] py-[6px] text-black focus:outline-white" value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Enter password" />
                </div>
                
            </form>
            <div className=" mt-[20px] text-center">
                {error.length!=0 && <div className="text-poppins text-white font-normal text-[18px]">{error} </div>}
            </div>
        </div>
    )

}