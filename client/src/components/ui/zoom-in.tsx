/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import { getImageProps } from "helpers/urlFor";
import React, { useEffect, useState } from "react";

const imageClassName =
    "absolute top-0 left-0 flex-1 w-screen h-screen flex items-center justify-center overflow-hidden opacity-0 z-2 md:h-auto md:w-[100%]";

export const ZoomIn = ({
    animationIn,
    animationOut,
    base,
    isZoomed,
    zoomed,
    onAnimationComplete,
}: {
    animationIn: any;
    animationOut: any;
    base: any;
    isZoomed: boolean | undefined;
    zoomed: any;
    onAnimationComplete: () => void;
}) => {
    const [shownImage, setShownImage] = useState<
        "animation-in" | "animation-out" | "base" | "zoomed"
    >("base");
    const [zoomOutRando, setZoomOutRando] = useState<{ src: "" } | undefined>(
        undefined
    );
    const [zoomInRando, setZoomInRando] = useState<{ src: "" } | undefined>(
        undefined
    );

    useEffect(() => {
        let sto: ReturnType<typeof setTimeout>;

        if (isZoomed === true) {
            setShownImage("animation-in");

            setTimeout(() => {
                setShownImage("zoomed");
                onAnimationComplete();
                setZoomOutRando((rando) => {
                    setTimeout(() => {
                        setZoomOutRando(undefined);
                    }, 0);
                    return { src: "" };
                });
            }, 4000);
        } else if (isZoomed === false) {
            setShownImage("animation-out");

            setTimeout(() => {
                setShownImage("base");
                onAnimationComplete();
                setZoomInRando((rando) => {
                    setTimeout(() => {
                        setZoomInRando(undefined);
                    }, 0);
                    return { src: "" };
                });
            }, 4000);
        }

        return () => {
            clearTimeout(sto);
        };
    }, [isZoomed, onAnimationComplete]);

    return (
        <div className='relative flex-1 h-screen overflow-hidden md:w-[420px]'>
            <div
                className={clsx(imageClassName, "opacity-100 z-1 md:relative")}
            >
                <img
                    alt=''
                    {...getImageProps(base)}
                    className='md:w-[100%]'
                    style={{
                        height: "100%",
                        maxWidth: "initial",
                    }}
                />
            </div>

            <div
                className={clsx(
                    imageClassName,
                    shownImage === "base" && "opacity-100"
                )}
            >
                <img
                    alt=''
                    className='md:w-[100%]'
                    {...getImageProps(base)}
                    style={{
                        height: "100%",
                        maxWidth: "initial",
                    }}
                />
            </div>

            <div
                className={clsx(
                    imageClassName,
                    shownImage === "animation-in" && "opacity-100"
                )}
            >
                <img
                    alt=''
                    {...getImageProps(animationIn)}
                    {...(zoomInRando ?? {})}
                    className='md:w-[100%]'
                    style={{
                        height: "100%",
                        maxWidth: "initial",
                    }}
                />
            </div>

            <div
                className={clsx(
                    imageClassName,
                    shownImage === "animation-out" && "opacity-100"
                )}
            >
                <img
                    alt=''
                    {...getImageProps(animationOut)}
                    {...(zoomOutRando ?? {})}
                    className='md:w-[100%]'
                    style={{
                        height: "100%",
                        maxWidth: "initial",
                    }}
                />
            </div>

            <div
                className={clsx(
                    imageClassName,
                    shownImage === "zoomed" && "opacity-100"
                )}
            >
                <img
                    alt=''
                    {...getImageProps(zoomed)}
                    className='md:w-[100%]'
                    style={{
                        height: "100%",
                        maxWidth: "initial",
                    }}
                />
            </div>
        </div>
    );
};
