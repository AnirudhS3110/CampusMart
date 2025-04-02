import React, { useEffect, useState } from "react";
import {CirclePlus, Ghost} from 'lucide-react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

  import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import AddLikedListing from "@/components/Dashboard/likedListing";
  import AddBoughtListing from "@/components/Dashboard/boughtUserListing";
//   import AddUserListing from "@/components/Dashboard/userLisitng";
  import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { setUser ,setUserListing} from "@/redux/slices/UserSlice";
import axios from "axios";
import store from "@/redux/store";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


export default function Dashboard()
{
    const dispatch = useDispatch();
    const rollNumber = useSelector((state)=>state.authentication.rollNumber); 
    const nav = useNavigate();
    const token = localStorage.getItem("Authtoken");
    const userName = useSelector((state)=>state.authentication.userName)

    
    
    useEffect(()=>{
        async function getDashboard()
        {
            const response = await axios.post("http://localhost:3000/users/getDashboard",
                {
                    rollNumber:rollNumber
                },
                {
                    headers:{
                        "authorization":token,
                        "Content-Type":'application/json'
                    }
                }
            );

            if(response.data.success)
            {
                dispatch(setUser(response.data));
            }

        }
        getDashboard();
    },[])

    

    

    return(
        <section className="bg-[#05295e] flex flex-col items-center w-[100vw] min-h-[100vh] px-[30px] pb-[30px]  md:px-[120px] overflow-y-auto pt-[20px] absolute  ">
            
            <hr className="bg-white"></hr>
            <div className="w-full h-[90%]">
                <div className="text-white font-semibold mb-[20px] md:text-[30px] ">
                    <h3>Welcome back <span className="text-cyello">{userName}</span>!</h3>
                </div >
                    
                <div className="text-white lg:text-[30px] mb-[15px]">
                    <h2 className="text-[24px]">YOUR PURCHASES:</h2>
                    <div className="w-full ">
                            <Carousel className="h-full">
                                <AddBoughtListing/>
                            </Carousel>
                    </div>

                </div>

                <div className="text-white md:text-[30px] mb-[15px]">
                    <h2 className="text-[24px]">YOUR FAVOURITES:</h2>
                    <div className="w-full">
                            <Carousel className="">
                                <AddLikedListing/>
                            </Carousel>
                    </div>

                </div>

                
                <div className="text-white  md:text-[30px] mb-[15px]">
                    <h2 className="text-[24px]">Your Listings:</h2>
                    <div className="w-full">
                        {console.log("About to run AdduserListing")}
                        <AddUserListing  />
                    </div>
                </div>

            </div >
        </section>
    )
}


function AddUserListing()
{
    const userListing = useSelector((state)=>state.user.userListing)
    const nav = useNavigate();
    const dispatch = useDispatch()

    useEffect(()=>{
        
    },[userListing])

    async function onDelete(id)
{
    const rollNumber = store.getState().authentication.rollNumber;
    
    const token = localStorage.getItem('Authtoken');
    const productID = id.toString();
    try{
        const res = await axios.post("http://localhost:3000/users/removeItem",
            {
                itemID : productID
            },
            {
                headers:{
                    "authorization":token,
                    "Content-Type":"application/json"
                }
            }
        )

        if(res.data.success)
        {
           if(rollNumber)
           {
            console.log("Okay we received the roll nnumber");
            try{
                const res = await axios.post("http://localhost:3000/users/viewListings",
                    {
                        rollNumber:rollNumber
                    },
                    {
                        headers:{
                            "authorization":token,
                            "Content-Type":'application/json'
                        }
                    }
                )
    
                if(res.data.success)
                {
                    dispatch(setUserListing(res.data))
                }
               }
               catch(e)
                {
                    console.log("Internal server error while deleting: ", e);
    
                }
           }
           else{
            console.log("Roll Number could not be fetched... :(")
            return;
           }


        }
        
    }
    catch(e)
    {
        console.log("Internal server error while delting: ", e);
    }

    
}



    const [open, setOpen] = useState(false);
    const [openDel,setOpenDel] = useState(false);
    const [rate, setRate] = useState(null);
    const [file,setFile] = useState(null);
    const [loading,setLoading] = useState(false);
    const [description,setDescription] = useState("");
    
    return(
        <Carousel>
            <CarouselContent>
            <CarouselItem className=" md:basis-1/2 lg:basis-1/4 max-h-[450px]">
                                            <Card  className="bg-[#0f3772] min-h-[300px] h-full border-0 max-w-[300px] min-w-[280px] lg:min-h-[350px]" >
                                                <CardHeader className="mx-auto text-white">
                                                    <h3 >Add new Item</h3>

                                                </CardHeader>
                                                <CardContent  className="h-full mx-auto" >
                                                    <motion.button whileHover={{scale:1.03}} whileTap={{scale:1.05}} onClick={()=>{nav('/addListing')}} className=" h-full rounded-[50%]" >
                                                        <CirclePlus className="  w-20 h-20 " color="white" >
                                                            
                                                        </CirclePlus>
                                                    </motion.button>
                                                </CardContent>
                                                <CardFooter></CardFooter>
                                            </Card>
                                </CarouselItem>
            
        { userListing.map((item)=><CarouselItem className=" md:basis-1/2 lg:basis-1/4 min-h-[440px]">
                                    <Card  className="bg-[#0b336e] text-white py-[14px] max-h-[440px] max-w-[300px] min-w-[280px]  border-0" >
                                    <CardHeader className="flex flex-row justify-between px-[8px]  " >
                                                <div className="text-white text-[16px] my-auto">
                                                    <h2 className="text-[20px]">{item.title}</h2>
                                                </div>
                                                <motion.div whileTap={{scale:1.03}} transition={{ type: "spring", stiffness: 200, damping: 10 }} className="my-auto">
                                                <Dialog open={openDel} onOpenChange={setOpenDel}>
                    <DialogTrigger asChild>
                        <Button variant="ghost" className="bg-cblue transition-colors duration-300 hover:bg-red-600">
                            Delete
                        </Button>
                    </DialogTrigger>

                    {/* Confirmation Dialog */}
                    <DialogContent className="p-6">
                        <DialogHeader>
                            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
                            <p className="text-gray-500">Are you sure you want to delete this item? This action cannot be undone.</p>
                        </DialogHeader>

                        <DialogFooter className="flex justify-end gap-4">
                            <Button variant="outline" onClick={() => setOpen(false)}>No</Button>
                            <Button variant="destructive" onClick={async() => { await onDelete(item._id); setOpenDel(false); }}>
                                Yes, Delete
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                                                </motion.div>
                                            </CardHeader>
                                            <CardContent className="h-[200px] px-0 pb-0 mb-0 overflow-hidden">
                                                <motion.img whileHover={{scale:1.03}} transition={{duration:0.2, ease: "easeInOut"}} className="rounded-tr-md h-full w-full object-fill rounded-tl-md" src={item.image}/>
                                            </CardContent>
                                            <CardFooter className="flex w-full flex-col px-0 gap-[8px]">

                                                <div className="text-white flex w-full  justify-between px-[8px] ">
                                                    <div className="w-[50%]">
                                                    <h2 className="text-[26px] text-cyello ">{item.price}</h2>
                                                    </div>
                                                    <div className=" my-auto">
                                                        <h2 className="text-[20px] ">{item.createdAt.split("T")[0]}</h2>
                                                    </div>
                                                </div>

                                                

                                                <div className="text-white w-full max-h-[40px] px-[8px]">
                                                    <div className="text-[12px] w-full overflow-y-hidden scrollbar-hide">
                                                        {item.description}
                                                    </div>
                                                </div>

                                                <Dialog open={open} onOpenChange={setOpen}>
                                                    <DialogTrigger asChild>
                                                        <motion.div className="w-full flex justify-center" whileTap={{scale:1.03}} transition={{ type: "spring", stiffness: 200, damping: 10 }}>
                                                            <Button variant={Ghost} className="bg-[#0f4eec] w-[90%] mx-auto pb-[6px]">
                                                                    Edit
                                                            </Button>
                                                        </motion.div>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Edit your listing:</DialogTitle>
                                                        </DialogHeader>
                                                        <div>
                                                            <Label>Set Rate</Label>
                                                            <Input type="number" value={rate} onChange={(e)=>setRate(e.target.value)}></Input>
                                                            <Label> Set Description</Label>
                                                            <Textarea  maxLength={100} value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description must be less than 100 characters" type="text"></Textarea>
                                                            <Label>Set image</Label>
                                                            <Input type="file" onChange={(e)=>setFile(e.target.files[0])}></Input>
                                                            
                                                        </div>

                                                        <DialogFooter className="flex justify-center">
                                                            <div className="text-gray">
                                                                {loading && <h2 className="text-[14px]">Saving the changes..</h2>}
                                                            </div>
                                                            <motion.div >
                                                            <Button variant="outline" onClick={async()=>{console.log("Save button clicked");await handleOnCLick({url:item.image ,id:item._id ,oldrate:item.price ,olddescription:item.description}); setOpen(false);}}>Save</Button>
                                                            </motion.div>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                                

                                                
                                                
                                            </CardFooter>
                                    </Card>
                                </CarouselItem>)}

                                
        
            </CarouselContent>
        </Carousel>
)

async function getItems()
{
    const rollNumber = store.getState().authentication.rollNumber;
    const token = localStorage.getItem("Authtoken")
    const dispatch = store.dispatch
    try{
        const res = await axios.post("http://localhost:3000/users/viewListings",
            {
                rollNumber:rollNumber
            },
            {
                headers:{
                    "authorization":token,
                    "Content-Type":'application/json'
                }
            }
        )

        if(res.data.success)
        {
            dispatch(setUserListing(res.data));
            return true;
        }
       }
       catch(e)
        {
           
            console.log("Internal server error while deleting: ", e);
            return false;

        }
}

async function handleOnCLick({url,id,oldrate,olddescription})
{
    setLoading(true);
    const token = localStorage.getItem('Authtoken');
    if(file)
    {
        let formData = new FormData();
        formData.append('image',file);
        const index = url.indexOf("/campusMart")
        const publicId = url.substring(index + 1, url.lastIndexOf(".")); 
        try{
            const res = await axios.post("http://localhost:3000/uploads/singleupload",formData,
                {
                    
                        headers:{
                            "authorization":token,
                            "Content-Type":"multipart/form-data"
                        }
                    
                }
            )
            if(res.data.success)
            {
                const newPath = res.data.url;
                const response = await axios.post("http://localhost:3000/uploads/editupload",
                    {
                        publicID:publicId,
                        newPath:newPath
                    }
                )
                if(response.data.success)
                {
                    console.log("description: ", description ,"\n rate:",rate);
                    if(description=='' && rate==null)
                    {
                        const bool = await getItems()
                        if(bool)
                        {
                            console.log("Update got re rendered");
                            

                        }
                            
                        else{
                            console.log("re rendering attempt Failed");
                            
                        }
                        
                    }
                }
            }
        }catch(e){
            console.log("Error while Replacinfg the old pik with new one.",e);
        }
        finally{
            setFile(null);
            setLoading(false);
        }
    }

    if(description!='' || rate)
    {
        let setprice = (rate) ? rate : oldrate;
        let setdescription = (description) ? description : olddescription;
        try{
            const resp = await axios.post("http://localhost:3000/users/editItem",
                {
                    itemID:id,
                    price:setprice,
                    description:setdescription 
                },
                {
                    headers:{
                        "authorization":token,
                        "Content-Type":"application/json"
                    }
                }
            )

            if(resp.data.success)
            {
                const bool = await getItems()
                if(bool)
                    console.log("Update got re rendered");
                else{
                    console.log("re rendering attempt Failed");
                }
            }


        }catch(e)
        {

        }
        finally{
            setDescription("");
            setRate(null);
            setFile(null);
            setLoading(false);
        }

    }

}
}

