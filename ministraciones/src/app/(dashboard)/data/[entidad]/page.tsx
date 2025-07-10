"use server";
import DataPanel from "@/components/DataPanel";
import { aOracion, ofuscad, ofuscadAwait } from "@/utils/util";
import { cookies } from "next/headers";

interface Props {
  params: {
    entidad: string;
  };
}

const Data = async ({ params }: Props) => {
  const mnusCookie = (await cookies()).get("mnus");
  let selectedOption = JSON.parse(
    ofuscad(String((await cookies()).get("opt")?.value), false)
  );

  if (mnusCookie) {
    const { entidad } = await params;
    let entityVal = selectedOption.lnk_opt;
    //console.log("entity: ", entity);
    entityVal = String(entityVal?.replace("/data/", ""));
    //console.log("entityVal: ", entityVal);

    let menuOptions = Array(await ofuscadAwait(mnusCookie.value, false, true));
    //console.log("menuOptions: ", menuOptions);

    const tienePermiso = menuOptions[0].includes('"/data/' + entityVal + '"');
    //console.log("tienePermiso: ", tienePermiso," + ",entidad);
    return (
      tienePermiso &&
      entidad && (
        <div className="flex flex-col overflow-auto pb-3 pt-1">
          {/*<span className="lblEncabezado ml-4 mt-2">
            
          </span>*/}
          <DataPanel entity={entityVal} nivel={selectedOption.nn}></DataPanel>
        </div>
      )
    );
  } else {
    //console.log("Cookie not found");
    return null;
  }
};

export default Data;
