import { motion } from "motion/react";
import { useState } from "react";
import { login } from "@/redux/slices/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";

import axios from 'axios';




export default function Signin()
{
    const [password,setPassword] = useState("");
    const [rollno,setRollNo] = useState("");
    const [error,setError] = useState("");
    const nav = useNavigate();
    const dispatch = useDispatch();

    return(
        <section className="bg-[#05295e] flex items-center w-[100vw] h-[100vh]  md:px-[140px] ">

            <div className=" flex  flex-row justify-start flex-wrap mx-auto">

                    <div className="bg-blue px-[30px] flex flex-col  md:bg-cyello h-auto align-middle rounded-r-[20px] min-w-[300px] max-w-[325px] text-white font-poppins border-white border-[2px] md:min-w-[400px] md:rounded-r-0  md:flex-row rounded-l-[20px] md:rounded-r-[0px] items-center">
                    <p className="text-center text-[30px] mt-[5px] md:hidden">Sign In</p>
                        <Form  password={password} setPassword={setPassword}  rollno = {rollno} setRollNo = {setRollNo} error={error} setError={setError} hitServer={hitServer} ></Form>
                    </div>


                    <div className=" hidden md:flex h-full lg:flex-col gap-[30px] justify-center text-poppins bg-[#0C4CAB] text-white font-semibold lg:text-[40px] border-[2px] rounded-r-2xl border-white lg:px-[80px] lg:pt-[110px] pb-[90px]">
                            <motion.div
                            initial={{opacity:0,y:-30}}
                            whileInView={{opacity:1,y:0}}
                            transition={{duration:1.1}}
                            viewport={{once:true,amount:.3}}
                             className="lg:leading-[40px]">
                                <p className="text-center mb-[0px] ">Welcome</p>
                                <p className="text-center mb-[0px]">back to</p>
                                <p className="text-center mb-[0px] font-normal"  ><span className="text-cyello font-semibold">Campus</span>Mart</p>
                            </motion.div>
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
                console.log("Goint to send request")
                console.log("rollno: ",rollno ,"\n password:",password)
                
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
                    const payload = {rollNumber: result.data.rollNumber , token:token , userID:result.data.userID, userName:result.data.username};
                    dispatch(login(payload));
                    localStorage.setItem('Authtoken',token); 
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
                setError( "server error");
            }
        }
        else{
            setError("Please enter all the fields");
        }
    }
}

function Form({password,setPassword,rollno,setRollNo,error,hitServer})
{
    return(
        <div className="w-full py-[50px] ">
            <form onSubmit={(e)=>{e.preventDefault() ; hitServer();}} className="flex   justify-start  flex-col gap-[15px] ">
                
                <div className="flex flex-col justify-start gap-[8px] lg:px-[50px]">
                    <label className=" w-full justify-start font-semibold text-[20px]">Enter your Roll Number</label>
                    <input className="w-full bg-white rounded-[18px] px-[12px] py-[6px] text-black focus:outline-white" value={rollno} onChange={e=>setRollNo(e.target.value)} type="text" placeholder="Enter your Roll Number" />
                </div>
                <div className="flex flex-col justify-start gap-[8px] lg:px-[50px]">
                    <label className="font-semibold text-[20px]">Enter Your password</label>
                    <input className="bg-white rounded-[18px] px-[12px] py-[6px] text-black focus:outline-white" value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Enter password" />
                </div>
                <motion.div whileTap={{scale:1.03}} className="flex justify-center md:hidden">
                    <Button type="submit" variant="Ghost" className="rounded-[16px] bg-cyello w-full border-[1px] border-cyello hover:bg-cyello hover:border-cyello">
                        Sign In
                    </Button>
                </motion.div>
                
            </form>
            <div className=" mt-[20px] text-center">
                {error.length!=0 && <div className="text-poppins text-white font-normal text-[18px]">{error} </div>}
            </div>
        </div>
    )

}


