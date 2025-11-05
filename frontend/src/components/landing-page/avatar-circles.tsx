import { AvatarCircles } from "@/components/ui/avatar-circles";
import { users } from "@/app/_data/users";

const UserAvatarCircles = () => {
  return <AvatarCircles numPeople={300} avatarUrls={users} />;
};

export default UserAvatarCircles;
