import UserDetailsPage from "@/components/pages/UserDetails";
import { User } from "@/interfaces/user";
import { getUser } from "@/services/user";
import { notFound, redirect } from "next/navigation";

const UserDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params)?.id;

  try {
    if (!id) {
      notFound();
    }

    const response = await getUser(Number(id));

    if (response?.data?.code === 404) {
      redirect("/");
    }

    const userData = response.data.data as User;

    return <UserDetailsPage data={userData} />;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching user details:", error.message);
    }
    throw error;
  }
};

export default UserDetails;
