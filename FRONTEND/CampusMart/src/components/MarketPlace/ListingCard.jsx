import { Heart, ListEnd, ShoppingCart, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import { useNavigate } from "react-router-dom";
import ProductDetailPopup from "./popup";

// New Product Detail Popup Component
// Update the MarketPlaceCard component to include popup functionality
export default function MarketPlaceCard({list, Liked, cartList,setCartList}) {
  const nav = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  async function createChat({first, second}) {
    const token = localStorage.getItem('Authtoken');
    try {
      const res = await axios.post('http://localhost:3000/chats/createChat',
        {
          first: first,
          second: second
        }, {
          headers: {
            "authorization": token,
            "Content-Type": "application/json"
          }
        }
      );

      if(res.data.success) {
        nav('/chat');
      }
    } catch(e) {
      console.log("Error while creating chat");
    }
  }

  // Keep your original LikeButton component
  function LikeButton({listId, Liked}) {
    const userID = useSelector((state) => state.authentication.userID);
    const token = localStorage.getItem('Authtoken');
    const [like, setLike] = useState(false);
    const [dummy, setDummy] = useState(0);

    useEffect(() => {
      if(Liked.includes(listId)) {
        setLike(true);
      }
    }, []);

    useEffect(() => {
      if(like) {
        async function setlike() {
          try {
            const res = await axios.post('http://localhost:3000/marketplace/setLike',
              {
                userID: userID,
                listID: listId
              }, {
                headers: {
                  'authorization': token,
                  'Content-Type': 'application/json'
                }
              }
            );
            if(res.data.success) {
              //alert("Added to your favorites")
            }
          } catch(e) {
            console.log("Error");
          }
        }
        setlike();
      }
      
      if(dummy % 2 == 0 && dummy) {
        async function removeLike() {
          try {
            const res = await axios.post('http://localhost:3000/marketplace/removeLike',
              {
                userID: userID,
                listID: listId
              }, {
                headers: {
                  'authorization': token,
                  'Content-Type': 'application/json'
                }
              }
            );
            if(res.data.success) {
              alert("Removed from your Favorites");
            }
          } catch(e) {
            console.log("Error");
          }
        }
        removeLike();
      }
    }, [dummy]);
    
    return (
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setLike(!like);
          setDummy(dummy => dummy + 1);
        }} 
        className="absolute top-2 right-2 p-1 rounded-full shadow-md"
      >
        <Heart color={like ? "none" : "black"} fill={like ? "red" : "none"} />
      </button>
    );
  }

  // Keep original AddToCartButton
  function AddToCartButton({listingID, cartList}) {
    const userID = store.getState().authentication.userID;
    const token = localStorage.getItem('Authtoken');
    const [added, setAdded] = useState(false);
    
    useEffect(() => {
      if(cartList.includes(listingID)) {
        setAdded(true);
      }
    }, []);

    async function addToCart() {
      try {
        const res = await axios.post('http://localhost:3000/marketplace/addtocart', {
          userID: userID,
          listingID: listingID
        }, {
          headers: {
            authorization: token,
            "Content-Type": "application/json"
          }
        });
        
        if(res.data.success) {
          setAdded(true);
          alert("Added to cart!");
        }
      } catch(e) {
        console.log("Error adding to cart");
      }
    }

    async function removeFromCart() {
      try {
        const res = await axios.post('http://localhost:3000/marketplace/removefromcart', {
          userID: userID,
          listingID: listingID
        }, {
          headers: {
            authorization: token,
            "Content-Type": "application/json"
          }
        });
        
        if(res.data.success) {
          setAdded(false);
          alert("Removed from your cart");
        }
      } catch(e) {
        console.log("Error removing from cart");
      }
    }

    return (
      <motion.div>
        {added && (
          <motion.div>
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                removeFromCart();
              }} 
              className="bg-white rounded-full text-[#05295e] md:text-[16px]"
            >
              DelFromCart
            </Button>
          </motion.div>
        )}
        
        {!added && (
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              addToCart();
            }} 
            variant="ghost" 
            className="bg-white rounded-full text-[#05295e] md:text-[16px]"
          >
            <div className="flex justify-center gap-[6px] items-center">
              <ShoppingCart />
              AddtoCart
            </div>  
          </Button>
        )}
      </motion.div>
    );
  }

  function Image({image}) {
    const [loading, setLoading] = useState(true);
    
    return (
      <div className="w-full h-full relative">
        {loading && (
          <h2 className="text-center absolute inset-0 flex justify-center items-center text-cyello">
            ImageLoading...
          </h2>
        )}
        <motion.img 
          onLoad={() => {setLoading(false)}} 
          whileHover={{scale: 1.03}} 
          transition={{duration: 0.2, ease: "easeInOut"}}
          className={`w-full h-full rounded-[20px] object-cover ${loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}
          src={image} 
        />
      </div>
    );
  }

  function ChatWithSeller({createChat, seller}) {
    const userID = store.getState().authentication.userID;
    
    return (
      <motion.div className="absolute top-2 left-1">
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            createChat({first: userID, second: seller ? seller._id : null});
          }} 
          variant="ghost" 
          className="bg-cyello rounded-full text-white md:text-[16px]"
        >
          Chat with Seller!
        </Button>
      </motion.div>
    );
  }

  return (
    <>
      <Card 
        className="max-w-[325px] max-h-[450px] py-0 bg-[#0b336e] border-[#05295e] box-border lg:mb-[15px] cursor-pointer"
        onClick={() => setIsPopupOpen(true)}
      >
        <CardContent className="min-h-[300px] px-0 bg-[#05295e] pt-0 my-0 overflow-hidden rounded-[20px]">
          <div className="min-w-[300px] w-[310px] max-w-[325px] h-[302px] min-h-[300px] max-h-[306px] relative rounded-[20px] box-border">
            <Image image={list.image} />
            <LikeButton listId={list._id} Liked={Liked} />
            <ChatWithSeller createChat={createChat} seller={list.seller} />
            <PostedOn date={list.createdAt}/>
          </div>
        </CardContent>

        <CardFooter className="px-[4px] pt-0 my-0 py-0">
          <div className="min-w-[300px] w-[302px] py-0 max-w-[325px] h-[302px] box-border px-[8px] min-h-[300px] max-h-[306px] flex flex-col gap-[8px]">
            <div className="w-full flex py-0 justify-between items-center">
              <h2 className="text-cyello md:text-[24px] truncate">{list.title}</h2>
              <AddToCartButton listingID={list._id} cartList={cartList} />
            </div>

            <div className="w-full text-gray-400 text-[14px] text-ellipsis line-clamp-2">
              {list.description}
            </div>
            
            <div className="w-full flex justify-items-start text-[15px] md:text-[18px] text-cyello justify-between">
              <h3>₹{list.price}</h3>
              <h3>{list.seller ? list.seller.userName.toUpperCase() : "Seller"}</h3>
            </div>
          </div>
        </CardFooter>
      </Card>

      {/* The new product detail popup */}
      <ProductDetailPopup 
        list={list}
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        cartList={cartList}
        setCartList={setCartList}
        Liked={Liked}
      />
    </>
  );
}

function PostedOn({date})
{
  const parsedDate = new Date(date);
  const currentDate = new Date();

  const interval = currentDate - parsedDate;
  const days = Math.floor(interval/(1000 * 60 * 60 * 24));

  return <div className="max-w-[100px] h-auto bg-cyello hover:scale-105 transition-all duration-300 ease-in-out text-white rounded-[20px] absolute bottom-[10px] right-[8px] flex justify-center items-center py-[4px] px-[6px]">
    {days == 0  && <h3 className="text-[14px]">{`Today`}</h3>}
    {days == 1  && <h3 className="text-[14px]">{`Yesterday`}</h3>}
    {  days > 1 && <h3 className="text-[14px]">{`${days} days ago`}</h3>}
  </div>


}