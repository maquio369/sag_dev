"use client";
import PersonalListPage from "@/app/(dashboard)/list/personal/page";
import { useEffect, useState } from "react";

const Home = () => {
  return (
    <div className="flex flex-col overflow-auto pb-3">
      <span className="lblEncabezado ml-4 mt-3">
        <i className="fa-solid fa-money-check-dollar mr-4 scale-200"></i>
        Sistema de Ministraciones</span>
      <div className="flex flex-wrap w-full gap-4 px-4">
        <hr className="mb-3" />
      </div>
    </div>
  );
};

export default Home;
