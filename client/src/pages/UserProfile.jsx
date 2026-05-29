import ProfileCard from "@/components/profile/ProfileCard";
import SideBarLayout from "../components/layout/SideBar";
import Calender from "@/components/ui/Calender";
import { useEffect } from "react";

const UserProfile = () => {

    return (
        <div className=" md:overflow-x-hidden no-scrollbar">
            <SideBarLayout>
                <div className="flex h-screen max-h-screen w-full flex-col gap-20 overflow-auto px-5 lg:px-25 pt-10 pb-25">
                    <ProfileCard />
                    <div className="flex items-center justify-center lg:justify-start">
                        <Calender />
                    </div>
                </div>
            </SideBarLayout>
        </div>
    );
};

export default UserProfile;
