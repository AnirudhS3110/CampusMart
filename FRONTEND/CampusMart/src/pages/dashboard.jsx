import React from "react";
import {CirclePlus} from 'lucide-react'
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
 

export default function Dashboard()
{
    const nav = useNavigate();
    return(
        <section className="bg-cblue flex flex-col items-center w-[100vw] h-[100vh] px-[30px]   lg:px-[120px] overflow-y-auto ">
            <div className="w-full flex flex-row justify-between h-[15%]">
                <div className="my-auto max-w-[25%] lg:max-w-[10%]">
                    <img src="src/images/CampusMart.png" className="lg:w-[100%] lg:h-auto mx-auto"/>
                </div>
                <div className="text-cyello my-auto lg:text-[32px] lg:font-semibold mx-auto">
                        Welcome Username
                </div>
                <button className="w-[35px] h-[35px] border-[1px] border-cyello rounded-[50%] lg:w-[50px] lg:h-[50px] my-auto">
                    <img className="w-full h-full border-1 rounded-[50%] "/>
                </button>
                
            </div>
            <hr className="bg-white"></hr>
            <div className="w-full h-[90%]">
                <div className="text-white font-semibold mb-[20px] lg:text-[30px] ">
                    <h3>DASHBOARD</h3>
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
                                                        <motion.button whileTap={{scale:1.05}} onClick={()=>{nav('/marketPlace')}} className="  rounded-[50%]" >
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