import { motion } from "motion/react";
import { useState } from "react"
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";


export default function Signup()
{
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [confirmpass,setConfirmPass] = useState("");
    const [rollno,setRollNo] = useState("");
    const [error,setError] = useState("");
    const nav = useNavigate();

    async function hitServer()
    {
        if(password != '' && rollno!= '' && confirmpass!='' && username!='')
        {
            try{
                
                const result = await axios.post('http://localhost:3000/authentication/signup',
                    {
                        username:username,
                        rollnumber: rollno,
                        password: password,
                        checkpassWord:confirmpass
                    },
                    
                    {
                        headers:{
                            'Content-Type': 'Application/json',   
                        }
                    }
                )

              
                
                if(result.data.success)
                {
                    nav('/signin')
                }
                else{
                    setError(result.data.message);
                }
            }
            catch(e)
            {
                setError(e.response ? e.response : "internal-server error");
            }
        }
        else{
            setError("Please enter all the fields");
        }
    }

    return(
        <section className="bg-cblue flex items-center w-[100vw] h-[100vh]  px-[140px] ">

            <div className=" flex flex-row justify-start flex-wrap mx-auto">

                    <div className="bg-cyello flex align-middle h-auto text-white font-poppins border-white border-[2px] rounded-l-[20px] items-center">
                        <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} confirmpass={confirmpass} setConfirmPass = {setConfirmPass} rollno = {rollno} setRollNo = {setRollNo} error={error} setError={setError} ></Form>
                    </div>


                    <div className="flex  lg:flex-col gap-[30px] justify-center text-poppins bg-[#0C4CAB] text-white font-semibold lg:text-[40px] border-[2px] rounded-r-2xl border-white lg:px-[80px] lg:pt-[110px] pb-[90px]">
                            <div className="lg:leading-[40px]">
                                <p className="text-center mb-[0px] ">Welcome</p>
                                <p className="text-center mb-[0px]">to</p>
                                <p className="text-center mb-[0px] font-normal"  ><span className="text-cyello font-semibold">Campus</span>Mart</p>
                            </div>
                            <motion.button whileTap={{scale:0.95}} className="bg-cyello rounded-[32px] font-normal lg:text-[28px] py-[8px] px-[16px]" onClick={hitServer}>
                                Sign up
                            </motion.button>
                            <p className="text-[14px] font-normal text-center">Already have an account? <Link to={'/signin'} className="transition-colors duration-200 font-semibold hover:text-cyello">Signin</Link></p>

                    </div>

            </div>

        </section>
        
    )
}

function Form({username,setUsername,password,setPassword,confirmpass,setConfirmPass,rollno,setRollNo,error,setError})
{
    return(
        <div className="w-full py-[50px] ">
            <form onSubmit={(e)=>{e.preventDefault();}} className="flex   justify-start  flex-col gap-[15px] ">
                <div className="flex items-center justify-start flex-col gap-[8px] lg:px-[50px]">
                    <label className="w-full font-semibold text-[20px]">Select a username</label>
                    <input className=" w-full bg-white rounded-[18px] px-[12px] py-[6px] text-black focus:outline-white" value={username} onChange={e=>setUsername(e.target.value)} type="text" placeholder="Enter your username" />
                </div>
                <div className="flex flex-col justify-start gap-[8px] lg:px-[50px]">
                    <label className=" w-full justify-start font-semibold text-[20px]">Enter your Roll Number</label>
                    <input className="w-full bg-white rounded-[18px] px-[12px] py-[6px] text-black focus:outline-white" value={rollno} onChange={e=>setRollNo(e.target.value)} type="text" placeholder="Enter your Roll Number" />
                </div>
                <div className="flex flex-col justify-start gap-[8px] lg:px-[50px]">
                    <label className="font-semibold text-[20px]">Set password</label>
                    <input className="bg-white rounded-[18px] px-[12px] py-[6px] text-black focus:outline-white" value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Enter password" />
                </div>
                <div className="flex flex-col justify-start gap-[8px] lg:px-[50px]">
                    <label className="font-semibold text-[20px]">Confirm password</label>
                    <input className="bg-white rounded-[18px] px-[12px] py-[6px] text-black focus:outline-white" value={confirmpass} onChange={e=>setConfirmPass(e.target.value)} type="password" placeholder="Confirm password" />
                </div>
            </form>
            <div className=" mt-[20px] text-center">
                {error.length!=0 && <div className="text-poppins text-white font-normal text-[18px]">{error} </div>}
            </div>
        </div>
    )

}