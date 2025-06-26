"use server";
import DataPanel from "@/components/DataPanel";
import { ofuscad } from "@/utils/util";
import { cookies } from "next/headers";

interface Props {
  params: {
    entidad: string;
  };
}

const Data = async ({ params }: Props) => {
  const myCookie = (await cookies()).get("mnu");

  if (myCookie) {
    const { entidad } = await params;
    let menuOptions = Array(ofuscad(myCookie.value, false));
    //console.log(menuOptions);
    const tienePermiso = menuOptions[0].includes('"/data/' + entidad + '"');
    return (
      tienePermiso &&
      entidad && (
        <div className="flex flex-col overflow-auto pb-3">
          <span className="lblEncabezado ml-4 mt-3">
            {"Administración de " + entidad}
          </span>
          <DataPanel entity={entidad}></DataPanel>
        </div>
      )
    );
  } else {
    //console.log("Cookie not found");
    return null;
  }
};

export default Data;
