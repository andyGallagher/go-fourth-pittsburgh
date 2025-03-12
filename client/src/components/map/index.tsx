/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import { getImageProps } from "helpers/urlFor";
import Link from "next/link";
import React, { Ref, RefObject, useEffect, useRef, useState } from "react";

export type MapKeys =
    | "bank-of-pittsburgh"
    | "benedum-trees-building"
    | "pittsburgh-stock-exchange";

const COORDINATES: Record<MapKeys, { style: React.CSSProperties }> = {
    ["bank-of-pittsburgh"]: {
        style: {
            top: "57%",
            left: "17%",
            width: "6%",
            height: "43%",
        },
    },
    ["benedum-trees-building"]: {
        style: {
            top: "0%",
            left: "11.5%",
            width: "6%",
            height: "37%",
        },
    },
    ["pittsburgh-stock-exchange"]: {
        style: {
            top: "0%",
            left: "18%",
            width: "6%",
            height: "37%",
        },
    },
};

const useHorizontalScroll = (mapRef: RefObject<HTMLDivElement>) => {
    const [scrollPosition, setScrollPosition] = useState<
        "minimum" | "maximum" | null
    >(null);

    useEffect(() => {
        const mapElement = mapRef.current;
        if (!mapElement) {
            console.warn("Map: map element not found");
            return;
        }

        const handleScroll = () => {
            if (mapElement.scrollLeft === 0) {
                setScrollPosition("minimum");
                return;
            }

            if (
                mapElement.scrollWidth - mapElement.scrollLeft <=
                mapElement.clientWidth * 1.05
            ) {
                setScrollPosition("maximum");
                return;
            }

            setScrollPosition(null);
        };

        mapElement.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial check

        return () => {
            mapElement.removeEventListener("scroll", handleScroll);
        };
    }, [mapRef]);

    return {
        horizontalScrollPosition: scrollPosition,
    };
};

const useVerticalScroll = (mapRef: RefObject<HTMLDivElement>) => {
    const [scrollPosition, setScrollPosition] = useState<
        "minimum" | "maximum" | null
    >(null);

    useEffect(() => {
        const mapElement = mapRef.current;
        if (!mapElement) {
            console.warn("Map: map element not found");
            return;
        }

        const handleScroll = () => {
            if (mapElement.scrollTop === 0) {
                setScrollPosition("minimum");
                return;
            }

            if (
                mapElement.scrollHeight - mapElement.scrollTop <=
                mapElement.clientHeight * 1.05
            ) {
                setScrollPosition("maximum");
                return;
            }

            setScrollPosition(null);
        };

        mapElement.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial check

        return () => {
            mapElement.removeEventListener("scroll", handleScroll);
        };
    }, [mapRef]);

    return {
        verticalScrollPosition: scrollPosition,
    };
};

export const Map = ({ interact, src }: { interact: () => void; src: any }) => {
    const mapRef = useRef<HTMLDivElement>(null);

    const { horizontalScrollPosition } = useHorizontalScroll(mapRef);
    const { verticalScrollPosition } = useVerticalScroll(mapRef);

    useEffect(() => {
        const mapElement = mapRef.current;
        if (!mapElement) {
            console.warn("Map: map element not found");
            return;
        }

        const handleScroll = () => {
            interact();
        };

        mapElement.addEventListener("scroll", handleScroll);

        return () => {
            mapElement.removeEventListener("scroll", handleScroll);
        };
    }, [interact]);

    return (
        <div
            className='flex-1 w-[100vw] h-auto overflow-hidden flex md:h-[703px] md:w-auto md:rounded-xl bg-[#f0d2b1]'
            onMouseDown={interact}
        >
            <div
                className='flex-1  flex items-start justify-start overflow-scroll'
                ref={mapRef}
            >
                <div className='flex-1 relative'>
                    <img
                        className='hidden md:block w-[420px] md:overflow-hidden'
                        alt='map'
                        // # TODO => Reimplement this
                        // {...getImageProps(src)}
                        src='/images/map-vertical.png'
                    />

                    <img
                        className='h-[300px] w-auto max-w-none md:hidden'
                        alt='map'
                        // # TODO => Reimplement this
                        // {...getImageProps(src)}
                        src='/images/map-horizontal.png'
                    />

                    {Object.entries(COORDINATES).map(([key, { style }]) => {
                        return (
                            <React.Fragment key={key}>
                                <Link
                                    className='md:hidden'
                                    href={`/explore/${key}`}
                                    style={{
                                        position: "absolute",
                                        ...style,

                                        zIndex: 100,
                                    }}
                                />

                                <Link
                                    className='hidden md:block'
                                    href={`/explore/${key}`}
                                    style={{
                                        position: "absolute",

                                        right: style.top,
                                        top: style.left,
                                        width: style.height,
                                        height: style.width,

                                        zIndex: 100,
                                    }}
                                />
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            <div
                className={clsx(
                    "flex md:hidden absolute bottom-4 left-4 p-2 bg-white rounded-full shadow-md items-center justify-center w-10 h-10 transition-opacity duration-200",
                    horizontalScrollPosition === "minimum" &&
                        "opacity-60 cursor-not-allowed"
                )}
                onClick={() => {
                    if (
                        mapRef.current &&
                        horizontalScrollPosition !== "minimum"
                    ) {
                        const newScrollLeft = Math.max(
                            mapRef.current.scrollLeft - 200,
                            0
                        );
                        mapRef.current.scrollTo({
                            left: newScrollLeft,
                            behavior: "smooth",
                        });
                    }
                }}
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    className='w-6 h-6 mr-[1px]'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 19l-7-7 7-7'
                    />
                </svg>
            </div>

            <div
                className={clsx(
                    "hidden md:flex absolute bottom-4 left-4 p-2 bg-white rounded-full shadow-md items-center justify-center w-10 h-10 transition-opacity duration-200",
                    verticalScrollPosition === "minimum" &&
                        "opacity-60 cursor-not-allowed"
                )}
                onClick={() => {
                    if (
                        mapRef.current &&
                        verticalScrollPosition !== "minimum"
                    ) {
                        const newScrollTop = Math.max(
                            mapRef.current.scrollTop - 200,
                            0
                        );
                        mapRef.current.scrollBy({
                            top: newScrollTop,
                            behavior: "smooth",
                        });
                    }
                }}
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    className='w-6 h-6 mr-[1px]'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M5 15l7-7 7 7'
                    />
                </svg>
            </div>

            <div
                className={clsx(
                    "flex md:hidden absolute bottom-4 right-4 p-2 bg-white rounded-full shadow-md items-center justify-center w-10 h-10 transition-opacity duration-200",
                    horizontalScrollPosition === "maximum" &&
                        "opacity-60 cursor-not-allowed"
                )}
                onClick={() => {
                    if (
                        mapRef.current &&
                        horizontalScrollPosition !== "maximum"
                    ) {
                        const newScrollLeft = Math.min(
                            mapRef.current.scrollLeft + 200,
                            mapRef.current.scrollWidth -
                                mapRef.current.clientWidth
                        );
                        mapRef.current.scrollTo({
                            left: newScrollLeft,
                            behavior: "smooth",
                        });
                    }
                }}
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    className='w-6 h-6 ml-[1px]'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 5l7 7-7 7'
                    />
                </svg>
            </div>

            <div
                className={clsx(
                    "hidden md:flex absolute bottom-4 right-4 p-2 bg-white rounded-full shadow-md items-center justify-center w-10 h-10 transition-opacity duration-200",
                    verticalScrollPosition === "maximum" &&
                        "opacity-60 cursor-not-allowed"
                )}
                onClick={() => {
                    if (
                        mapRef.current &&
                        verticalScrollPosition !== "maximum"
                    ) {
                        const newScrollTop = Math.min(
                            mapRef.current.scrollTop + 200,
                            mapRef.current.scrollTop -
                                mapRef.current.clientHeight
                        );
                        mapRef.current.scrollBy({
                            top: newScrollTop,
                            behavior: "smooth",
                        });
                    }
                }}
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    className='w-6 h-6 mr-[1px]'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 9l-7 7-7-7'
                    />
                </svg>
            </div>
        </div>
    );
};
