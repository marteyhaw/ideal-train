import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Pagination() {
  return (
    <>
      <div className="border w-10 h-10 bg-white flex justfiy-center items-center text-center">
        <div className="w-full flex justify-center">
          <ChevronLeftIcon className="w-4 h-4" />
        </div>
      </div>
      <div className="border w-10 h-10 bg-white flex justfiy-center items-center text-center">
        <div className="w-full">1</div>
      </div>
      <div className="border w-10 h-10 bg-white flex justfiy-center items-center text-center border-blue-500">
        <div className="w-full">2</div>
      </div>
      <div className="border w-10 h-10 bg-white flex justfiy-center items-center text-center">
        <div className="w-full">3</div>
      </div>
      <div className="border w-10 h-10 bg-white flex justfiy-center items-center text-center">
        <div className="w-full">4</div>
      </div>
      <div className="border w-10 h-10 bg-white flex justfiy-center items-center text-center">
        <div className="w-full">5</div>
      </div>
      <div className="border w-10 h-10 bg-white flex justfiy-center items-center text-center">
        <div className="w-full flex justify-center">
          <ChevronRightIcon className="w-4 h-4" />
        </div>
      </div>
    </>
  );
}
