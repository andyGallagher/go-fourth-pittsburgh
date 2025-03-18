/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import { getImageProps } from "helpers/urlFor";
import React, { useEffect, useState } from "react";

/**
 * Just zoom in an image for a fake zoom effect.
 */
export const FakeZoomIn = ({
    base,
    alt,
    isZoomed,
    onAnimationComplete,
}: {
    base: any;
    alt: string;
    isZoomed: boolean | undefined;
    onAnimationComplete: () => void;
}) => {
    useEffect(() => {
        let sto: ReturnType<typeof setTimeout>;
        sto = setTimeout(() => {
            onAnimationComplete();
        }, 1000);

        return () => {
            clearTimeout(sto);
        };
    }, [isZoomed, onAnimationComplete]);

    return (
        <div className='relative flex-1 h-screen overflow-hidden md:w-[420px]'>
            <div className='absolute top-0 left-0 flex-1 w-screen h-screen flex items-center justify-center overflow-hidden z-2 md:h-auto md:w-[100%]'>
                <img
                    className='md:w-[100%]'
                    alt={alt}
                    {...getImageProps(base)}
                    style={{
                        height: "100%",
                        maxWidth: "initial",

                        transform: `scale(${isZoomed ? 3 : 1}) translateY(${
                            isZoomed ? "0%" : "0"
                        })`,
                        transition: "transform 1.5s ease-in-out",
                    }}
                />
            </div>
        </div>
    );
};
