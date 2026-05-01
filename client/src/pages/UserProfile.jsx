import ProfileCard from "@/components/profile/ProfileCard"
import SideBarLayout from "../components/layout/SideBar"
import Calender from "@/components/ui/Calender"

const UserProfile = () => {
    return (
        <div>
            <SideBarLayout>
                <div className="w-full flex flex-col max-h-screen h-screen  px-25 pt-10 pb-25  gap-20 overflow-auto">
                    <ProfileCard />
                    <div className="flex justify-start items-center">
                        <Calender className="h-120 w-auto " />
                    </div>
                </div>
            </SideBarLayout>
        </div>
    )
}

export default UserProfile
