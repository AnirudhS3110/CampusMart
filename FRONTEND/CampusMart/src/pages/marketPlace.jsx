import { Heart, Search } from "lucide-react";
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
            <div className="w-full h-[10vh] bg-[#062D67] flex flex-row justify-around items-center border-b-[1px] border-b-cyello sticky top-[10vh] z-50">
                <div className=" min-w-[85%] max-w-[90%] sm:min-w-[400px] md:h-[40px] rounded-full">
                    <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="search by title, category , description.." className="h-full w-full px-[20px] py-[8px] rounded-full bg-white text-black md:px-[30px]"></input>
                </div>
            </div>

            <div className="w-full min-h-[80vh] md:px-[80px] pt-[30px] flex flex-row justify-center items-center">
                <div className=" h-full flex flex-row flex-wrap gap-[10px] justify-start md:gap-[35px] items-center ">
                    {!loading && listings.length>0 && listings.map((list)=><Card className={`bg-[#0b336e] md:gap-[30px] text-white py-[14px] max-h-[400px] min-w-[300px] max-w-[300px] border-0 ${loading ? "hidden" : "block"}`}>
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
                            

                        <CardContent className=" md:h-[200px] md:max-w-[300px] px-0 overflow-hidden">
                            <div className="w-full h-full object-fill rounded-t-md relative">
                            <motion.img whileHover={{scale:1.03}} transition={{duration:0.2, ease: "easeInOut"}} src={list.image}  className="w-full h-full object-fill rounded-t-md"/>
                            <LikeButton listId={list._id} />
                            </div>
                        </CardContent>

                        <CardFooter className={`flex flex-col px-0 w-full gap-[8px] `}>

                        <div className="text-white flex w-full  justify-between px-[8px] ">
                                                    <div className="w-[50%]">
                                                    <h2 className="text-[26px] text-cyello ">{list.price}</h2>
                                                    </div>
                                                    <div className=" my-auto">
                                                        <h2 className="text-[20px] ">{list.createdAt.split("T")[0]}</h2>
                                                    </div>
                                                </div>

                                                <div className="text-white w-full max-h-[40px] px-[8px]">
                                                    <div className="text-[12px] w-full overflow-y-hidden scrollbar-hide">
                                                        {list.description}
                                                    </div>
                                                </div>
                                <motion.div whileTap={{scale:.95}} className="w-full">
                                    <Button  className={`bg-[#FFBB0F] w-full`}>Add to Cart!</Button>
                                </motion.div>
                            
                        </CardFooter>

                    </Card>)}
                    {loading && <div className="text-cyello text-center my-auto mx-auto font-semibold md:text-[24px]"> Loading Marketplace...</div>}
                </div>
            </div>

        </section>
    )
}

function LikeButton({listId})
{
    const userID = useSelector((state)=>state.authentication.userID);
    const token = localStorage.getItem('Authtoken');
    const [like,setLike] = useState(false);
    useEffect(()=>{
        if(like)
            {
                async function setLike()
                {
                    const res = await axios.post('http://localhost:3000/marketplace/setLike',
                        {
                            userId:userID,
                            listID:listId
                        },{
                            headers:{
                                'authorization':token,
                                'Content-Type':'application/json'
                            }
                        }
                    )
                    if(res.data.success)
                    {
                        console.alert("Added to your favorites")
                    }
                }
                setLike();
            }

    },[like])
    return <button onClick={()=>{setLike(!like)}} className="absolute top-2 right-2  p-1 rounded-full shadow-md"> <Heart color={like? "none":"black"} fill={like ? "red": "none"} /> </button>
    
}