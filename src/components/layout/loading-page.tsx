"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

type Props = {};

const LoadingPage = (props: Props) => {
    const colorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (colorRef.current) {
            const keyEffect = new KeyframeEffect(
                colorRef.current,
                [{ transform: "translateX(0)" }, { transform: "translateX(150px)" }],
                { duration: 3000, easing: "ease-in-out", iterations: Infinity }
            );

            const openAnimation = new Animation(keyEffect);
            openAnimation.play();
        }
    }, []);

    return (
        <div className=" w-full h-full fixed z-[100] bg-red-300 flex justify-center items-center ">
            <div className=" size-52 relative ">
                <div
                    ref={colorRef}
                    style={{
                        backgroundImage:
                            "linear-gradient(to right,transparent 0% ,#00a3c861 15%, #00a3c8 25% , #00a3c8 75% , #00a3c861 85%, transparent)",
                    }}
                    className=" w-5 h-full absolute z-0 "
                ></div>
                <Image
                    src={`/HeartBeat.svg`}
                    alt="svg"
                    width={208}
                    height={208}
                    className=" relative"
                />
            </div>
        </div>
    );
};

export default LoadingPage;