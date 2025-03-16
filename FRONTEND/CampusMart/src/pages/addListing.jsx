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

    async function getImageURL()
    {    
        console.log("Inside getImageURl");
        let formData = new FormData();
        formData.append('image',file);
        try{
            const response = await axios.post('http://localhost:3000/uploads/singleUpload',formData,
                {
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                }
            )
            if(response.data.success)
            {
                const url = response.data.url.toString();
                console.log("url: ", url)
                return url;
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
        if(title == '' || description == '' || category == '' || !file || price == '')
            {
                setError("input all the fields!");
                return;
            }
        setLoading(true);
        try{
            const url = await getImageURL();
            console.log(url);
            if(!url)
                return;
            const response = await axios.post("http://localhost:3000/users/addItem",
                {
                    title:title,
                    description:description,
                    price:price,
                    category:category,
                    imageURL:url,
                    seller:userID
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
            setCategory("");
            setDescription("");
            setTitle("");
            setFile(null);
            setLoading(false);
            setError(`Internal Server Error: ${e}`);
        }
        

    }

    return(
        <section className=" w-[100vw] h-[100vh] lg:px-[120px] bg-cblue flex flex-col px-[15px]">
            {loading==false && (<form className="flex flex-col gap-[16px]" onSubmit={(e)=>{e.preventDefault();  onClickSend();}}>
                <div>
                    <h3 className="text-white text-[24px] mb-[8px]">Title:</h3>
                    <input value={title} onChange={(e)=>{setTitle(e.target.value)}} type = "text" placeholder="Enter title..." className="bg-white text-black px-[8px] py-[4px] focus-white text-[16px] rounded-md" ></input>
                </div>

                <div>
                    <h3 className="text-white text-[24px] mb-[8px]">Description:</h3>
                    <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} type = "text" placeholder="Enter Description..." className="bg-white text-black px-[8px] py-[4px] min-w-[250px] lg:min-w-[350px] focus-white text-[16px] rounded-md" ></textarea>
                </div>

                <div>
                    <h3 className="text-white text-[24px] mb-[8px]">Title:</h3>
                    <input value={price} onChange={(e)=>{setPrice(e.target.value)}} type = "text" placeholder="Set price..." className="bg-white text-black px-[8px] py-[4px] focus-white text-[16px] rounded-md" ></input>
                </div>

                <div>
                    <h3 className="text-white text-[24px] mb-[8px]">Category:</h3>
                    <Select onValueChange={(value)=>setCategory(value)}>
                        <SelectTrigger className="w-[200px] bg-white text-black rounded-md">
                        <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                       <SelectContent>
                        <SelectItem value="Mobile">
                            Mobile
                        </SelectItem>
                        <SelectItem value="Electronics"> Electornics</SelectItem>
                        <SelectItem value="Dresses">Dresses</SelectItem>
                        <SelectItem value="Instruments"> Instruments</SelectItem>
                       </SelectContent>
                    </Select>
                </div>

                <div>
                    <h3 className="text-white text-[24px] mb-[10px]">Upload image:</h3>
                    <input
                    id="file-upload"
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden" 
                    />
                    <label
                        htmlFor="file-upload"
                        className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-200"
                    >
                        <span>Choose File </span>
                        <span className="mt-2 text-white bg-blue-500">
                        {file ? `: ${file.name} `: null}
                    </span>
                    </label>
                    
                    
                </div>

                <motion.div whileTap={{scale:1.03}}  className="flex" >
                    <Button type="submit" variant="ghost"  className="bg-cyello">
                        Submit
                    </Button>
                </motion.div>

                {error!='' && (<div className="text-white text-[18px]">
                            {error}
                    </div>)}
            </form>)}
            {loading && <div className="mx-auto my-auto text-white text-[40px]">Creating new List...</div>}

        </section>
    )
}