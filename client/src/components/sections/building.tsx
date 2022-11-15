/* eslint-disable @next/next/no-img-element */
import { ReactComponent as ChevronDownIcon } from "../../assets/icons/chevron--down.svg";
import { ReactComponent as PlayFilledIcon } from "../../assets/icons/play--filled.svg";
import { ReactComponent as ZoomInIcon } from "../../assets/icons/zoom--in.svg";
import clsx from "clsx";
import { Button } from "components/ui/button";
import { Marquee } from "components/ui/marquee";
import { Section } from "components/ui/section";
import { ZoomIn } from "components/ui/zoom-in";
import { imageUrlFor } from "helpers/urlFor";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { use100vh } from "react-div-100vh";
import { BasePage, BuildingPage, LandingPage } from "types";

const useHundo = () => {
    const [hundo, setHundo] = useState<number | null>(null);
    const fakeHundo = use100vh();

    useEffect(() => {
        setHundo((hundo) => {
            if (!hundo) {
                return fakeHundo;
            }

            return hundo;
        });
    }, [fakeHundo]);

    return { hundo };
};

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
    const { hundo } = useHundo();
    const [isZoomed, setIsZoomed] = useState<boolean | undefined>(undefined);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const router = useRouter();
    const onAnimationComplete = useCallback(() => setIsAnimating(false), []);

    useEffect(() => {
        setIsZoomed(false);
    }, [router.asPath]);

    return (
        <div
            className='relative'
            style={{
                height: hundo ?? "100vh",
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
                        base={imageUrlFor(page.mainImage)}
                        animationIn={imageUrlFor(page.zoomInAnimate)}
                        animationOut={imageUrlFor(page.zoomOutAnimate)}
                        zoomed={imageUrlFor(page.zoomedIn)}
                        isZoomed={isZoomed}
                        onAnimationComplete={onAnimationComplete}
                    />
                ) : (
                    <img alt={page.title} src={imageUrlFor(page.mainImage)} />
                )}

                <div className='absolute top-0 left-0 w-screen flex flex-col items-center justify-center pt-16 '>
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
                                        window.scrollTo(0, 0);
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
                                    className='mr-1'
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
                                    className='ml-1'
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

                <div className='absolute bottom-0 left-0 w-screen flex flex-col items-center justify-center py-16 bg-gradient-to-t from-slate-300'>
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
            <Marquee className='absolute bottom-0' />
        </div>
    );
};
