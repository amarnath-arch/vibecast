import AppBar from "@/components/AppBar";
import Providers from "./providers";
import Landing from "@/components/Landing";

export default function Home() {
  return (
    <Providers>
      {/* <AppBar />  */}
      <Landing />
    </Providers>
  );
}
