/* eslint-disable @next/next/no-img-element */
import { useImageDimensions } from "./use-image-dimensions";
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
    mobileOffset = 0,
    heightOverride,
}: {
    base: any;
    alt: string;
    isZoomed: boolean | undefined;
    onAnimationComplete: () => void;
    zoomTransformCss?: string;
    mobileOffset?: number;
    heightOverride?: string;
}) => {
    const { dimensions, containerRef, imageRef } =
        useImageDimensions(mobileOffset);
    const [hasLoaded, setHasLoaded] = useState(false);

    const [viewportWidth, setViewportWidth] = useState<number | undefined>(
        undefined
    );

    useEffect(() => {
        if (typeof window !== "undefined") {
            setViewportWidth(window.innerWidth);
        }
    }, []);

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
            className='relative flex-1 overflow-hidden md:w-[420px] md:h-[703px] md:max-h-[90vh]'
            ref={containerRef}
            style={
                viewportWidth && viewportWidth < 768
                    ? {
                          height: heightOverride ?? dimensions.containerHeight,
                      }
                    : {}
            }
        >
            <div
                className='absolute left-0 w-full flex items-start justify-center'
                style={{
                    top: `-${dimensions.cropTop}px`,
                    height: dimensions.imageHeight,
                    clipPath: `inset(${dimensions.cropTop}px 0 0 0)`,
                }}
            >
                <img
                    ref={imageRef}
                    className='object-cover object-top'
                    alt={alt}
                    {...getImageProps(base)}
                    style={{
                        width: dimensions.imageWidth,
                        height: dimensions.imageHeight,
                        maxWidth: "none",
                        transform: `
                            ${(() => {
                                if (!hasLoaded) {
                                    return `scale(1)`;
                                }

                                if (isZoomed && zoomTransformCss) {
                                    return zoomTransformCss;
                                }

                                return `scale(${isZoomed ? 3 : 1})`;
                            })()}
                        `,
                        transformOrigin: "center center",
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
