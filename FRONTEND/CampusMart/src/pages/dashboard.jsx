import React, { useEffect, useState } from "react";
import {CirclePlus,Pencil, Ghost} from 'lucide-react'
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
    const likedList = useSelector((state)=>state.user.likedListings)
    
    
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
                <div className="text-white font-semibold mb-[20px] md:text-[36px] ">
                    <h3>Welcome back <span className="text-cyello">{userName}</span>!</h3>
                </div >
                    
                <div className="text-white lg:text-[30px] mb-[18px]">
                    <h2 className="text-[28px]">YOUR PURCHASES:</h2>
                    <div className="w-full ">
                            <Carousel className="h-full">
                                <AddBoughtListing/>
                            </Carousel>
                    </div>

                </div>

                <div className="text-white md:text-[30px] mb-[18px]">
                    <h2 className="text-[28px]">YOUR FAVOURITES:</h2>
                    <div className="w-full">
                            <Carousel className="">
                                <AddLikedListing likedList={likedList}/>
                            </Carousel>
                    </div>

                </div>

                
                <div className="text-white  md:text-[30px] mb-[18px]">
                    <h2 className="text-[28px]">YOUR LISITNGS:</h2>
                    <div className="w-full">
                        
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
                                            <Card  className="bg-[#0f3772] min-h-[440px] h-full border-0 max-w-[305px] min-w-[300px] lg:min-h-[350px] flex flex-col justify-center " >
                                                <CardContent  className="h-full mx-auto flex min-w-[305px] flex-col justify-center items-center gap-[15px]" >
                                                <h3 className="text-white text-[24px]">Add new Item</h3>
                                                    <motion.button whileHover={{scale:1.03}} whileTap={{scale:1.05}} onClick={()=>{nav('/addListing')}} className=" rounded-[50%]" >
                                                        <CirclePlus className="  w-20 h-20 " color="white" >
                                                            
                                                        </CirclePlus>
                                                    </motion.button>
                                                </CardContent>
                                                
                                            </Card>
                                </CarouselItem>
            
        { userListing.map((item)=><CarouselItem className=" md:basis-1/2 lg:basis-1/4 min-h-[440px]">
            <Card className="max-w-[325px] min-w-[315px] max-h-[450px] py-0 bg-[#0b336e] border-[#05295e] box-border">
                                    
                                    <CardContent className={`min-h-[300px] px-0 bg-[#05295e] pt-0 my-0 overflow-hidden rounded-[20px]`} >
                                        <div className="min-w-[300px] w-[310px] max-w-[325px] h-[302px]  min-h-[300px] max-h-[306px] relative rounded-[20px] box-border">

                                            {item.image ? <motion.img whileHover={{scale:1.03}} transition={{duration:0.2, ease: "easeInOut"}}  className="w-full h-full rounded-[20px]  object-cover" src={`${item.image}?nocache${new Date()}`} /> : <div>Loafing image</div>}
                                            

                                            <motion.div whileTap={{scale:1.03}} transition={{ type: "spring", stiffness: 200, damping: 10 }} className="absolute top-2 left-2 md:top-0">
                                <Dialog open={openDel} onOpenChange={setOpenDel}>
                                        <DialogTrigger asChild>
                                            <motion.div whileTap={{scale:.95}}>
                                            <Button variant="ghost" className="bg-cyello text-white rounded-full transition-colors duration-300 hover:bg-red-600">
                                                Delete
                                            </Button>
                                            </motion.div>
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

                                        </div>
                                    </CardContent>
                
                                    <CardFooter className={`px-[4px] pt-0 my-0 py-0 `}>
                                        <div className="min-w-[300px] w-[302px] py-0 max-w-[325px] h-[302px] box-border px-[8px]  min-h-[300px] max-h-[306px] flex flex-col gap-[8px]">
                
                                            <div className="w-full flex py-0 justify-between items-center">

                                                <h2 className="text-cyello md:text-[24px] truncate">{item.title}</h2>


                                                <Dialog open={open} onOpenChange={setOpen}>
                                <DialogTrigger asChild>
                                    <motion.div className="max-w-[50%] flex justify-center" whileHover={{scale:1.03}} whileTap={{scale:.95}} transition={{ type: "spring", stiffness: 200, damping: 10 }}>
                                        <Button variant={Ghost} className="bg-white text-[#05295e] px-[10px] text-[18px] rounded-full w-[100%] mx-auto pb-[6px]">
                                                <Pencil/>  Edit
                                        </Button>
                                    </motion.div>
                                </DialogTrigger>
                                <DialogContent className={`bg-white text-[#05295e] border-0`}>
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
                                        <Button variant="outline" onClick={async()=>{console.log("Save button clicked");await handleOnCLick({url:item.image ,id:item._id ,oldrate:item.price ,olddescription:item.description}); await new Promise(r=>setTimeout(r,500)); setOpen(false);}}>Save</Button>
                                        </motion.div>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>



                                            </div>
                
                                            <div className="w-full text-gray-400 text-[14px] text-ellipsis line-clamp-2">
                                            {item.description}
                                            </div>
                                            
                                            <div className="w-full flex justify-items-start text-[15px] md:text-[18px] text-cyello justify-between">
                                                <h3>₹{item.price}</h3>
                                                {/* <h3>{item.seller? item.seller.userName.toUpperCase() : "Seller"}</h3> */}
                                            </div>
                
                                        </div>
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
            console.log("the time i received all dara from backend:", new Date());
            await new Promise((r)=>setTimeout(r,5000));
            console.log("the time i am gonna dispatch it to state variable:", new Date());
            console.log("Jus gonna dispatch teh data");
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

