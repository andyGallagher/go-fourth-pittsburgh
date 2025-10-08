/* eslint-disable @next/next/no-img-element */
import { ReactComponent as ArrowLeftIcon } from "../../assets/icons/arrow--left.svg";
import { ReactComponent as ArrowRightIcon } from "../../assets/icons/arrow--right.svg";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import { audioUrlFor, getImageProps } from "../../helpers/urlFor";
import { Button } from "../ui/button";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { BasePage } from "types";

const contributorStyle = (contributor: any) => {
    return {};
};

export const Audio = ({
    page,
    isShowing,
    close,
}: {
    page: BasePage;
    isShowing: boolean;
    close: () => void;
}) => {
    const router = useRouter();

    const hasShownRef = useRef(false);
    const audioRef = useRef<AudioPlayer>(null);

    const audioFileName = page.audioFileName || page.title;

    const contributors = useMemo(() => {
        if (!page.audioContributor) {
            return [];
        }

        const contributorMap = page.contributors.reduce<
            Record<string, BasePage["contributors"][number]>
        >((acc, next) => ({ ...acc, [next._id]: next }), {});

        return page.audioContributor
            .map((contributor) => contributorMap[contributor._ref])
            .filter(Boolean)
            .sort((a, b) => b.name.localeCompare(a.name));
    }, [page]);

    useEffect(() => {
        if (isShowing) {
            hasShownRef.current = true;
        }

        if (!isShowing && hasShownRef.current) {
            audioRef.current?.audio.current?.pause();
        }
    }, [isShowing]);

    useEffect(() => {
        if (isShowing && !hasShownRef.current) {
            audioRef.current?.audio.current?.play();
        }
    }, [isShowing]);

    if (!audioFileName && !contributors.length) {
        return null;
    }

    return (
        <div
            className={clsx(
                "fixed bottom-0 left-0 w-[100%] bg-white py-2 px-4 flex flex-col rounded-t-lg transition-transform z-50 md:bottom-[2rem] md:max-w-[400px] md:mx-auto",
                isShowing
                    ? "translate-y-0 md:sticky"
                    : "translate-y-full md:hidden"
            )}
            style={{
                zIndex: 200,
                boxShadow:
                    "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 -8px 18px -6px rgb(0 0 0 / 0.1)",
            }}
        >
            <div className='flex flex-row px-2 py-2'>
                <div className='relative w-12 h-12 overflow-hidden flex align-center justify-center rounded-sm m-auto'>
                    <img
                        className='absolute top-0 bottom-0 m-auto w-[48px]'
                        alt='thumbnail'
                        {...getImageProps(page.mainImage)}
                    />
                </div>

                <div className='ml-4 flex flex-col flex-1 min-h-[68px]'>
                    <div className='font-bold text-base'>{audioFileName}</div>
                    <div className='text-sm'>
                        {contributors.map(({ name }) => name).join(" & ")}
                    </div>
                </div>

                <div>
                    <button
                        className='ml-auto [&_polygon]:fill-slate-600 flex mt-[-2px] mr-[-6px]'
                        onClick={close}
                    >
                        <CloseIcon
                            style={{
                                width: "32px",
                                height: "32px",
                            }}
                        />
                    </button>
                    {(() => {
                        if (!contributors.length) return null;
                        if (contributors.length > 1) {
                            return (
                                <div className='ml-auto relative w-[64px] height-[55px]'>
                                    {contributors.map((contributor, index) => (
                                        <div
                                            key={contributor.name}
                                            className={clsx(
                                                "absolute mt-2 mr-1 w-10 h-10 overflow-hidden flex align-center justify-center rounded-[50%] top-[-4px]",
                                                !index
                                                    ? `z-${10} left-[32px]`
                                                    : ""
                                            )}
                                        >
                                            <img
                                                className='absolute top-0 bottom-0 m-auto h-[100%]'
                                                alt='thumbnail'
                                                {...getImageProps(
                                                    contributor.image
                                                )}
                                                style={contributorStyle(
                                                    contributor
                                                )}
                                            />
                                        </div>
                                    ))}
                                </div>
                            );
                        }

                        return (
                            <div className='ml-auto relative mt-2 mr-1 w-10 overflow-hidden flex align-center justify-center rounded-[50%]'>
                                <img
                                    className='absolute top-0 bottom-0 m-auto h-[100%]'
                                    alt='thumbnail'
                                    {...getImageProps(contributors[0].image)}
                                    style={contributorStyle(contributors[0])}
                                />
                            </div>
                        );
                    })()}
                </div>
            </div>

            {page.audio?.asset._ref && (
                <AudioPlayer
                    ref={audioRef}
                    src={audioUrlFor(page.audio.asset._ref)}
                    showJumpControls={false}
                />
            )}
            <div className='flex mt-6 pt-2 border-t-2 border-slate-300 justify-between'>
                {page.previousBuildingSlug?.current && (
                    <Button
                        className='flex items-center bg-slate-300'
                        isSmall
                        onClick={(e) => {
                            e.preventDefault();
                            router.push(
                                `/explore/${page.previousBuildingSlug!.current}`
                            );
                        }}
                    >
                        <ArrowLeftIcon
                            style={{
                                fill: "rgb(30, 41, 59)",
                                width: "16px",
                                height: "16px",
                            }}
                        />
                        <span className='ml-1'>Previous</span>
                    </Button>
                )}

                {page.nextBuildingSlug?.current && (
                    <Button
                        className='flex items-center bg-slate-300'
                        isSmall
                        onClick={(e) => {
                            e.preventDefault();
                            router.push(
                                `/explore/${page.nextBuildingSlug!.current}`
                            );
                        }}
                        style={{ marginLeft: "auto" }}
                    >
                        <span className='mr-1'>Next</span>
                        <ArrowRightIcon
                            style={{
                                fill: "rgb(30, 41, 59)",
                                width: "16px",
                                height: "16px",
                            }}
                        />
                    </Button>
                )}
            </div>
        </div>
    );
};
