import React from "react";
import { motion } from "framer-motion";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { SelectGroup } from "@radix-ui/react-select";
import { Button } from "../ui/button";
  


export default function Filter({filter,setFilter})
{
    return <div className="sm:min-w-[500px] md:flex md:flex-row md:justify-between md:items-center bg-cblue rounded-[10px] py-[6px] md:px-[15px]">
        <Select value={filter.category} onChange={()=>{ setFilter((filter)=>({...filter,category:e.target.value})) }} >
            <SelectTrigger className="bg-white text-cblue border-white rounded-[10px] appearance-none ">
                <SelectValue placeholder="Category" className="text-cblue"></SelectValue>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black">
                    ▼
                </span>
            </SelectTrigger>
            <SelectContent className={`text-cblue`}>
                <SelectItem value="Mobile" className="py-[5px] hover:bg-gray-700">
                    Mobile
                </SelectItem>
                <SelectItem value="Electronics" className="py-[5px]">
                    Electronics
                </SelectItem>
                <SelectItem value="Dresses" className="py-[5px]">
                    Dresses
                </SelectItem>
                <SelectItem value="Arts" className="py-[5px]">
                    Arts
                </SelectItem>
            </SelectContent>
        </Select> 
        <input value={filter.minPrice} onChange={(e)=>setFilter((filter)=>({...filter,minPrice:e.target.value}))} type="text" placeholder="MinPrice" className="max-w-[20%] rounded-[10px] md:px-[10px] md:py-[4px] text-black bg-white " ></input>
        <input value={filter.maxPrice} onChange={(e)=>setFilter((filter)=>({...filter,maxPrice:e.target.value}))} type="text" placeholder="MaxPrice" className="max-w-[20%] rounded-[10px] md:px-[10px] md:py-[4px] text-black bg-white" ></input>
        <Select>
        <SelectTrigger className="bg-white text-cblue border-white rounded-[10px] ">
                <SelectValue className="text-cblue" placeholder="Sort by"> </SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Newest">
                Newest
                </SelectItem>
                <SelectItem value="Oldest">
                    Oldest
                </SelectItem>
            </SelectContent>
        </Select>
        <motion.div whileTap={{scale:.95}}>
        <Button className={`bg-cyello`} onClick={()=>setFilter(({minPrice:"",maxPrice:"",category:""}))}>Clear all</Button>
        </motion.div>

    </div>
    
}