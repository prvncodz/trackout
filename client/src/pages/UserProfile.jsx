import ProfileCard from "@/components/profile/ProfileCard"
import SideBarLayout from "../components/layout/SideBar"

const UserProfile = () => {
    return (
        <div>
            <SideBarLayout>
                <div className="w-full flex-1 max-h-screen h-screen p-5 justify-center items-center">
                    <ProfileCard />
                </div>
            </SideBarLayout>
        </div>
    )
}

export default UserProfile
