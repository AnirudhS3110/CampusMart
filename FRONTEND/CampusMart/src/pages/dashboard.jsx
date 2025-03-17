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
  import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { setUser ,setUserListing} from "@/redux/slices/UserSlice";
import axios from "axios";


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
                console.log(response.data);
                dispatch(setUser(response.data));
            }

        }
        getDashboard();
    },[])

    

    

    return(
        <section className="bg-[#05295e] flex flex-col items-center w-[100vw] h-[100vh] px-[30px] pb-[30px]  lg:px-[120px] overflow-y-auto pt-[20px] absolute  ">
            
            <hr className="bg-white"></hr>
            <div className="w-full h-[90%]">
                <div className="text-white font-semibold mb-[20px] lg:text-[30px] ">
                    <h3>Welcome back <span className="text-cyello">{userName}</span>!</h3>
                </div >
                    
                <div className="text-white lg:text-[30px] mb-[15px]">
                    <h2 className="text-[24px]">YOUR PURCHASES:</h2>
                    <div className="w-full h-[440px]">
                            <Carousel className="h-full">
                                <CarouselContent >
                                    <CarouselItem className="h-full md:basis-1/2 lg:basis-1/4">
                                        <Card  className="bg-[#0f3772] border-[#07295c]" >
                                            <CardHeader className="mx-auto text-white">
                                                <h3>Add new Item</h3>

                                            </CardHeader>
                                            <CardContent  className=" mx-auto h-[200px]" >
                                                <motion.button whileTap={{scale:1.05}} onClick={()=>{nav('/marketPlace')}} className=" h-full rounded-[50%]" >
                                                    <CirclePlus className="w-20 h-20" color="white">
                                                        Add
                                                    </CirclePlus>
                                                </motion.button>
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                    
                                   

                                    <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                                    <Card className="bg-[#0b336e] border-[#07295c] text-white py-[14px] max-h-[440px]" >
                                    <CardHeader className="flex flex-row justify-between px-[8px]  " >
                                                <div className="text-white text-[16px] my-auto">
                                                    <h2 className="text-[20px]">Seller</h2>
                                                </div>
                                                {/* <motion.div whileTap={{scale:1.03}} className="my-auto">
                                                    <Button variant={Ghost} className="bg-cblue hover:bg-blue-500">
                                                        Chat To Seller
                                                    </Button>

                                                </motion.div> */}
                                            </CardHeader>
                                            <CardContent className="h-[200px] px-0 pb-0 mb-0">
                                                <img className="rounded-tr-md h-full w-full object-fill rounded-tl-md" src="https://stimg.cardekho.com/images/carexteriorimages/930x620/Maruti/Dzire/11387/1731318279714/front-left-side-47.jpg?impolicy=resize&imwidth=420"/>
                                            </CardContent>
                                            <CardFooter className="flex w-full flex-col px-0 pb-[6px] gap-[8px]">

                                                <div className="text-white flex w-full  justify-between px-[8px] ">
                                                    <div className="w-[50%]">
                                                    <h2 className="text-[26px] ">4000</h2>
                                                    </div>
                                                    <div className=" my-auto">
                                                        <h2 className="text-[20px] ">12.0.2005</h2>
                                                    </div>
                                                </div>

                                                

                                                <div className="text-white w-full max-h-[40px] px-[8px]">
                                                    <div className="text-[12px] w-full overflow-y-hidden scrollbar-hide">
                                                    When you want the image to shrink only if it overflows.
                                                    </div>
                                                </div>

                                                {/* <motion.div className="w-full flex justify-center" whileTap={{scale:1.03}}>
                                                    <Button variant={Ghost} className="bg-cblue w-[90%] mx-auto pb-[6px]">
                                                            Add to Cart!
                                                    </Button>
                                                </motion.div> */}
                                                
                                            </CardFooter>
                                    </Card>
                                </CarouselItem>
                                    
                                                                       
                                </CarouselContent>
                            </Carousel>
                    </div>

                </div>

                <div className="text-white lg:text-[30px] mb-[15px]">
                    <h2 className="text-[24px]">YOUR FAVOURITES:</h2>
                    <div className="w-full">
                            <Carousel className="">
                                <CarouselContent >
                                    <CarouselItem className=" md:basis-1/2 lg:basis-1/4">
                                            <Card  className="bg-[#0f3772] border-[#07295c]" >
                                                <CardHeader className="mx-auto text-white">
                                                    <h3>Add new Item</h3>

                                                </CardHeader>
                                                <CardContent  className="h-[200px] mx-auto" >
                                                    <motion.button whileHover={{scale:1.03}} whileTap={{scale:1.05}} onClick={()=>{nav('/marketPlace')}} className="  rounded-[50%]" >
                                                        <CirclePlus className="w-20 h-20" color="white">
                                                            Add
                                                        </CirclePlus>
                                                    </motion.button>
                                                </CardContent>
                                            </Card>
                                    </CarouselItem>
                                    
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                                    <Card className="bg-[#0b336e] border-[#07295c] text-white py-[14px] max-h-[440px]" >
                                    <CardHeader className="flex flex-row justify-between px-[8px]  " >
                                                <div className="text-white text-[16px] my-auto">
                                                    <h2 className="text-[20px]">title</h2>
                                                </div>
                                                <motion.div whileTap={{scale:1.03}} className="my-auto">
                                                    <Button variant={Ghost} className="bg-cblue hover:bg-blue-500">
                                                        Chat To Seller
                                                    </Button>

                                                </motion.div>
                                            </CardHeader>
                                            <CardContent className="h-[200px] px-0 pb-0 mb-0">
                                                <img className="rounded-tr-md h-full w-full object-fill rounded-tl-md" src="https://stimg.cardekho.com/images/carexteriorimages/930x620/Maruti/Dzire/11387/1731318279714/front-left-side-47.jpg?impolicy=resize&imwidth=420"/>
                                            </CardContent>
                                            <CardFooter className="flex w-full flex-col px-0 pb-[6px] gap-[8px]">

                                                <div className="text-white flex w-full  justify-between px-[8px] ">
                                                    <div className="w-[50%]">
                                                    <h2 className="text-[26px] ">4000</h2>
                                                    </div>
                                                    <div className=" my-auto">
                                                        <h2 className="text-[20px] ">12.0.2005</h2>
                                                    </div>
                                                </div>

                                                

                                                <div className="text-white w-full max-h-[40px] px-[8px]">
                                                    <div className="text-[12px] w-full overflow-y-hidden scrollbar-hide">
                                                    When you want the image to shrink only if it overflows.
                                                    </div>
                                                </div>

                                                <motion.div className="w-full flex justify-center" whileTap={{scale:1.03}}>
                                                    <Button variant={Ghost} className="bg-cblue w-[90%] mx-auto pb-[6px]">
                                                            Add to Cart!
                                                    </Button>
                                                </motion.div>
                                                
                                            </CardFooter>
                                    </Card>
                                </CarouselItem>
                                                                       
                                </CarouselContent>
                            </Carousel>
                    </div>

                </div>

                
                <div className="text-white lg:text-[30px] mb-[15px]">
                    <h2 className="text-[24px]">Your Listings:</h2>
                    <div className="w-full">
                        <AdUserListing  />
                    </div>
                </div>

            </div >
        </section>
    )
}

function AdUserListing()
{
    const userListing = useSelector((state)=>state.user.userListing)
    const nav = useNavigate();
    const [open, setOpen] = useState(false);
    
    return(
        <Carousel>
            <CarouselContent>
            
        {userListing.map((item)=><CarouselItem className="md:basis-1/2 lg:basis-1/4">
                                    <Card key={item._id} className="bg-[#0b336e] text-white py-[14px] max-h-[440px] border-0" >
                                    <CardHeader className="flex flex-row justify-between px-[8px]  " >
                                                <div className="text-white text-[16px] my-auto">
                                                    <h2 className="text-[20px]">{item.title}</h2>
                                                </div>
                                                <motion.div whileTap={{scale:1.03}} transition={{ type: "spring", stiffness: 200, damping: 10 }} className="my-auto">
                                                <Dialog open={open} onOpenChange={setOpen}>
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
                            <Button variant="destructive" onClick={() => { onDelete(item._id); setOpen(false); }}>
                                Yes, Delete
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                                                </motion.div>
                                            </CardHeader>
                                            <CardContent className="h-[200px] px-0 pb-0 mb-0">
                                                <img className="rounded-tr-md h-full w-full object-fill rounded-tl-md" src={item.image}/>
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

                                                <motion.div className="w-full flex justify-center" whileTap={{scale:1.03}} transition={{ type: "spring", stiffness: 200, damping: 10 }}>
                                                    <Button variant={Ghost} className="bg-[#0f4eec] w-[90%] mx-auto pb-[6px]">
                                                            Edit
                                                    </Button>
                                                </motion.div>

                                                
                                                
                                            </CardFooter>
                                    </Card>
                                </CarouselItem>)}

                                <CarouselItem className=" md:basis-1/2 lg:basis-1/4 max-h-[450px]">
                                            <Card  className="bg-[#0f3772] h-full border-0" >
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
        
            </CarouselContent>
        </Carousel>
)

}

async function onDelete(id)
{
    const token = localStorage.getItem('Authtoken');
    const rollNumber = useSelector((state)=>state.authentication.rollNumber)
    const productID = id.toString();
    const dispatch = useDispatch()
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
           try{
            const res = await axios.post("http:/localhost:3000/users/viewListings",
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
                dispatch(setUserListing(res.data.userListing))
            }
           }
           catch(e)
            {
                console.log("Internal server error while deleting: ", e);

            }


        }
        
    }
    catch(e)
    {
        console.log("Internal server error while delting: ", e);
    }

    
}