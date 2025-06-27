"use client";
import HomePage from "@/app/(dashboard)/home/page";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Data = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/home");
  }, [router]);
  return <></>;
};

export default Data;
