import { auth } from "@/auth.config";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProfileCart } from "./ui/ProfileCart";
import { getProfilePicture } from "@/actions";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) {
    // redirect('/auth/login?returnTo=/perfil')
    redirect("/");
  }

  const image = await getProfilePicture(session.user.id) ?? undefined;
  return (
    <div className="p-5 md:w-80 w-full items-center flex flex-col">
      {/* <Title title="Perfil" />
      <pre className="overflow-auto p-5">
        {JSON.stringify(session.user, null, 2)}
      </pre>
      <h3 className="text-3xl mt-5">{session.user.role}</h3> */}

      <ProfileCart session={session} imageUrl={image}/>
    </div>
  );
}
