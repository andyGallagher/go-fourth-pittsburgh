/* eslint-disable @next/next/no-img-element */
import { useScaleValue } from "./use-scale-value";
import clsx from "clsx";
import { getImageProps } from "helpers/urlFor";
import React, { useEffect, useRef, useState } from "react";

const imageClassName =
    "absolute top-0 left-0 flex-1 w-screen h-screen flex items-center justify-center overflow-hidden opacity-0 z-2 md:h-auto md:w-[100%]";

export const ZoomIn = ({
    animationIn,
    animationOut,
    base,
    isZoomed,
    zoomed,
    onAnimationComplete,
    mobileOffset,
}: {
    animationIn: any;
    animationOut: any;
    base: any;
    isZoomed: boolean | undefined;
    zoomed: any;
    onAnimationComplete: () => void;
    mobileOffset?: number;
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
    const [shouldLoadAnimation, setShouldLoadAnimation] = useState(false);
    const { scaleValue, containerRef, imageRef } = useScaleValue();

    useEffect(() => {
        let sto: ReturnType<typeof setTimeout> | undefined = undefined;

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
            if (sto) {
                clearTimeout(sto);
            }
        };
    }, [isZoomed, onAnimationComplete]);

    useEffect(() => {
        setTimeout(() => setShouldLoadAnimation(true), 1000);
    }, []);

    const imgClassName = `h-full md:w-[100%] max-w-initial`;
    const imgStyle = {
        maxWidth: "initial",
        transform: `translateY(${-(mobileOffset ?? 0)}%) scale(${scaleValue})`,
        height: "100%",
        transformOrigin: "center center",
    };

    return (
        <div
            className='relative flex-1 h-screen md:h-auto overflow-hidden md:w-[420px]'
            ref={containerRef}
        >
            <div
                className={clsx(imageClassName, "opacity-100 z-1 md:relative")}
            >
                <img
                    alt=''
                    ref={imageRef}
                    {...getImageProps(base)}
                    className={imgClassName}
                    style={imgStyle}
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
                    className={imgClassName}
                    style={imgStyle}
                    {...getImageProps(base)}
                />
            </div>

            <div
                className={clsx(
                    imageClassName,
                    shownImage === "animation-in" && "opacity-100"
                )}
            >
                {shouldLoadAnimation && (
                    <img
                        alt=''
                        {...getImageProps(animationIn)}
                        {...(zoomInRando ?? {})}
                        className={imgClassName}
                        style={imgStyle}
                    />
                )}
            </div>

            <div
                className={clsx(
                    imageClassName,
                    shownImage === "animation-out" && "opacity-100"
                )}
            >
                {shouldLoadAnimation && (
                    <img
                        alt=''
                        {...getImageProps(animationOut)}
                        {...(zoomOutRando ?? {})}
                        className={imgClassName}
                        style={imgStyle}
                    />
                )}
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
                        transform: `scale(${scaleValue})`,
                        transformOrigin: "center center",
                    }}
                />
            </div>
        </div>
    );
};
