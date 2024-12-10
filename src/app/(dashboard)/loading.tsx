import PageLoading from "@/components/common/page-loading";
import { Loader } from "lucide-react";
import React from "react";

const Loading = () => {
    return (
        <div className=" w-screen h-screen flex justify-center items-center ">
            <PageLoading />
        </div>
    );
};

export default Loading;
