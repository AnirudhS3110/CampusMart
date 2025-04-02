import React from "react";
import { motion } from "framer-motion";
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
import store from "@/redux/store";
import { useNavigate } from "react-router-dom";

export default function AddBoughtListing()
{
    const boghtList = store.getState().user.boughtListing;
    const nav = useNavigate();

    return(
        <CarouselContent>
            <CarouselItem className="h-full md:basis-1/2 lg:basis-1/4">
                                                    <Card  className="bg-[#0f3772] max-w-[300px] min-w-[280px] border-[#07295c]" >
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

            {boghtList.map((item)=><CarouselItem className="md:basis-1/2 lg:basis-1/4">
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
                                                            <img className="rounded-tr-md h-full w-full object-fill rounded-tl-md" src={item.image}/>
                                                        </CardContent>
                                                        <CardFooter className="flex w-full flex-col px-0 pb-[6px] gap-[8px]">
            
                                                            <div className="text-white flex w-full  justify-between px-[8px] ">
                                                                <div className="w-[50%]">
                                                                <h2 className="text-[26px] ">4000</h2>
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
            
                                                            {/* <motion.div className="w-full flex justify-center" whileTap={{scale:1.03}}>
                                                                <Button variant={Ghost} className="bg-cblue w-[90%] mx-auto pb-[6px]">
                                                                        Add to Cart!
                                                                </Button>
                                                            </motion.div> */}
                                                            
                                                        </CardFooter>
                                                </Card>
                                            </CarouselItem>)}
        </CarouselContent>
    )
}