import ProfileCard from "@/components/profile/ProfileCard";
import SideBarLayout from "../components/layout/SideBar";
import Calender from "@/components/ui/Calender";

const UserProfile = () => {
  return (
    <div>
      <SideBarLayout>
        <div className="flex h-screen max-h-screen w-full flex-col gap-20 overflow-auto px-25 pt-10 pb-25">
          <ProfileCard />
          <div className="flex items-center justify-start">
            <Calender size={"lg"} />
          </div>
        </div>
      </SideBarLayout>
    </div>
  );
};

export default UserProfile;
