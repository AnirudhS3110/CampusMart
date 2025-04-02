import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


 const useGetListings= ()=>
{
    const token = localStorage.getItem('Authtoken')
    const [listing,setListing] = useState([])

   
    
    useEffect(()=>{
        try{
            async function getListing()
            {
                const res = await axios.get('http://localhost:3000/marketplace/getListings',
                    {
                        headers:{
                            "token":token,
                            "Content-Type":"application/json"
                        }
                    }
                )
                if( res.data.success)
                {
                    setListing(res.data.listings);
                }
            }
            getListing()
        }catch(e)
        {
            console.log("Error while getting lists")
        }
    },[])
    return {listing};
    
}

export default function MarketPlace()
{
    const [search,setSearch] =useState("")
    const {listing} =  useGetListings();
    const[loading,setLoading] = useState(true)
    const userID = useSelector((state)=>state.authentication.userID)
    const nav = useNavigate();
    
    const [listings,setListings] = useState(null)
    console.log(listings)

    useEffect(()=>{
        if (listing) {
            setListings(listing);
            setLoading(false)
        }
        
        
    },[listing])

    useEffect(()=>{
        if(listing)
        {
            let newlistings = listing.filter((list)=>list.title.toLowerCase().includes(search.toLowerCase()) ||
            list.description.toLowerCase().includes(search.toLowerCase()) ||
            list.category.toLowerCase().includes(search.toLowerCase())) 
            
            setListings(newlistings)

        }




    },[search])

    async function createChat({first,second})
    {
        const token = localStorage.getItem('Authtoken');
        try{
            const res = await axios.post('http://localhost:3000/chats/createChat',
                {
                    first:first,
                    second:second
                },{
                    headers:{
                        "authorization":token,
                        "Content-Type":"application/json"
                    }
                }
            )

            if(res.data.success)
            {
                nav('/chat')
            }
        }catch(e){
            console.log("Error while creating chat")
        }

    }


    return(
        <section className="w-full min-h-[90vh] bg-[#05295e]  ">
            <div className="w-full h-[10vh] bg-[#062D67] flex flex-row justify-around items-center border-b-[1px] border-b-cyello sticky top-[10vh]">
                <div className=" min-w-[85%] max-w-[90%] sm:min-w-[400px] md:h-[40px] rounded-full">
                    <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="search by title, category , description.." className="h-full w-full px-[20px] py-[8px] rounded-full bg-white text-black md:px-[30px]"></input>
                </div>
            </div>

            <div className="w-full min-h-[80vh] md:px-[80px] pt-[30px] flex flex-row flex-wrap justify-start md:gap-[20px] items-center lg:">
                {!loading && listings.length>0 && listings.map((list)=><Card className={`bg-[#0b336e] md:gap-[30px] text-white py-[14px] max-h-[280px] min-w-[300px] max-w-[300px] border-0 ${loading ? "hidden" : "block"}`}>
                    <CardHeader >
                        <div className="w-full h-full flex flex-row justify-between">
                                <div>
                                    {list.seller? list.seller.userName.toUpperCase() : "Seller"}
                                </div>
                                
                            <motion.div whileTap={{scale:.95}} className="">
                                <Button onClick={()=>{createChat({first:userID,second:list.seller ? list.seller._id : null})}} className={`bg-[#FFBB0F] `}>Chat!</Button>
                            </motion.div>

                        </div>
                        </CardHeader>
                    <CardContent className=" md:h-[200px] md:max-w-[300px]">
                    <img src={list.image}  className="w-full h-full object-contain"/>
                        
                    </CardContent>
                    <CardFooter className={`flex flex-col`}>
                        
                    </CardFooter>

                </Card>)}

                {loading && <div className="text-cyello text-center my-auto mx-auto font-semibold md:text-[24px]"> Loading Marketplace...</div>}
                

            </div>

        </section>
    )
}