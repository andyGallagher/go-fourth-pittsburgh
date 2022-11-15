/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

const imageClassName =
    "absolute top-0 left-0 flex-1 w-screen h-screen flex items-center justify-center overflow-hidden opacity-0 z-2";

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
    const [zoomOutRando, setZoomOutRando] = useState(0);
    const [zoomInRando, setZoomInRando] = useState(0);
    const router = useRouter();

    useEffect(() => {
        setShownImage("base");
    }, [router.asPath]);

    useEffect(() => {
        let sto: ReturnType<typeof setTimeout>;

        if (isZoomed === true) {
            setShownImage("animation-in");

            setTimeout(() => {
                setShownImage("zoomed");
                onAnimationComplete();
                setZoomInRando((i) => i + 1);
            }, 2000);
        } else if (isZoomed === false) {
            setShownImage("animation-out");

            setTimeout(() => {
                setShownImage("base");
                onAnimationComplete();
                setZoomOutRando((i) => i + 1);
            }, 2000);
        }

        return () => {
            clearTimeout(sto);
        };
    }, [isZoomed, onAnimationComplete]);

    return (
        <div className='relative w-screen h-screen overflow-hidden'>
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
                    src={`${animationIn}?i=${zoomInRando}`}
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
                    src={`${animationOut}?i=${zoomOutRando}`}
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
