import Homepage_article from "@/components/article/homePageDetail";
import CLShomepage from "@/components/CLS/CLShomepage";

export default function Home() {
  return (
    <div className=" w-full pb-40 bg-[url('/assets/bghome.jpg')]">
      <div className="flex justify-center">
        <div className="bg-gray-800 mb-5">
          <CLShomepage />
        </div>
      </div>
      <Homepage_article />
    </div>
  );
}
