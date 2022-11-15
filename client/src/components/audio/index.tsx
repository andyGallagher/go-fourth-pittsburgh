/* eslint-disable @next/next/no-img-element */
import { audioUrlFor, imageUrlFor } from "../../helpers/urlFor";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { BasePage } from "types";

export const Audio = ({
    page,
    isShowing,
}: {
    page: BasePage;
    isShowing: boolean;
}) => {
    const hasShownRef = useRef(false);
    const audioRef = useRef<AudioPlayer>(null);

    const contributorMap = page.contributors.reduce<
        Record<string, BasePage["contributors"][number]>
    >((acc, next) => ({ ...acc, [next._id]: next }), {});
    const contributors = page.audioContributor
        .map((contributor) => contributorMap[contributor._ref])
        .filter(Boolean);

    useEffect(() => {
        if (isShowing) {
            hasShownRef.current = true;
        }

        if (!isShowing && hasShownRef.current) {
            audioRef.current?.audio.current?.pause();
        }
    }, [isShowing]);

    return (
        <div
            className={clsx(
                "fixed bottom-0 left-0 w-[100%] bg-white py-2 px-4 flex flex-col rounded-lg transition-transform shadow-xl z-50",
                isShowing ? "translate-y-0" : "translate-y-full"
            )}
        >
            <div className='flex flex-row px-2 py-2'>
                <div className='relative w-12 h-12 overflow-hidden flex align-center justify-center rounded-sm'>
                    <img
                        className='absolute top-0 bottom-0 m-auto w-[48px]'
                        alt='thumbnail'
                        src={imageUrlFor(page.mainImage)}
                    />
                </div>

                <div className='ml-4 flex flex-col'>
                    <div className='font-bold text-base'>{page.title}</div>
                    <div className='text-sm'>
                        words by {contributors[0].name}
                    </div>
                </div>

                <div className='ml-auto relative mt-2 mr-1 w-10 h-10 overflow-hidden flex align-center justify-center rounded-[50%]'>
                    <img
                        className='absolute top-0 bottom-0 m-auto w-[48px]'
                        alt='thumbnail'
                        src={imageUrlFor(page.contributors[0].image)}
                    />
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
