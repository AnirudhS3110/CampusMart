import { useEffect, useState }  from "react";
import axios from "axios";
import store from "@/redux/store";

const useGetmarketPlace= ()=>
    {
        const token = localStorage.getItem('Authtoken')
        const userID = store.getState().authentication.userID;
        const [listing,setListing] = useState([])
        const [liked,setLiked] = useState([])
        const [cartlist,setCartList] =useState([]);
        
        useEffect(()=>{
            try{
                async function getListing()
                {
                    const res = await axios.post('http://localhost:3000/marketplace/getMarketPlace',
                        {
                            userID: userID,
                            limit:12
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
                        setCartList(res.data.cartList);
                    }
                }
                getListing()
            }catch(e)
            {
                console.log("Error while getting lists")
            }
        },[])
        return {listing,liked,cartlist};
        
    }

export default useGetmarketPlace;