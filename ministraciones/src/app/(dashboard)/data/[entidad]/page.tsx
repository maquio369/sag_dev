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
  const cookieStore = cookies();
  const myCookie = (await cookies()).get("mnu");

  if (myCookie) {
    const cookie_value = ofuscad(myCookie.value, false);

    const { entidad } = await params;
    let menuOptions = Array(cookie_value);
    //console.log(menuOptions);
    const tienPermiso = menuOptions[0].includes("/data/" + entidad);
    return (
      tienPermiso &&
      entidad && (
        <div className="flex flex-col overflow-auto pb-3">
          <span className="lblEncabezado ml-4 mt-3">
            {"Administración de " + entidad}
          </span>

          <DataPanel entity={entidad}></DataPanel>
        </div>
      )
    );

    return cookie_value;
  } else {
    console.log("Cookie not found");
    return null;
  }
};

export default Data;
