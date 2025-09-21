/* eslint-disable @next/next/no-img-element */
import { useScaleValue } from "./use-scale-value";
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
    zoomTransformCss,
    mobileOffset,
}: {
    base: any;
    alt: string;
    isZoomed: boolean | undefined;
    onAnimationComplete: () => void;
    zoomTransformCss?: string;
    mobileOffset?: number;
}) => {
    const { containerRef, imageRef, scaleValue } = useScaleValue();
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        let sto: ReturnType<typeof setTimeout>;
        sto = setTimeout(() => {
            onAnimationComplete();
        }, 1000);

        return () => {
            clearTimeout(sto);
        };
    }, [isZoomed, onAnimationComplete]);

    useEffect(() => {
        const sto = setTimeout(() => {
            setHasLoaded(true);
        }, 1000);
        return () => {
            clearTimeout(sto);
        };
    }, []);

    if (base === undefined) {
        console.warn("Base image is undefined for FakeZoomIn");
        return null;
    }

    return (
        <div
            className='relative flex-1 h-screen overflow-hidden md:w-[420px]'
            ref={containerRef}
        >
            <div className='absolute top-0 left-0 flex-1 w-screen h-screen flex items-center justify-center overflow-hidden z-2 md:h-auto md:w-[100%]'>
                <img
                    ref={imageRef}
                    className='md:w-[100%]'
                    alt={alt}
                    {...getImageProps(base)}
                    style={{
                        height: "100%",
                        maxWidth: "initial",

                        transform: `
                        translateY(${-(mobileOffset ?? 0)}%)

                        scale(${scaleValue})

                        ${(() => {
                            if (isZoomed && zoomTransformCss) {
                                return zoomTransformCss;
                            }

                            return `scale(${isZoomed ? 3 : 1}) translateY(${
                                isZoomed ? "0%" : "0"
                            })`;
                        })()}`,

                        ...(hasLoaded
                            ? {
                                  transition: "transform 1.5s ease-in-out",
                              }
                            : {}),
                    }}
                />
            </div>
        </div>
    );
};
