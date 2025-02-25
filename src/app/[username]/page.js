import { notFound } from "next/navigation";
import ClientProfile from "./ClientProfile";

export default function ProfilePage({ params }) {
  const { username } = params;

  if (!username.startsWith("%40")) {
    notFound();
  }

  return <ClientProfile username={username} />;
}
