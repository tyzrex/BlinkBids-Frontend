import { getServerSession } from "next-auth";

import { getUserInfo } from "@/api/user";
import { options } from "@/app/api/auth/[...nextauth]/options";

import { ProfileForm } from "../_components/user-info-form";

export default async function ProfilePage() {
  const session = await getServerSession(options);
  const userData = await getUserInfo(session);

  return (
    <>
      <ProfileForm
        address={userData?.address}
        district={userData?.district}
        name={userData?.name}
        address_description={userData?.address_description}
      />
    </>
  );
}
