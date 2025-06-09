import Image from "next/image";

const TitleName = () => {
  return (
    <>
      {" "}
      {/*system name width={68} height={36} */}
      <div className="flex items_-center gap-2 ">
        <Image src="/general/siag-007.svg" alt="" width="68" height="19" />
        <span className="hidden sm:block text-lg leading-4 font-medium border-l-1 border-bordeBlancoTransparente pl-2">
          Sistema Administrativo Gubernamental
        </span>
      </div>
    </>
  );
};

export default TitleName;
