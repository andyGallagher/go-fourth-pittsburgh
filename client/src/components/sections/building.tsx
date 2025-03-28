/* eslint-disable @next/next/no-img-element */
import { ReactComponent as ChevronDownIcon } from "../../assets/icons/chevron--down.svg";
import { ReactComponent as PlayFilledIcon } from "../../assets/icons/play--filled.svg";
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

    useEffect(() => {
        setIsZoomed(undefined);
        setIsAnimating(false);
    }, [router.asPath]);

    return (
        <div
            className='relative'
            style={{
                height: "100svh",
                overflow: "hidden",
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
                    />
                ) : (
                    <FakeZoomIn
                        base={page.mainImage}
                        alt={page.title}
                        isZoomed={isZoomed}
                        onAnimationComplete={onAnimationComplete}
                    />
                )}

                <div className='text-white absolute top-0 left-0 flex flex-col items-center justify-center pt-16 w-[100%]'>
                    <h1
                        className={clsx(
                            "text-3xl pb-1 border-b-[1px]",
                            page.type === "LandingPage" &&
                                "uppercase tracking-wider"
                        )}
                    >
                        {page.title}
                    </h1>
                    {page.type === "LandingPage" && (
                        <h2 className='text-xl mt-2'>{page.subtitle}</h2>
                    )}

                    <div className='flex mt-4 [&_path]:fill-white [&_polygon]:fill-white'>
                        {page.type === "LandingPage" && (
                            <>
                                <Button onClick={openAudioPanel}>
                                    Play audio
                                </Button>
                                <Button
                                    onClick={() => {
                                        router.push(
                                            `/explore/${page.nextBuildingSlug?.current}`
                                        );
                                    }}
                                >
                                    Explore
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
                                    <PlayFilledIcon
                                        style={{
                                            width: "32px",
                                            height: "32px",
                                        }}
                                    />
                                </button>
                                <Button onClick={openLookInsidePanel}>
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
                                        }}
                                    />
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <div className='absolute bottom-0 left-0 flex flex-1 flex-col items-center justify-center py-16 bg-gradient-to-t from-slate-300 w-[100%] md:hidden'>
                    <div
                        tabIndex={0}
                        role='button'
                        className='flex flex-col mt-4 justify-center items-center'
                        onClick={scrollToDetail}
                    >
                        <div>
                            <ChevronDownIcon style={{ fill: "#fff" }} />
                        </div>
                        <div className='my-1 text-white'>Read more</div>
                    </div>
                </div>
            </Section>
            <Marquee className='absolute bottom-0 md:hidden' />
        </div>
    );
};
