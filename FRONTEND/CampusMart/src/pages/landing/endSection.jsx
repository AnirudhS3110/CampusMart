import { Link } from "react-router-dom";
import { Linkedin, LinkedinIcon } from "lucide-react";

export default function Footer() {
    return (
        <section className="bg-[#062D67] py-[20px]">
            <div className="w-full grid grid-cols-4 lg:grid-cols-9 gap-[15px] flex-wrap">
                <div></div>
                <div>
                    <img 
                        src="https://res.cloudinary.com/dbvebbsbh/image/upload/v1742311986/campusMart/fxefdawiekznrmvhmz3y.png" 
                        className="w-full" 
                        alt="Campus Mart Logo"
                    />
                </div>
                <div></div>
                
                <div className="text-white font-poppins text-[18px]">
                    <p className="mb-[20px]">Quick Links</p>
                    <div className="flex flex-col gap-[8px] text-[14px] font-light">
                        <Link href="#" className="transition-colors duration-200 hover:text-cyello">About us</Link>
                        <Link href="#" className="transition-colors duration-200 hover:text-cyello">How It Works</Link>
                        <Link href="#" className="transition-colors duration-200 hover:text-cyello">FAQs</Link>
                        <Link href="#" className="transition-colors duration-200 hover:text-cyello">Contact Us</Link>
                    </div>
                </div>
                
                <div className="text-white font-poppins font-semibold text-[22px]"></div>
                
                <div className="text-white font-poppins text-[18px]">
                    <p className="mb-[20px]">Legal</p>
                    <div className="flex flex-col gap-[8px] text-[14px] font-light">
                        <Link href="#" className="transition-colors duration-200 hover:text-cyello">Terms of Service</Link>
                        <Link href="#" className="transition-colors duration-200 hover:text-cyello">Privacy Policy</Link>
                        <Link href="#" className="transition-colors duration-200 hover:text-cyello">Cookie policy</Link>
                    </div>
                </div>
                
                <div className="text-white font-poppins font-semibold text-[22px]"></div>
                
                <div className="text-white font-poppins text-[18px]">
                    <p className="mb-[20px]">Connect with us</p>
                    <div  className="flex flex-col gap-[8px] text-[14px] font-light">
                  <Link href="#" className="transition-colors duration-200 hover:text-cyello">
                    <Linkedin color="white" />
                    </Link>
                </div>
                </div>
                
            </div>
        </section>
    );
}
