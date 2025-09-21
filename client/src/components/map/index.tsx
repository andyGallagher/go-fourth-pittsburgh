/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import { getImageProps } from "helpers/urlFor";
import Link from "next/link";
import React, { RefObject, useEffect, useRef, useState } from "react";

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

export const Map = ({
    currentSlug,
    interact,
    horizontalSrc,
    verticalSrc,
    buildingCoordinates,
}: {
    currentSlug: string;
    interact: () => void;
    horizontalSrc: any;
    verticalSrc: any;
    buildingCoordinates: {
        slug: string;
        coordinates: [number, number, number, number];
    }[];
}) => {
    const activeBuildingRef = useRef<HTMLAnchorElement>(null);
    const mapRef = useRef<HTMLDivElement>(null);

    const { horizontalScrollPosition } = useHorizontalScroll(mapRef);
    const { verticalScrollPosition } = useVerticalScroll(mapRef);
    const [hasSetInitialScroll, setHasSetInitialScroll] = useState(false);

    useEffect(() => {
        if (!hasSetInitialScroll) {
            return;
        }

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
    }, [hasSetInitialScroll, interact]);

    useEffect(() => {
        if (activeBuildingRef.current) {
            activeBuildingRef.current.scrollIntoView({
                block: "center",
                inline: "center",
            });
            setHasSetInitialScroll(true);
        }
    }, []);

    return (
        <div
            className='flex-1 w-full h-auto overflow-hidden flex md:h-[703px] md:w-auto md:rounded-t-xl md:rounded-b-none bg-[#f0d2b1]'
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
                        {...getImageProps(verticalSrc)}
                    />

                    <img
                        className='h-[300px] w-auto max-w-none md:hidden'
                        alt='map'
                        {...getImageProps(horizontalSrc)}
                    />

                    {buildingCoordinates.map(({ slug, coordinates }) => {
                        const style = {
                            top: `${coordinates[0]}%`,
                            left: `${coordinates[1]}%`,
                            width: `${coordinates[2]}%`,
                            height: `${coordinates[3]}%`,
                        };
                        return (
                            <React.Fragment key={slug}>
                                <Link
                                    className='md:hidden'
                                    href={`/explore/${slug}`}
                                    style={{
                                        position: "absolute",
                                        ...style,

                                        // border: "1px solid red",

                                        zIndex: 100,
                                    }}
                                    ref={
                                        currentSlug === slug
                                            ? activeBuildingRef
                                            : null
                                    }
                                />

                                <Link
                                    className='hidden md:block'
                                    href={`/explore/${slug}`}
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
