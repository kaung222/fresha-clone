import PageLoading from "@/components/common/page-loading";
import { Loader } from "lucide-react";
import React from "react";

const Loading = () => {
    return (
        <div className=" w-full h-full flex justify-center items-center ">
            <PageLoading />
        </div>
    );
};

export default Loading;
