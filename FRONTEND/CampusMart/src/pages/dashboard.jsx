import React from "react";
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
  import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
 

export default function Dashboard()
{
    const nav = useNavigate();
    const userName = useSelector((state)=>state.authentication.userName)
    return(
        <section className="bg-cblue flex flex-col items-center w-[100vw] h-[100vh] px-[30px]   lg:px-[120px] overflow-y-auto pt-[20px] ">
            
            <hr className="bg-white"></hr>
            <div className="w-full h-[90%]">
                <div className="text-white font-semibold mb-[20px] lg:text-[30px] ">
                    <h3>Welcome back <span className="text-cyello">{userName}</span>!</h3>
                </div >
                    
                <div className="text-white lg:text-[30px] mb-[15px]">
                    <h2>YOUR PURCHASES:</h2>
                    <div className="w-full">
                            <Carousel className="bg-cblue">
                                <CarouselContent >
                                    <CarouselItem className=" md:basis-1/2 lg:basis-1/4">
                                        <Card  className="bg-cyello" >
                                            <CardHeader className="mx-auto">
                                                <h3>Add new Item</h3>

                                            </CardHeader>
                                            <CardContent  className=" mx-auto" >
                                                <motion.button whileTap={{scale:1.05}} onClick={()=>{nav('/marketPlace')}} className="  rounded-[50%]" >
                                                    <CirclePlus className="w-full h-auto lg:w-20 lg:h-20" color="white">
                                                        Add
                                                    </CirclePlus>
                                                </motion.button>
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                                        <Card className="bg-cyello text-white" >
                                            <CardContent >
                                                <p>HElloo</p>


                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                                        <Card className="bg-cyello text-white" >
                                            <CardHeader className="flex flex-row justify-between px-[16px]">
                                                <div className="text-[18px]">
                                                   Seller 
                                                </div>
                                                <div>

                                                </div>
                                            </CardHeader>
                                            <CardContent  className="p-0">
                                                <img className="rounded-tr-sm rounded-tl-sm w-full" src="https://stimg.cardekho.com/images/carexteriorimages/930x620/Maruti/Dzire/11387/1731318279714/front-left-side-47.jpg?impolicy=resize&imwidth=420"/>


                                            </CardContent>
                                            <CardFooter></CardFooter>
                                        </Card>
                                    </CarouselItem>
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                                        <Card className="bg-cyello" >
                                            <CardContent >
                                                <p>HElloo</p>


                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                                        <Card className="bg-cyello" >
                                            <CardContent >
                                                <p>HElloo</p>


                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                                                       
                                </CarouselContent>
                            </Carousel>
                    </div>

                </div>

                <div className="text-white lg:text-[30px] mb-[15px]">
                    <h2>YOUR FAVOURITES:</h2>
                    <div className="w-full">
                            <Carousel className="bg-cblue">
                                <CarouselContent >
                                    <CarouselItem className=" md:basis-1/2 lg:basis-1/4">
                                            <Card  className="bg-cyello" >
                                                <CardHeader className="mx-auto">
                                                    <h3>Add new Item</h3>

                                                </CardHeader>
                                                <CardContent  className=" mx-auto" >
                                                    <motion.button whileTap={{scale:1.05}} onClick={()=>{nav('/marketPlace')}} className="  rounded-[50%]" >
                                                        <CirclePlus className="w-full h-auto lg:w-20 lg:h-20" color="white">
                                                            Add
                                                        </CirclePlus>
                                                    </motion.button>
                                                </CardContent>
                                            </Card>
                                    </CarouselItem>
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                                    <Card className="bg-cyello text-white" >
                                            <CardHeader className="flex flex-row justify-between px-[16px]">
                                                <div className="text-[18px]">
                                                   Seller 
                                                </div>
                                                <motion.div whileTap={{scale:1.05}} className=" flex">
                                                    <Button variant={Ghost} className="bg-cblue hover:bg-blue-600">
                                                        Chat

                                                    </Button>

                                                </motion.div>
                                            </CardHeader>
                                            <CardContent  className="p-0 m-0">
                                                <img className="rounded-tr-sm rounded-tl-sm w-full" src="https://stimg.cardekho.com/images/carexteriorimages/930x620/Maruti/Dzire/11387/1731318279714/front-left-side-47.jpg?impolicy=resize&imwidth=420"/>


                                            </CardContent>
                                            <CardFooter className="flex flex-row justify-between px-[16px] text-[18px] pt-0">
                                                <div>
                                                    <h2>5000</h2>
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    </CarouselItem>
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                        <Card className="bg-cyello" >
                                            <CardContent >
                                                <p>HElloo</p>


                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                                                       
                                </CarouselContent>
                            </Carousel>
                    </div>

                </div>

                
                <div className="text-white lg:text-[30px] mb-[15px]">
                    <h2>Your Listings:</h2>
                    <div className="w-full">
                            <Carousel className="bg-cblue">
                                <CarouselContent >
                                    <CarouselItem className=" md:basis-1/2 lg:basis-1/4">
                                                <Card  className="bg-cyello" >
                                                    <CardHeader className="mx-auto">
                                                        <h3>Add new Item</h3>

                                                    </CardHeader>
                                                    <CardContent  className=" mx-auto" >
                                                        <motion.button whileTap={{scale:1.05}} onClick={()=>{nav('/addListing')}} className="  rounded-[50%]" >
                                                            <CirclePlus className="w-full h-auto lg:w-20 lg:h-20" color="white">
                                                                Add
                                                            </CirclePlus>
                                                        </motion.button>
                                                    </CardContent>
                                                </Card>
                                    </CarouselItem>
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                        <Card className="bg-cyello text-white" >
                                            <CardContent >
                                                <p>HElloo</p>


                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                        <Card className="bg-cyello" >
                                            <CardContent >
                                                <p>HElloo</p>


                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                                                       
                                </CarouselContent>
                            </Carousel>
                    </div>

                </div>

            </div >
        </section>
    )
}