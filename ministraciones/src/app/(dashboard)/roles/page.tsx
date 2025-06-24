"use client";
import { get2 } from "@/components/forms/actions";
import React, { useEffect, useState } from "react";

const Roles = () => {
  const [jsonUsr, setJsonUsr] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await get2("api/roles");
      setJsonUsr(data);
      <div className="flex flex-wrap w-full gap-4 px-4">
        <hr className="mb-3" />
        <div className="separador"> </div>
        {/* Render user data */}
        {jsonUsr && (
          <div>
            {jsonUsr[0]?.esta_borrado}
          </div>
        )}
      </div>
    }
})};

//add env 
//API_URL2="http://172.16.35.43:4000/"

export default Roles;

