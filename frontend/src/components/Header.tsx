import React from "react";
import Logo from "../assets/images/logo.png";
import UserDropDown from "./UserDropDown";
import SearchIcon from "./icons/SearchIcon";
import { Link } from "react-router-dom";

interface HeaderProps {
    isLogin: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLogin }) => {
    return (
        <>
            <div className="w-full h-[100px] max-w-full bg-background shadow-sm">
                <div className="w-full flex items-center py-[10px] px-4 tablet:px-[60px]">
                    <Link to="/">
                        <img src={Logo} alt="Logo" className="" />
                    </Link>
                    <div className="hidden relative ml-[120px] tablet:block tablet:w-[1000px]">
                        <input
                            type="text"
                            placeholder="Search for anything"
                            className="rounded-full py-4 px-10 w-[70%] border-[1px] border-black"
                        />
                        <SearchIcon />
                    </div>
                    {isLogin ? (
                        <>
                            <div className="ml-auto flex shrink-0 items-center">
                                <span className="hidden tablet:block min-w-fit mr-5">All Courses</span>
                                <span className="hidden tablet:block min-w-fit mr-5">Enroll Course</span>
                                <span className="hidden tablet:block min-w-fit mr-5">My Courses</span>
                                <div className="w-[60px] h-[60px] rounded-full bg-slate-600 flex items-center justify-center relative">
                                    <span>A</span>
                                    {<UserDropDown />}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="ml-auto flex sh items-center">
                            <span className="hidden tablet:block min-w-fit mr-4">All Courses</span>
                            <Link to="/login">
                                <button className="py-2 px-4 mr-1 bg-green-700 rounded-lg text-white">Login</button>
                            </Link>

                            <Link to="/sign-up">
                                <button className="py-[7px] px-4 border-[1px] border-black rounded-lg">Signup</button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Header;
