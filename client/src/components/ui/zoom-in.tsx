/* eslint-disable @next/next/no-img-element */
import { useImageDimensions } from "./use-image-dimensions";
import clsx from "clsx";
import { getImageProps } from "helpers/urlFor";
import React, { useEffect, useRef, useState } from "react";

export const ZoomIn = ({
    animationIn,
    animationOut,
    base,
    isZoomed,
    zoomed,
    onAnimationComplete,
    mobileOffset = 0,
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
    const { dimensions, containerRef, imageRef } =
        useImageDimensions(mobileOffset);

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

    const imgClassName = `object-cover object-top`;
    const imgStyle = {
        width: dimensions.imageWidth,
        height: dimensions.imageHeight,
        maxWidth: "none",
        transformOrigin: "center center",
    };

    const clipStyle = {
        clipPath: `inset(${dimensions.cropTop - 10}px 0 0 0)`,
        top: `-${dimensions.cropTop - 8}px`,
    };

    const imageStyle = {
        ...clipStyle,
        height: `calc(${dimensions.containerHeight} + ${dimensions.cropTop}px)`,
    };

    const imageClassName =
        "absolute top-0 left-0 w-full h-full flex items-start justify-center overflow-hidden";

    return (
        <div
            className='relative flex-1 overflow-hidden md:w-[420px] md:h-[703px] md:max-h-[90vh]'
            ref={containerRef}
            style={{
                height: `calc(${dimensions.imageHeight} - ${dimensions.cropTop}px)`,
            }}
        >
            <div
                className={clsx(imageClassName, "opacity-100 z-1")}
                style={imageStyle}
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
                    shownImage === "base" ? "opacity-100" : "opacity-0"
                )}
                style={imageStyle}
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
                    shownImage === "animation-in" ? "opacity-100" : "opacity-0"
                )}
                style={imageStyle}
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
                    shownImage === "animation-out" ? "opacity-100" : "opacity-0"
                )}
                style={imageStyle}
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
                    shownImage === "zoomed" ? "opacity-100" : "opacity-0"
                )}
                style={imageStyle}
            >
                <img
                    alt=''
                    {...getImageProps(zoomed)}
                    className={imgClassName}
                    style={imgStyle}
                />
            </div>
        </div>
    );
};
