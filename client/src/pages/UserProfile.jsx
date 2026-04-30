import ProfileCard from "@/components/profile/ProfileCard"
import SideBarLayout from "../components/layout/SideBar"

const UserProfile = () => {
    return (
        <div className="p-5">
            <SideBarLayout>
                <ProfileCard/>
            </SideBarLayout>
        </div>
    )
}

export default UserProfile
