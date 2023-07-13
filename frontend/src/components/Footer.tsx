import React from "react";
import Logo from "../assets/images/logo.png";

const Footer: React.FC = () => {
    return (
        <>
            <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-background">
                <div className="w-full flex items-center justify-between py-[10px] px-4 tablet:px-[60px]">
                    <div className="flex items-center justify-center">
                        <img src={Logo} alt="Logo" className="" />
                        <h3 className="">Freshemy</h3>
                    </div>
                    <span className="">Copyright @2023</span>
                </div>
            </div>
        </>
    );
};

export default Footer;
