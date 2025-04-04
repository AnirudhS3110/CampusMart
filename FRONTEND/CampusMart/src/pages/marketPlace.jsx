import { Heart, Search ,ShoppingCart} from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import store from "@/redux/store";


 const useGetListings= ()=>
{
    const token = localStorage.getItem('Authtoken')
    const userID = store.getState().authentication.userID;
    const [listing,setListing] = useState([])
    const [liked,setLiked] = useState([])


   
    
    useEffect(()=>{
        try{
            async function getListing()
            {
                const res = await axios.post('http://localhost:3000/marketplace/getMarketPlace',
                    {
                        userID: userID
                    },
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
                    setLiked(res.data.likedList)
                }
            }
            getListing()
        }catch(e)
        {
            console.log("Error while getting lists")
        }
    },[])
    return {listing,liked};
    
}

export default function MarketPlace()
{
    const [search,setSearch] =useState("")
    const {listing,liked} =  useGetListings();
    const[loading,setLoading] = useState(true)
    const userID = useSelector((state)=>state.authentication.userID)
    const nav = useNavigate();
    const Liked = liked.map((list)=>list._id);
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
        <section className="w-full min-h-[100vh] bg-[#05295e]  ">
            <div className="w-full h-[10vh] bg-[#062D67] flex flex-row justify-around items-center border-b-[1px] border-b-cyello sticky top-[10vh] z-50">
                <div className=" min-w-[85%] max-w-[90%] sm:min-w-[400px] md:h-[40px] rounded-full">
                    <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="search by title, category , description.." className="h-full w-full px-[20px] py-[8px] rounded-full bg-white text-black md:px-[30px]"></input>
                </div>
            </div>

            <div className="w-full min-h-[80vh] md:px-[80px] pt-[30px] flex flex-row justify-center md:justify-start">
                <div className=" h-full flex flex-row flex-wrap gap-[10px] justify-center md:justify-start md:gap-[20px]  ">

                    
                    {!loading && listings.length>0 && listings.map((list)=><Card className="max-w-[325px] max-h-[450px] py-0 bg-[#0b336e] border-[#05295e] box-border">

                    <CardContent className={`min-h-[300px] px-0 bg-[#05295e] pt-0 my-0 overflow-hidden rounded-[20px]`} >
                        <div className="min-w-[300px] w-[310px] max-w-[325px] h-[302px]  min-h-[300px] max-h-[306px] relative rounded-[20px] box-border">
                            <motion.img whileHover={{scale:1.03}} transition={{duration:0.2, ease: "easeInOut"}}  className="w-full h-full rounded-[20px]  object-cover" src={list.image} />
                            <LikeButton listId={list._id} Liked={Liked} />
                            <motion.div className="absolute top-2 left-1">
                                <Button onClick={()=>{createChat({first:userID,second:list.seller ? list.seller._id : null})}} variant="ghost" className={`bg-cyello rounded-full text-white md:text-[16px]`} >Chat with Seller!</Button>
                            </motion.div>
                        </div>
                    </CardContent>

                    <CardFooter className={`px-[4px] pt-0 my-0 py-0 `}>
                        <div className="min-w-[300px] w-[302px] py-0 max-w-[325px] h-[302px] box-border px-[8px]  min-h-[300px] max-h-[306px] flex flex-col gap-[8px]">

                            <div className="w-full flex py-0 justify-between items-center">
                                <h2 className="text-cyello md:text-[24px] truncate">{list.title}</h2>
                                <motion.div >
                                    <Button variant="ghost" className={`bg-white rounded-full text-[#05295e] md:text-[16px]`}>
                                        <ShoppingCart/>
                                        AddtoCart    
                                    </Button>
                                </motion.div>
                            </div>

                            <div className="w-full text-gray-400 text-[14px] text-ellipsis line-clamp-2">
                            {list.description}
                            </div>
                            
                            <div className="w-full flex justify-items-start text-[15px] md:text-[18px] text-cyello justify-between">
                                <h3>{list.price}</h3>
                                <h3>{list.seller? list.seller.userName.toUpperCase() : "Seller"}</h3>
                            </div>

                        </div>
                    </CardFooter>
                    </Card>)}
                    {loading && <div className="text-cyello text-center my-auto mx-auto font-semibold md:text-[24px]"> Loading Marketplace...</div>}
                </div>
            </div>

        </section>
    )
}

export function LikeButton({listId,Liked})
{

    const userID = useSelector((state)=>state.authentication.userID);
    const token = localStorage.getItem('Authtoken');
    const [like,setLike] = useState(false);
    const [dummy,setDummy] = useState(0) 
    console.log("dummy",dummy)

    useEffect(()=>{
        if(Liked.includes(listId))
            {
                setLike(true);
                
            }
    },[]);

    
    useEffect(()=>{
        if(like)
            {
                async function setLike()
                {
                    try{
                        const res = await axios.post('http://localhost:3000/marketplace/setLike',
                            {
                                userID:userID,
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
                            alert("Added to your favorites")
                        }
                    }catch(e)
                    {
                        console.log("Error");
                    }
                }
                setLike();
             }
            if(dummy%2==0 && dummy){
                async function removeLike()
                {
                    try{
                        const res = await axios.post('http://localhost:3000/marketplace/removeLike',
                            {
                                userID:userID,
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
                            alert("Removed from your Favorites")
                        }
                    }catch(e)
                    {
                        console.log("Error");
                    }
                }
                removeLike();

                
            }

    },[dummy])
    return <button onClick={()=>{setLike(!like);setDummy(dummy=>dummy+1);}} className="absolute top-2 right-2  p-1 rounded-full shadow-md"> <Heart color={like? "none":"black"} fill={like ? "red": "none"} /> </button>
    
}