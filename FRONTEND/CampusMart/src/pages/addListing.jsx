import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import MultiStepForm from "@/components/multiStepInputbar/multiStepForm";   

  

export default function AddListing()
{
    const[title,setTitle] = useState("");
    const[price,setPrice] = useState("");
    const[description,setDescription] = useState("");
    const[category,setCategory] = useState("");
    const[error,setError] = useState("");
    const[file,setFile] = useState(null);
    const[loading,setLoading] = useState(false);
    const nav = useNavigate();
    const token = localStorage.getItem("Authtoken");
    const userID = useSelector((state)=>state.authentication.userID);
    const rollNumber = useSelector((state)=>state.authentication.rollNumber);
    const [formData,setFormData] = useState({
            title:"",
            price:"",
            category:"",
            description:"",
            file:null
        })

    async function getImageURL()
    {    
        console.log("Inside getImageURl");
        let formdata = new FormData();
        formdata.append('image',formData.file);
        try{
            const response = await axios.post('http://localhost:3000/uploads/singleUpload',formdata,
                {
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                }
            )
            if(response.data.success)
            {
                const jobID = response.data.jobID
                const polling =  setInterval(async()=>{
                    try{const res = await axios.post('http://localhost:3000/uploads/geturl',{
                        jobID:jobID
                    },{
                        headers:{
                            "Content-Type":"application/json"
                        }
                    })
                    if(res.data.success && res.data.status === 'completed')
                    {
                        clearInterval(polling);
                        return res.data.url
                    }
                    else if(!res.data.success)
                    {
                        clearInterval(polling);
                    }}
                    catch(e)
                    {
                        console.log("Error while polling");
                        clearInterval(polling);
                    }

                },1000)

                setTimeout(() => {
                    clearInterval(polling);  // Stop after 30 seconds
                    console.log("Polling stopped after timeout.");
                }, 30000);
            }
            else{
                setError(response.data.message)
                console.log(response.data.message);
            }

        }catch(e)
        {
            console.error("Error while converting image into url",e)
        }


    }

    async function onClickSend()
    {
        setLoading(true);
        try{
            const url = await getImageURL();
            console.log(url);
            if(!url)
                return;
            const response = await axios.post("http://localhost:3000/users/addItem",
                {
                    title:formData.title,
                    description:formData.description,
                    price:formData.price,
                    category:formData.category,
                    imageURL:url,
                    rollNumber:rollNumber
                },
                {
                    headers:{
                        'authorization':token,
                        'Content-Type':'application/json'
                    }
                });
            if(response.data.success)
            {
                setLoading(false)
                alert(`${response.data.message}, now Redirecting to your dashboard.`);
                nav('/dashboard');
            }
        }
        catch(e)
        {
            setFormData({
                title:"",
                price:"",
                category:"",
                description:"",
                file:null
            })
            setLoading(false);
            setError(`Internal Server Error: ${e}`);
        }
        

    }

    return(
        <section className=" w-[100vw] min-h-[100vh] lg:px-[120px] bg-[#05295e] flex flex-col justify-center items-center px-[15px]">
             {loading==false &&  <MultiStepForm formData={formData} setFormData={setFormData} onClickSend={onClickSend}/> }
            {loading && <div className="mx-auto my-auto flex flex-col gap-[3px] justify-center items-center text-white text-[40px]">
                <LoadingDots/>
                <h3 className="text-[32px] text-cyello">Creating new List...</h3></div>}

            

        </section>
    )
}

const LoadingDots = () => {
    return (
      <div className="flex justify-center items-center space-x-2 h-24">
        <span className="w-6 h-6 bg-cyello rounded-full animate-bounce"></span>
        <span className="w-6 h-6 bg-cyello rounded-full animate-bounce [animation-delay:0.2s]"></span>
        <span className="w-6 h-6 bg-cyello rounded-full animate-bounce [animation-delay:0.4s]"></span>
      </div>
    );
  };
  
 
  