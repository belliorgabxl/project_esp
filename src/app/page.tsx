import Homepage_article from "@/components/article/homePageDetail";
import CLShomepage from "@/components/CLS/CLShomepage";

export default function Home() {
  return (
    <div className=" w-full pb-40 bg-gray-700 ">
      <div className="flex justify-center">
        <CLShomepage />
      </div>
      <Homepage_article />
    </div>
  );
}
