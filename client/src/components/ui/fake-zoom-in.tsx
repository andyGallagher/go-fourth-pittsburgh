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
        <img
            className='w-[100%]'
            alt={alt}
            {...getImageProps(base)}
            style={{
                transform: `scale(${isZoomed ? 3 : 1}) translateY(${
                    isZoomed ? "4%" : "0"
                })`,
                transition: "transform 1.5s ease-in-out",
            }}
        />
    );
};
