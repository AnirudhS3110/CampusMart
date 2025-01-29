import { Link } from "react-router-dom";

export default function EndSection()
{
    return(
        <section className="bg-[#062D67]">
            <div className="width-full grid grid-cols-9 gap-[15px] py-[20px]">
                <div></div>
                <div className="">
                    <img src="/src/images/CampusMart.png" className="w-full"/>
                </div>
                <div>

                </div>

                <div className="text-white font-poppins  text-[18px]">
                    <p className=" mb-[20px]">Quick Links</p>

                    <div className="flex flex-col gap-[8px] justify-start text-[14px] text-white font-light ">
                        <Link className="transition-colors duration-200 hover:text-cyello">About us</Link>
                        <Link className="transition-colors duration-200 hover:text-cyello">How It Works</Link>
                        <Link className="transition-colors duration-200 hover:text-cyello">FAQs</Link>
                        <Link className="transition-colors duration-200 hover:text-cyello">Contact Us</Link>
                    </div>

                </div>
                
                <div className="text-white font-poppins font-semibold text-[22px]">
                    

                </div>

                <div className="text-white font-poppins  text-[18px]">
                    <p className=" mb-[20px]">Legal</p>

                    <div className="flex flex-col gap-[8px] justify-start text-[14px] text-white font-light ">
                        <Link className="transition-colors duration-200 hover:text-cyello">Terms of Service</Link>
                        <Link className="transition-colors duration-200 hover:text-cyello">Privacy Policy</Link>
                        <Link className="transition-colors duration-200 hover:text-cyello">Cookie policy</Link>
                    </div>

                </div>
                <div className="text-white font-poppins font-semibold text-[22px]">
                    

                </div>
                <div className="text-white font-poppins  text-[18px]">
                    Connect with us

                </div>\
                <div></div>
            </div>

        </section>
    )
}