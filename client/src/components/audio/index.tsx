import clsx from "clsx";
import Image from "next/image";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export const Audio = ({
    src,
    isPlayingAudio,
}: {
    src: string;
    isPlayingAudio: boolean;
}) => {
    return (
        <div
            className={clsx(
                "fixed bottom-0 left-0 w-[100%] bg-white py-2 px-4 flex flex-col rounded-lg transition-transform shadow-xl",
                isPlayingAudio ? "translate-y-0" : "translate-y-full"
            )}
        >
            <div className='flex flex-row px-2 py-2'>
                <div className='relative w-12 h-12 overflow-hidden flex align-center justify-center rounded-sm'>
                    <Image
                        alt='thumbnail'
                        src='/images/brazer.jpg'
                        width={902}
                        height={1094}
                    />
                </div>

                <div className='ml-4 flex flex-col'>
                    <div className='font-bold text-base'>
                        Benedum-Trees Bldg
                    </div>
                    <div className='text-sm'>words by Mark Houser</div>
                </div>
            </div>
            <AudioPlayer src={src} showJumpControls={false} />
        </div>
    );
};
