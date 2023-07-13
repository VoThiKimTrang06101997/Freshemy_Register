import React from "react";
import UserIcon from "./icons/UserIcon";
import ChangePasswordIcon from "./icons/Edit_light";
import MyEnrollCourseIcon from "./icons/MyEnrollCourse";
import MyCourseIcon from "./icons/MyCourseIcon";
import LogoutIcon from "./icons/LogoutIcon";

const UserDropDown: React.FC = () => {
    return (
        <>
            <div className="hidden w-[342px] bg-white shadow-lg absolute top-[80px] right-4">
                <div className="p-4 flex flex-col justify-start items-start">
                    <div className="flex justify-center items-center mb-[10px]">
                        <UserIcon />
                        <span className="ml-3">Profile Setting</span>
                    </div>
                    <div className="flex justify-center items-center my-[10px]">
                        <ChangePasswordIcon />
                        <span className="ml-3">Change Password</span>
                    </div>
                    <div className="flex justify-center items-center my-[10px]">
                        <MyEnrollCourseIcon />
                        <span className="ml-3">My enroll courses</span>
                    </div>
                    <div className="flex justify-center items-center my-[10px]">
                        <MyCourseIcon />
                        <span className="ml-3">My courses</span>
                    </div>
                    <div className="flex justify-center items-center mt-[10px]">
                        <LogoutIcon />
                        <span className="text-error ml-3">Logout</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserDropDown;
