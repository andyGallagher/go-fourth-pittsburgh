/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import React, { useEffect, useState } from "react";

const imageClassName =
    "absolute top-0 left-0 flex-1 w-screen h-screen flex items-center justify-center overflow-hidden opacity-0 z-2 md:w-[100%]";

export const ZoomIn = ({
    animationIn,
    animationOut,
    base,
    isZoomed,
    zoomed,
    onAnimationComplete,
}: {
    animationIn: string;
    animationOut: string;
    base: string;
    isZoomed: boolean | undefined;
    zoomed: string;
    onAnimationComplete: () => void;
}) => {
    const [shownImage, setShownImage] = useState<
        "animation-in" | "animation-out" | "base" | "zoomed"
    >("base");
    const [zoomOutRando, setZoomOutRando] = useState(animationOut);
    const [zoomInRando, setZoomInRando] = useState(animationIn);

    useEffect(() => {
        let sto: ReturnType<typeof setTimeout>;

        if (isZoomed === true) {
            setShownImage("animation-in");

            setTimeout(() => {
                setShownImage("zoomed");
                onAnimationComplete();
                setZoomOutRando((rando) => {
                    setTimeout(() => {
                        setZoomOutRando(rando);
                    }, 0);
                    return "";
                });
            }, 4000);
        } else if (isZoomed === false) {
            setShownImage("animation-out");

            setTimeout(() => {
                setShownImage("base");
                onAnimationComplete();
                setZoomInRando((rando) => {
                    setTimeout(() => {
                        setZoomInRando(rando);
                    }, 0);
                    return "";
                });
            }, 4000);
        }

        return () => {
            clearTimeout(sto);
        };
    }, [isZoomed, onAnimationComplete]);

    return (
        <div className='relative flex-1 h-screen overflow-hidden'>
            <div className={clsx(imageClassName, "opacity-100 z-1")}>
                <img
                    alt=''
                    src={base}
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
                    src={base}
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
                    src={`${zoomInRando}`}
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
                    src={`${zoomOutRando}`}
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
                    src={zoomed}
                    style={{
                        height: "100%",
                        maxWidth: "initial",
                    }}
                />
            </div>
        </div>
    );
};
