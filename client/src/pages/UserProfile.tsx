import ProfileCard from "@/components/profile/ProfileCard"
import SideBarLayout from "../components/layout/SideBar"
import Calender from "@/components/ui/Calender"

const UserProfile = () => {
    return (
        <div className="no-scrollbar h-dvh md:overflow-hidden">
            <SideBarLayout>
                <div className="flex h-screen max-h-screen w-full flex-col gap-20 overflow-auto px-5 pt-10 pb-25 lg:px-25">
                    <ProfileCard />
                    <div className="flex items-center justify-center lg:justify-start">
                        <Calender />
                    </div>
                </div>
            </SideBarLayout>
        </div>
    )
}

export default UserProfile
