/* eslint-disable @next/next/no-img-element */
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import { audioUrlFor, getImageProps } from "../../helpers/urlFor";
import clsx from "clsx";
import { useEffect, useMemo, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { BasePage } from "types";

const contributorStyle = (contributor: any) => {
    // lmao
    if (contributor.name === "Mark Houser") {
        return {
            transform: "scale(1.35) translate(0, 4px)",
        };
    }

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
    const hasShownRef = useRef(false);
    const audioRef = useRef<AudioPlayer>(null);

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
        if (isShowing) {
            audioRef.current?.audio.current?.play();
        }
    }, [isShowing]);

    if (!page.audioFileName && !contributors.length) {
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
                    <div className='font-bold text-base'>
                        {page.audioFileName ?? page.title}
                    </div>
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
                    {contributors.length ? (
                        <div className='ml-auto relative w-[64px] height-[55px]'>
                            {contributors.map((contributor, index) => (
                                <div
                                    key={contributor.name}
                                    className={clsx(
                                        "absolute mt-2 mr-1 w-10 h-10 overflow-hidden flex align-center justify-center rounded-[50%] top-[-4px]",
                                        !index ? `z-${10} left-[32px]` : ""
                                    )}
                                >
                                    <img
                                        className='absolute top-0 bottom-0 m-auto h-[100%]'
                                        alt='thumbnail'
                                        {...getImageProps(contributor.image)}
                                        style={contributorStyle(contributor)}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='ml-auto relative mt-2 mr-1 w-10 overflow-hidden flex align-center justify-center rounded-[50%]'>
                            <img
                                className='absolute top-0 bottom-0 m-auto h-[100%]'
                                alt='thumbnail'
                                {...getImageProps(contributors[0].image)}
                                style={contributorStyle(contributors[0])}
                            />
                        </div>
                    )}
                </div>
            </div>

            <AudioPlayer
                ref={audioRef}
                src={audioUrlFor(page.audio.asset._ref)}
                showJumpControls={false}
            />
        </div>
    );
};
