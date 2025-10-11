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
        order: number;
        slug: string;
        coordinates: [number, number, number, number];
    }[];
}) => {
    const firstBuilding = buildingCoordinates[0];

    const activeBuildingRef = useRef<HTMLAnchorElement>(null);
    const mapRef = useRef<HTMLDivElement>(null);
    const hasScrolledRef = useRef<string | null>(null); // Track which slug we've scrolled to

    const { horizontalScrollPosition } = useHorizontalScroll(mapRef);
    const { verticalScrollPosition } = useVerticalScroll(mapRef);
    const [showStartHere, setShowStartHere] = useState(true);

    // Mobile-only initial scroll - direct and simple
    useEffect(() => {
        // Only handle mobile scrolling
        if (typeof window === "undefined" || window.innerWidth >= 768) return;

        // Skip if we've already scrolled to this slug
        if (hasScrolledRef.current === currentSlug) return;

        const currentBuilding = buildingCoordinates.find(
            (building) => building.slug === currentSlug
        );

        if (!currentBuilding || !mapRef.current) return;

        const mapElement = mapRef.current;

        const performScroll = () => {
            if (!mapElement) return;

            // Double RAF for reliable execution after layout
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    try {
                        const scrollLeft =
                            (currentBuilding.coordinates[1] / 100) *
                                mapElement.scrollWidth -
                            mapElement.clientWidth / 2;

                        mapElement.scrollTo({
                            left: Math.max(0, scrollLeft),
                            behavior: "auto", // Use auto for instant, reliable positioning
                        });

                        hasScrolledRef.current = currentSlug;
                        console.log(
                            `Mobile scroll: positioned at ${currentBuilding.slug}`
                        );
                    } catch (error) {
                        console.warn("Map: Mobile scroll failed", error);
                    }
                });
            });
        };

        // Find the mobile image specifically
        const mobileImage = mapElement.querySelector(
            "img.h-\\[300px\\]"
        ) as HTMLImageElement;

        if (mobileImage) {
            if (mobileImage.complete && mobileImage.naturalHeight > 0) {
                // Image is loaded
                performScroll();
            } else {
                // Wait for image to load
                const handleLoad = () => performScroll();
                mobileImage.addEventListener("load", handleLoad, {
                    once: true,
                });
            }
        } else {
            // Fallback - try again after images might load
            setTimeout(performScroll, 100);
        }
    }, [currentSlug, buildingCoordinates]);

    // Handle scroll interactions after initial positioning
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

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowStartHere(true);
        }, 3000);

        return () => clearTimeout(timer);
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

                    {/* Start here indicator for first building */}
                    {firstBuilding && (
                        <>
                            {/* Mobile version */}
                            <Link
                                href={`/explore/${firstBuilding.slug}`}
                                className={clsx(
                                    "md:hidden absolute flex flex-col items-center cursor-pointer transition-opacity duration-500",
                                    showStartHere ? "opacity-100" : "opacity-0"
                                )}
                                style={{
                                    position: "absolute",
                                    top: `${firstBuilding.coordinates[0] - 5}%`,
                                    left: `${
                                        firstBuilding.coordinates[1] +
                                        firstBuilding.coordinates[2] / 2 +
                                        2
                                    }%`,
                                    transform: "translateX(-50%)",
                                    zIndex: 200,
                                }}
                            >
                                <div className='bg-white border-2 rounded-lg px-2 py-1 text-xs font-semibold shadow-lg whitespace-nowrap hover:bg-gray-50 transition-colors'>
                                    Start here
                                </div>

                                <div className='mt-0.5 mr-3'>
                                    <svg
                                        width='38'
                                        height='38'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z'
                                            fill='#FEF3C7'
                                            stroke='#F59E0B'
                                            strokeWidth='1'
                                        />
                                    </svg>
                                </div>
                            </Link>

                            {/* Desktop version */}
                            <Link
                                href={`/explore/${firstBuilding.slug}`}
                                className={clsx(
                                    "hidden md:flex absolute transition-opacity duration-500",
                                    showStartHere ? "opacity-100" : "opacity-0"
                                )}
                                style={{
                                    position: "absolute",
                                    right: `${
                                        firstBuilding.coordinates[0] + 5
                                    }%`,
                                    top: `${
                                        firstBuilding.coordinates[1] +
                                        firstBuilding.coordinates[2] / 2 +
                                        2
                                    }%`,
                                    transform: "translateY(-50%)",
                                    zIndex: 200,
                                }}
                            >
                                <div className='bg-white border-2 rounded-lg px-2 py-1 text-sm font-semibold shadow-lg whitespace-nowrap hover:bg-gray-50 transition-colors'>
                                    Start here
                                </div>

                                <div className='ml-1'>
                                    <svg
                                        width='32'
                                        height='32'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z'
                                            fill='#FEF3C7'
                                            stroke='#F59E0B'
                                            strokeWidth='1'
                                        />
                                    </svg>
                                </div>
                            </Link>
                        </>
                    )}

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
                        mapRef.current.scrollTo({
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
                            mapRef.current.scrollHeight -
                                mapRef.current.clientHeight
                        );
                        mapRef.current.scrollTo({
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
