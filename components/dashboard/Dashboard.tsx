import { getServerSession } from "next-auth";
import StreamView from "../stream/StreamView";
import { authOptions } from "@/lib/auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  console.log("dashboard session", session);

  return <StreamView creatorId={session.user.id} />;
}
