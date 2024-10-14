"use client";
type Props = {
  isLoading: boolean;
};
export default function AboutUsDetail({ isLoading }: Props) {
  return (
    <div className="grid w-full">
      <div
        className={`duration-1000 flex w-full justify-start   my-5 ${
          isLoading ? "px-10" : "opacity-0 h-10 px-0"
        }`}
      >
        <div className="bg-gray-900 text-white px-10 py-5 rounded-lg">
          <p className="text-2xl">Mr. Patarajarin Napakarn</p>
          <p className="font-bold text-xl my-3">Gabel</p>
          <hr />
          <p className="my-2">Studen ID : 64011224</p>
          <p className="my-2">Faculty Of Engineering</p>
        </div>
        <div className="">
          <img
            src="aboutus/gabel.jpg"
            width={200}
            height={200}
            alt="gabel"
            className="rounded-xl shadow-md shadow-gray-800"
          />
        </div>
      </div>

      {/* bam */}
      <div
        className={`duration-1000 flex w-full justify-center   my-5 ${
          isLoading ? "px-12" : "opacity-0  px-0"
        }`}
      >
        <div className="bg-gray-900 text-white px-10 py-5 rounded-lg">
          <p className="text-2xl">Ms. Chanidapha Chatsak</p>
          <p className="font-bold text-xl my-3">Bam</p>
          <hr />
          <p className="my-2">Studen ID : 64010153</p>
          <p className="my-2">Faculty Of Engineering</p>
        </div>
        <div className="">
          <img
            src="aboutus/bam.jpg"
            width={200}
            height={200}
            alt="gabel"
            className="rounded-xl shadow-md shadow-gray-800"
          />
        </div>
      </div>

      <div
        className={`duration-1000 flex w-full justify-end   my-5 ${
          isLoading ? "px-12" : "opacity-0  px-0"
        }`}
      >
        <div className="bg-gray-900 text-white px-10 py-5 rounded-lg">
          <p className="text-2xl">Mr. Kasama Mingmuang</p>
          <p className="font-bold text-xl my-3">Por</p>
          <hr />
          <p className="my-2">Studen ID : 64010027</p>
          <p className="my-2">Faculty Of Engineering</p>
        </div>
        <div className="">
          <img
            src="aboutus/por.jpg"
            width={200}
            height={200}
            alt="gabel"
            className="rounded-xl shadow-md shadow-gray-800"
          />
        </div>
      </div>
    </div>
  );
}
