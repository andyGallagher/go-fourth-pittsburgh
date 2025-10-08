/* eslint-disable @next/next/no-img-element */
import { getImageProps } from "../../helpers/urlFor";
import clsx from "clsx";
import { BasePage } from "types";

const SpeakerIcon = ({
    style,
    color = "#1e293b",
    strokeWidth = 2.5,
}: {
    style: any;
    color?: string;
    strokeWidth?: number;
}) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        version='1.0'
        width={20}
        height={20}
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

export const FloatingAudioButton = ({
    page,
    isVisible,
    onClick,
}: {
    page: BasePage;
    isVisible: boolean;
    onClick: () => void;
}) => {
    if (!isVisible) return null;

    return (
        <button
            className={clsx(
                "fixed bottom-4 right-4 bg-white rounded-full border border-blue-200 p-4 transition-all duration-300 z-50 flex items-center justify-center",
                "hover:scale-105 active:scale-95",
                "block md:hidden"
            )}
            onClick={onClick}
            style={{
                zIndex: 200,
                boxShadow:
                    "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 -8px 18px -6px rgb(0 0 0 / 0.1)",
            }}
        >
            <div className='flex items-center justify-center'>
                <SpeakerIcon
                    style={{
                        width: "32px",
                        height: "32px",
                    }}
                    color='#1e293b'
                />
            </div>
        </button>
    );
};
