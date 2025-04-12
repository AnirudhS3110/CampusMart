import { Heart, ListEnd, ShoppingCart, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import { useNavigate } from "react-router-dom";


export default function ProductDetailPopup({ list, isOpen, onClose, cartList,setCartList, Liked }) {
    const nav = useNavigate();
  
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
  
    
    // Re-use the existing chat function
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
  
    // Re-use AddToCartButton component
    const AddToCartButton = ({listingID, cartList}) => {
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
  
      return (
        <Button 
          onClick={addToCart} 
          className="bg-[#1565c0] hover:bg-blue-700 text-white w-full max-w-[50%] py-6"
        >
          <div className="flex justify-center gap-2 items-center">
            <ShoppingCart />
            Add to Cart
          </div>  
        </Button>
      );
    };
  
    // Animation variants
    const overlayVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    };
    
    const popupVariants = {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 25, stiffness: 500 } }
    };
  
    // Get the current user ID for chat functionality
    const userID = store.getState().authentication.userID;
  
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center  justify-center bg-[#05295e] bg-opacity-20"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            onClick={onClose}
          >
            <motion.div 
              className="relative bg-[#0b336e] rounded-lg w-[90%] max-w-4xl h-auto max-h-[500px] min-h-[360px] overflow-hidden flex flex-col md:flex-row"
              variants={popupVariants}
              onClick={(e) => e.stopPropagation()}
              >
              {/* Close button - updated color for better visibility against dark background */}
              <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 p-1 rounded-full bg-gray-100 hover:bg-gray-200 z-10"
              >
                  <X size={20} />
              </button>
              
              {/* Image section remains the same */}
              <div className="w-full md:w-2/5 h-[300px] md:h-auto relative -ml-4 md:rounded-r-lg overflow-hidden">
                  <motion.img 
                  src={list.image} 
                  alt={list.title}
                  className="w-full h-full object-cover object-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  />
                  
                  {/* Like button on image */}
                  <div className="absolute top-4 right-4">
                  <LikeButton listId={list._id} Liked={Liked} />
                  </div>
              </div>
              
              {/* Product details - updated text colors for better readability on dark background */}
              <div className="w-full md:w-3/5 p-6 flex flex-col">
                  <h2 className="text-2xl font-bold text-white">{list.title}</h2>
                  <p className="text-xl text-cyello font-semibold mt-2">₹{list.price}</p>
                  <p className="text-sm text-gray-300 mt-1">
                  Seller: {list.seller ? list.seller.userName.toUpperCase() : "Unknown"}
                  </p>
                  
                  <div className="mt-4">
                  <h3 className="font-semibold text-white">Description</h3>
                  <div className="h-px bg-[#1565c0] w-full my-2"></div>
                  <p className="text-gray-300 mt-2 overflow-y-auto max-h-[200px]">
                      {list.description}
                  </p>
                  </div>
                  
                  {/* Category tag if available */}
                  {list.category && (
                  <div className="mt-4">
                      <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                      {list.category}
                      </span>
                  </div>
                  )}
                  
                  {/* Action buttons */}
                  <div className="mt-auto pt-4 flex flex-col md:flex-row md:justify-center sm:flex-row gap-3">
                  <Button 
                      onClick={() => createChat({first: userID, second: list.seller ? list.seller._id : null})}
                      className="bg-[#ffc107] hover:bg-amber-500 text-black w-full py-6 max-w-[50%]"
                  >
                      Chat with Seller
                  </Button>
                  
                  <AddToCartButton listingID={list._id} cartList={cartList} />
                  </div>
              </div>
              </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
  
  