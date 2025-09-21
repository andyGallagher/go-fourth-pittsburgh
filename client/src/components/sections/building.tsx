/* eslint-disable @next/next/no-img-element */
import { ReactComponent as ArrowLeftIcon } from "../../assets/icons/arrow--left.svg";
import { ReactComponent as ArrowRightIcon } from "../../assets/icons/arrow--right.svg";
import { ReactComponent as ChevronDownIcon } from "../../assets/icons/chevron--down.svg";
// import { ReactComponent as PlayFilledIcon } from "../../assets/icons/speaker.svg";
import { ReactComponent as ZoomInIcon } from "../../assets/icons/zoom--in.svg";
import { FakeZoomIn } from "../ui/fake-zoom-in";
import clsx from "clsx";
import { Button } from "components/ui/button";
import { Marquee } from "components/ui/marquee";
import { Section } from "components/ui/section";
import { ZoomIn } from "components/ui/zoom-in";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { BuildingPage, LandingPage } from "types";

export const ExploreIcon = ({ style }: { style: any }) => {
    return (
        <svg
            style={{
                ...style,
                strokeWidth: 2,
            }}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 80 80'
        >
            <path
                style={{ fill: "currentcolor", strokeWidth: 2 }}
                d='M 43.996094 9 C 40.143031 9 37 12.146425 37 15.998047 C 37 19.851343 40.143031 23 43.996094 23 C 47.855015 23 51 19.851141 51 15.998047 C 51 12.146626 47.855015 9 43.996094 9 z M 43.996094 11 C 46.775172 11 49 13.227468 49 15.998047 C 49 18.770952 46.775172 21 43.996094 21 C 41.225157 21 39 18.770751 39 15.998047 C 39 13.227669 41.225157 11 43.996094 11 z M 37.017578 24 C 34.829905 24 32.716661 24.795785 31.074219 26.240234 L 26.697266 30.089844 C 25.857945 30.828146 25.288918 31.824888 25.083984 32.925781 C 24.791486 34.501274 24.294844 37.180032 23.867188 39.486328 C 23.653358 40.639476 23.455312 41.699444 23.310547 42.482422 C 23.238167 42.873911 23.179046 43.195581 23.136719 43.425781 C 23.094389 43.655982 23.07988 43.729892 23.0625 43.837891 C 23.00648 44.183881 23.003906 44.515625 23.003906 44.515625 A 1.0001 1.0001 0 0 0 23.003906 44.564453 C 23.040072 46.454948 24.600201 48 26.5 48 C 27.956662 48 29.21363 47.096802 29.736328 45.820312 C 29.745428 45.801432 29.866955 45.552427 29.933594 45.181641 C 29.938794 45.152791 30.399679 42.665584 30.841797 40.28125 C 31.250928 38.074812 31.596146 36.208031 31.654297 35.894531 L 34.048828 33.896484 L 32.191406 42.507812 C 32.062992 43.102868 32.00634 43.704458 32.011719 44.302734 L 32.011719 44.304688 A 1.0001 1.0001 0 0 0 31.962891 44.464844 L 29.548828 54.994141 L 22.726562 64.701172 A 1.0001 1.0001 0 0 0 22.544922 65.283203 C 22.277119 65.817853 22 66.360362 22 67 C 22 69.197334 23.802666 71 26 71 C 27.173257 71 28.175382 70.425663 28.90625 69.617188 A 1.0001 1.0001 0 0 0 29.273438 69.300781 L 36.724609 58.695312 A 1.0001 1.0001 0 0 0 36.853516 58.443359 L 38.027344 54.988281 L 48.667969 69.207031 A 1.0001 1.0001 0 0 0 49.074219 69.525391 C 49.95647 70.539909 51.263281 71.200325 52.738281 70.933594 C 54.33912 70.644384 55.60043 69.390299 55.921875 67.804688 A 1.0001 1.0001 0 0 0 55.923828 67.800781 C 56.109089 66.866519 55.903288 65.983909 55.519531 65.226562 A 1.0001 1.0001 0 0 0 55.378906 64.857422 L 43.322266 45.851562 L 44.759766 39.474609 L 45.154297 40.037109 C 45.504089 40.537027 45.998345 40.919019 46.572266 41.130859 L 56.763672 44.898438 A 1.0001 1.0001 0 0 0 56.955078 44.949219 C 57.088101 44.970052 57.271473 45 57.5 45 C 59.421188 45 61 43.421188 61 41.5 C 61 40.256729 60.339414 39.159153 59.359375 38.542969 A 1.0001 1.0001 0 0 0 59.183594 38.455078 L 50.425781 35.107422 L 46.964844 29.523438 C 47.250695 26.630268 44.951068 24 41.958984 24 L 37.017578 24 z M 37.017578 26 L 41.958984 26 C 43.924563 26 45.34873 27.780848 44.916016 29.697266 L 41.28125 45.816406 A 1.0001 1.0001 0 0 0 41.412109 46.572266 L 53.166016 65.103516 L 53.972656 64.564453 A 1.0001 1.0001 0 0 0 53.683594 65.933594 C 53.95172 66.354837 54.073045 66.846756 53.960938 67.412109 C 53.804749 68.172675 53.138551 68.830264 52.382812 68.966797 C 51.486655 69.128853 50.736629 68.726982 50.318359 68.068359 A 1.0001 1.0001 0 0 0 49.027344 67.708984 L 49.769531 67.339844 L 35.234375 47.917969 C 34.166497 46.491264 33.768475 44.67228 34.144531 42.929688 L 36.617188 31.480469 A 1.0001 1.0001 0 0 0 34.998047 30.501953 L 30.097656 34.589844 A 1.0001 1.0001 0 0 0 29.753906 35.175781 C 29.753906 35.175781 29.317133 37.533553 28.875 39.917969 C 28.432867 42.302385 27.998659 44.638018 27.964844 44.826172 C 27.955944 44.875682 27.900391 45.03125 27.900391 45.03125 A 1.0001 1.0001 0 0 0 27.888672 45.060547 C 27.665062 45.611149 27.137815 46 26.5 46 C 25.672981 46 25.028423 45.358091 25.007812 44.535156 C 25.010912 44.482116 25.023549 44.241027 25.037109 44.158203 A 1.0001 1.0001 0 0 0 25.037109 44.154297 C 25.026729 44.218797 25.061416 44.018024 25.103516 43.789062 C 25.145616 43.560103 25.205023 43.236855 25.277344 42.845703 C 25.421985 42.0634 25.618235 41.004541 25.832031 39.851562 C 26.259502 37.546273 26.758246 34.868657 27.050781 33.292969 L 27.050781 33.291016 C 27.174115 32.630598 27.511338 32.037107 28.017578 31.591797 L 32.394531 27.742188 C 33.672083 26.618678 35.315252 26 37.017578 26 z M 46.367188 32.355469 L 48.904297 36.447266 A 1.0001 1.0001 0 0 0 49.396484 36.855469 L 58.308594 40.259766 C 58.721128 40.529445 59 40.969408 59 41.5 C 59 42.340812 58.340812 43 57.5 43 C 57.47423 43 57.40467 42.990102 57.345703 42.982422 L 47.265625 39.255859 A 1.0001 1.0001 0 0 0 47.265625 39.253906 C 47.075546 39.183746 46.909177 39.056708 46.792969 38.890625 L 45.355469 36.837891 L 46.367188 32.355469 z M 33.125 48.345703 C 33.279679 48.610293 33.447202 48.869209 33.632812 49.117188 L 36.574219 53.046875 L 35.005859 57.664062 L 27.697266 68.064453 A 1.0001 1.0001 0 0 0 27.695312 68.066406 A 1.0001 1.0001 0 0 0 27.632812 68.146484 C 27.268223 68.664179 26.681995 69 26 69 C 24.883334 69 24 68.116666 24 67 C 24 66.571915 24.135336 66.184656 24.367188 65.855469 A 1.0001 1.0001 0 0 0 24.181641 64.503906 L 24.919922 65.058594 L 31.296875 55.982422 A 1.0001 1.0001 0 0 0 31.453125 55.630859 L 33.125 48.345703 z M 11 64 A 1 1 0 0 0 10 65 A 1 1 0 0 0 11 66 A 1 1 0 0 0 12 65 A 1 1 0 0 0 11 64 z M 15 64 A 1 1 0 0 0 14 65 A 1 1 0 0 0 15 66 A 1 1 0 0 0 16 65 A 1 1 0 0 0 15 64 z M 19 64 A 1 1 0 0 0 18 65 A 1 1 0 0 0 19 66 A 1 1 0 0 0 20 65 A 1 1 0 0 0 19 64 z M 35 64 A 1 1 0 0 0 34 65 A 1 1 0 0 0 35 66 A 1 1 0 0 0 36 65 A 1 1 0 0 0 35 64 z M 39 64 A 1 1 0 0 0 38 65 A 1 1 0 0 0 39 66 A 1 1 0 0 0 40 65 A 1 1 0 0 0 39 64 z M 43 64 A 1 1 0 0 0 42 65 A 1 1 0 0 0 43 66 A 1 1 0 0 0 44 65 A 1 1 0 0 0 43 64 z M 59 64 A 1 1 0 0 0 58 65 A 1 1 0 0 0 59 66 A 1 1 0 0 0 60 65 A 1 1 0 0 0 59 64 z M 63 64 A 1 1 0 0 0 62 65 A 1 1 0 0 0 63 66 A 1 1 0 0 0 64 65 A 1 1 0 0 0 63 64 z M 67 64 A 1 1 0 0 0 66 65 A 1 1 0 0 0 67 66 A 1 1 0 0 0 68 65 A 1 1 0 0 0 67 64 z'
            />
        </svg>
    );
};

export const SpeakerIcon = ({
    style,
    color = "#fff",
    strokeWidth = 2.5,
}: {
    style: any;
    color?: string;
    strokeWidth?: number;
}) => (
    // <svg
    //     xmlns='http://www.w3.org/2000/svg'
    //     width={32}
    //     height={32}
    //     viewBox='0 0 24 24'
    //     style={style}
    // >
    //     <path
    //         d='M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z'
    //         style={{ fill: color }}
    //     />
    // </svg>
    <svg
        xmlns='http://www.w3.org/2000/svg'
        version='1.0'
        width={24}
        height={24}
        viewBox='0 0 75 75'
        style={style}
    >
        <path
            d='M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z'
            style={{
                stroke: color,
                strokeWidth,
                strokeLinejoin: "round",
                fill: "none",
            }}
        />
        <path
            d='M48,27.6a19.5,19.5 0 0 1 0,21.4M55.1,20.5a30,30 0 0 1 0,35.6M61.6,14a38.8,38.8 0 0 1 0,48.6'
            style={{
                fill: "none",
                stroke: color,
                strokeWidth,
                strokeLinecap: "round",
            }}
        />
    </svg>
);

export const Building = ({
    page,
    openAudioPanel,
    openLookInsidePanel,
    scrollToDetail,
}: {
    page: BuildingPage | LandingPage;
    openAudioPanel: () => void;
    openLookInsidePanel: () => void;
    scrollToDetail: () => void;
}) => {
    const [isZoomed, setIsZoomed] = useState<boolean | undefined>(undefined);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const router = useRouter();
    const onAnimationComplete = useCallback(() => setIsAnimating(false), []);

    // Determine text color based on imageColor
    const isDarkImage =
        page.type === "LandingPage" ||
        (page.type === "BuildingPage" &&
            (page as BuildingPage).imageColor === "dark");
    const textColorClass = isDarkImage ? "text-slate-800" : "text-white";
    const fillColor = isDarkImage ? "#1e293b" : "#fff";

    useEffect(() => {
        setIsZoomed(undefined);
        setIsAnimating(false);
    }, [router.asPath]);

    return (
        <div
            className='relative md:h-[100svh] overflow-hidden md:rounded-xl'
            style={{
                height: (page as any)?.mobileOffset
                    ? `calc(100svh - ${(page as any).mobileOffset}vh)`
                    : "100svh",
            }}
        >
            <Section className='relative'>
                {page.type === "BuildingPage" &&
                page.mainImage &&
                page.zoomInAnimate &&
                page.zoomOutAnimate &&
                page.zoomedIn ? (
                    <ZoomIn
                        base={page.mainImage}
                        animationIn={page.zoomInAnimate}
                        animationOut={page.zoomOutAnimate}
                        zoomed={page.zoomedIn}
                        isZoomed={isZoomed}
                        onAnimationComplete={onAnimationComplete}
                        mobileOffset={(page as any)?.mobileOffset}
                    />
                ) : (
                    <FakeZoomIn
                        base={page.mainImage}
                        zoomTransformCss={
                            (page as BuildingPage)?.zoomTransformCss
                        }
                        alt={page.title}
                        isZoomed={isZoomed}
                        onAnimationComplete={onAnimationComplete}
                        mobileOffset={(page as any)?.mobileOffset}
                    />
                )}

                <div
                    className={clsx(
                        `absolute top-0 left-0 flex flex-col items-center justify-center w-[100%] ${textColorClass}`,
                        page.type === "LandingPage" ? "pt-8" : "pt-4"
                    )}
                >
                    <h1
                        className={clsx(
                            "text-3xl",
                            page.type === "LandingPage" &&
                                "uppercase tracking-wider"
                        )}
                    >
                        {page.title}
                    </h1>
                    {page.type === "LandingPage" && (
                        <h2 className='text-xl mt-2'>{page.subtitle}</h2>
                    )}

                    <div
                        className={`flex mt-2 ${
                            isDarkImage
                                ? "[&_path]:fill-gray-900 [&_polygon]:fill-gray-900"
                                : "[&_path]:fill-white [&_polygon]:fill-white"
                        }`}
                    >
                        {page.type === "LandingPage" && (
                            <>
                                <Button
                                    onClick={openAudioPanel}
                                    className='flex items-center'
                                >
                                    <SpeakerIcon
                                        style={{
                                            fill: "currentColor",
                                            width: "19px",
                                            height: "19px",
                                            marginRight: "6px",
                                        }}
                                        color={"#1e293b"}
                                    />
                                    Audio Tour
                                </Button>
                                <Button
                                    className='pr-3'
                                    onClick={() => {
                                        router.push(
                                            `/explore/${page.nextBuildingSlug?.current}`
                                        );
                                    }}
                                >
                                    <span className='flex justify-center items-center'>
                                        <span className='mr-1'>Explore</span>
                                        <ExploreIcon
                                            style={{
                                                fill: "currentColor",
                                                width: "24px",
                                                height: "24px",
                                            }}
                                        />
                                    </span>
                                </Button>
                            </>
                        )}

                        {page.type === "BuildingPage" && (
                            <>
                                <button
                                    className={clsx(
                                        "mr-1",
                                        !page.audio && "opacity-50"
                                    )}
                                    onClick={openAudioPanel}
                                >
                                    <SpeakerIcon
                                        style={{
                                            width: "32px",
                                            height: "32px",
                                        }}
                                        strokeWidth={5}
                                        color={fillColor}
                                    />
                                </button>
                                <Button
                                    isInverted={isDarkImage}
                                    onClick={openLookInsidePanel}
                                >
                                    Look inside
                                </Button>
                                <button
                                    className={"ml-1"}
                                    onClick={() => {
                                        if (!isAnimating) {
                                            setIsZoomed(
                                                (isZoomed) => !isZoomed
                                            );
                                            setIsAnimating(true);
                                        }
                                    }}
                                >
                                    <ZoomInIcon
                                        style={{
                                            width: "32px",
                                            height: "32px",
                                            strokeWidth: 3,
                                        }}
                                    />
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <div
                    className={clsx(
                        "absolute bottom-0 left-0 flex flex-1 justify-between items-center pt-16 pb-12 px-4 w-[100%] md:hidden",
                        {
                            // Increased top padding and negative margin

                            "bg-gradient-to-t from-slate-300 pt-32 -mt-16":
                                // Too lazy to backfill all these or also rename this variable
                                (page as any).shouldShowGradient ===
                                    undefined ||
                                (page as any).shouldShowGradient === true,

                            "bg-transparent":
                                (page as any).shouldShowGradient === false,
                        }
                    )}
                >
                    <div
                        tabIndex={0}
                        role='button'
                        className={clsx(
                            `flex flex-col mt-4 justify-center items-center w-20`,
                            page.previousBuildingSlug
                                ? "cursor-pointer"
                                : "opacity-50"
                        )}
                        onClick={() => {
                            if (page.previousBuildingSlug) {
                                router.push(
                                    `/explore/${page.previousBuildingSlug.current}`
                                );
                            }
                        }}
                    >
                        <div>
                            <ArrowLeftIcon style={{ fill: fillColor }} />
                        </div>
                        <div className={`my-1 ${textColorClass}`}>Previous</div>
                    </div>
                    <div
                        tabIndex={0}
                        role='button'
                        className='flex flex-col mt-4 justify-center items-center w-20'
                        onClick={scrollToDetail}
                    >
                        <div>
                            <ChevronDownIcon style={{ fill: fillColor }} />
                        </div>
                        <div className={`my-1 ${textColorClass}`}>
                            Read more
                        </div>
                    </div>
                    <div
                        tabIndex={0}
                        role='button'
                        className={clsx(
                            "flex flex-col mt-4 justify-center items-center w-20",
                            {
                                "cursor-pointer": page.nextBuildingSlug,
                                "opacity-50": !page.nextBuildingSlug,
                            }
                        )}
                        onClick={() => {
                            if (page.nextBuildingSlug) {
                                router.push(
                                    `/explore/${page.nextBuildingSlug.current}`
                                );
                            }
                        }}
                    >
                        <div>
                            <ArrowRightIcon style={{ fill: fillColor }} />
                        </div>
                        <div className={`my-1 ${textColorClass}`}>Next</div>
                    </div>
                </div>
            </Section>
            <Marquee className='absolute bottom-0 md:hidden' />
        </div>
    );
};
