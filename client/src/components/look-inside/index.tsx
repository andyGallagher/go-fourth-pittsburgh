/* eslint-disable @next/next/no-img-element */
import { ReactComponent as ArrowLeftIcon } from "../../assets/icons/arrow--left.svg";
import { ReactComponent as ArrowRightIcon } from "../../assets/icons/arrow--right.svg";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import { getImageProps } from "../../helpers/urlFor";
import clsx from "clsx";
import { Button } from "components/ui/button";
import { useState } from "react";
import { BuildingPage } from "types";

export const LookInside = ({
    isShowing,
    close,
    lookInside,
}: {
    isShowing: boolean;
    close: () => void;
    lookInside: BuildingPage["lookInside"];
}) => {
    const [index, setIndex] = useState(0);
    const { image, title, description } = lookInside[index];

    return (
        <div
            className={clsx(
                "fixed bottom-0 left-0 w-[100%] bg-white pt-2 pb-2 flex flex-col rounded-t-lg transition-transform duration-300 shadow-xl z-50 h-[82vh] md:h-auto md:w-[400px] md:bottom-16 md:mx-auto",
                isShowing
                    ? "translate-y-0 md:sticky"
                    : "translate-y-full md:hidden"
            )}
            style={{
                boxShadow:
                    "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 -8px 18px -6px rgb(0 0 0 / 0.1)",
            }}
        >
            <div className='flex flex-col relative flex-1 pt-2 pb-2 h-[82vh] min-h-[82vh]'>
                <button
                    className='ml-auto px-4 [&_polygon]:fill-slate-600 flex'
                    onClick={close}
                >
                    <CloseIcon
                        style={{
                            width: "32px",
                            height: "32px",
                        }}
                    />
                </button>
                <div className='relative flex items-center justify-center py-4 max-h-[60%] min-h-[60%] my-4 overflow-hidden'>
                    <img
                        className='w-[100%]'
                        alt={title}
                        {...getImageProps(image)}
                    />
                </div>
                <div className='flex flex-col'>
                    <h4 className='font-bold text-l px-8'>{title}</h4>
                    <div className='px-8'>{description}</div>
                </div>

                <div className='mt-auto flex px-8 pb-8 w-[100%] md:pb-0'>
                    {lookInside[index - 1] && (
                        <Button
                            isInverted
                            isSmall
                            onClick={(e) => {
                                e.preventDefault();
                                setIndex((index) => Math.max(index - 1, 0));
                            }}
                        >
                            <ArrowLeftIcon
                                style={{
                                    fill: "#FFF",
                                    width: "24px",
                                    height: "24px",
                                }}
                            />
                        </Button>
                    )}

                    <div className='flex-1' />

                    {lookInside[index + 1] && (
                        <Button
                            isInverted
                            isSmall
                            onClick={(e) => {
                                e.preventDefault();
                                setIndex((index) =>
                                    Math.min(index + 1, lookInside.length)
                                );
                            }}
                        >
                            <ArrowRightIcon
                                style={{
                                    fill: "#FFF",
                                    width: "24px",
                                    height: "24px",
                                }}
                            />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
