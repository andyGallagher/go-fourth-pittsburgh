import clsx from "clsx";
import Image from "next/image";
import React from "react";

export const Marquee = ({ className }: { className?: string }) => {
    return (
        <div className={clsx("flex overflow-x-hidden", className)}>
            <div className='animate-marquee'>
                <Image
                    alt=''
                    src='/images/ticker-tape.jpg'
                    height={146}
                    width={1753}
                />
            </div>

            <div className='absolute top-0 animate-marquee2'>
                <Image
                    alt=''
                    src='/images/ticker-tape.jpg'
                    height={146}
                    width={1753}
                />{" "}
            </div>
        </div>
    );
};
