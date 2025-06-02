import Image from "next/image";

const TitleName = () => {
  return (
    <>
      {" "}
      {/*system name width={68} height={36} */}
      <div className="flex items-center gap-2 justify-center w-full position relative">
        <Image src="/general/siag-007.svg" alt="" width="68" height="19" />
        <span className="hidden md:block text-lg leading-4 font-medium border-l-1 border-bordeBlancoTransparente px-2 ">
          Sistema Integral Administrativo Gubernamental
        </span>
      </div>
    </>
  );
};

export default TitleName;
