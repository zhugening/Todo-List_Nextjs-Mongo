
function Footer() {
  return (
    <>
      <div className="bg-gray-50 h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-20">

      </div>
      <div className="flex flex-col justify-center items-center text-center p-5 bg-gray-50">
        <h1 className="text-md text-gray-800 font-semibold">
          © 2023 All rights reserved | Build with
          <span className="text-4xl mr-2 ml-2 text-red-600">❤</span> 
          by{" "}
          <span className="hover:text-violet-600 font-semibold cursor-pointer hover-text-4xl">
            หวบม-ส.{" "}
          </span>
        </h1>
      </div>
    </>
  );
}

export default Footer;
