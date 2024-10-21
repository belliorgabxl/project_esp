import Footer from "@/components/footer/footer";
import DevicePage from "./DevicePage";
import { auth } from "@/auth";

export default async function devices() {
  const session = await auth();
  return (
    <div>
      <DevicePage user={session?.user} />
    </div>
  );
}
