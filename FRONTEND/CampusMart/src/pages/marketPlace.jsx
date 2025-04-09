import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import MarketPlaceCard from "@/components/MarketPlace/ListingCard";
import useGetmarketPlace from "@/hooks/useGetmarketPlace";
import Filter from "@/components/MarketPlace/filter";


export default function MarketPlace()
{
    const [search,setSearch] =useState("")
    const {listing,liked,cartlist} =  useGetmarketPlace();
    const[loading,setLoading] = useState(true)
    const token = localStorage.getItem('Authtoken')
    
    const Liked = liked.map((list)=>list._id);
    const [listings,setListings] = useState(null);
    const [pageNumber,setPageNumber] = useState(1);
    const cartList = cartlist.map((list)=>list._id);
    const [filter,setFilter] = useState({
        minPrice:"",
        maxPrice:"",
        category:""
    })


    useEffect(()=>{
        const min = Number(filter.minPrice);
        const max = Number(filter.maxPrice);
        console.log("min and max:",min, max)
        if(!loading)
        {
            if(filter.category=='')
                {
                    console.log(listings.filter((list)=>list.price > min && list.price <max))
                    setListings((prevListings)=>prevListings.filter((list)=>Number(list.price) > min && Number(list.price) <max))
                }
            else
            {
                setListings((prevListings)=>prevListings.filter((list)=>list.price > min && list.category===filter.category && list.price <max))
            }
        }

    },[filter])

    
   
    useEffect(()=>{
        //Implementing Pagination
        async function getItems()
        {
            console.log(pageNumber)
            const res = await axios.post('http://localhost:3000/marketplace/getItems',
                {
                    pageNo:pageNumber,
                    limit:12
                },
                {
                    headers:{
                        "token":token,
                        "Content-Type":"application/json"
                    }

                }
            )
            if(res.data.success)
            {
                const newList = res.data.listings;
                setListings((prev)=>[...prev,...newList]);
            }
        }
        getItems();
    },[pageNumber])

    function showMore()
    {
        if(listings.length%12==0)
        {
            setPageNumber((prev)=>prev+1);
        }
    }

    useEffect(()=>{
        if (listing) {
            setListings(listing);
            setLoading(false)
        }
        
        
    },[listing])

    useEffect(()=>{
        if(!loading)
        {
            let newlistings = listings.filter((list)=>list.title.toLowerCase().includes(search.toLowerCase()) ||
            list.description.toLowerCase().includes(search.toLowerCase()) ||
            list.category.toLowerCase().includes(search.toLowerCase())) 
            
            setListings(newlistings)

        }
    },[search])
    

    
    return(
        <section className="w-full min-h-[100vh] bg-[#05295e]  ">
            <div className="w-full h-[20vh] bg-[#062D67] flex flex-row justify-around items-center border-b-[1px] border-b-cyello sticky top-[10vh] z-50">
                <div className=" min-w-[85%] max-w-[90%] sm:min-w-[600px] md:h-[40px] rounded-full border-white flex flex-col gap-[15px] justify-center">
                    <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="search by title, category , description.." className="h-full w-full px-[20px] py-[8px] rounded-full bg-white text-black md:px-[30px] focus:border-white"></input>
                    <Filter filter={filter} setFilter={setFilter}/>
                </div>
            </div>

            <div className="w-full min-h-[80vh] md:px-[80px] pt-[30px] flex flex-row justify-center md:justify-start overflow-auto">
                <div className=" h-full flex flex-row flex-wrap gap-[10px] justify-center md:justify-start md:gap-[20px]  ">

                    
                    {!loading && listings.length>0 && (listings.map((list)=><MarketPlaceCard list={list}  Liked={Liked} cartList={cartList}/>))}

                    {!loading && listings.length %12 ==0 ? <Button onClick={showMore} className={`w-[330px] mt-[20px] md:min-w-[80%] mx-auto rounded-full bg-[#0b336e] text-[20px] py-[15px] transition-all duration-300`}>Show More</Button> : null}

                    {loading && <div className="text-cyello text-center my-auto mx-auto font-semibold md:text-[24px]"> Loading Marketplace...</div>}
                </div>
            </div>

        </section>
    )
}


