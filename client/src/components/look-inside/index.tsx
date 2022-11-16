/* eslint-disable @next/next/no-img-element */
import { ReactComponent as ArrowLeftIcon } from "../../assets/icons/arrow--left.svg";
import { ReactComponent as ArrowRightIcon } from "../../assets/icons/arrow--right.svg";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import { imageUrlFor } from "../../helpers/urlFor";
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
                "fixed bottom-0 left-0 w-[100%] bg-white py-2 flex flex-col rounded-t-lg transition-transform duration-300 shadow-xl z-50 h-[82vh]",
                isShowing
                    ? "translate-y-0 md:sticky"
                    : "translate-y-full md:hidden"
            )}
            style={{
                boxShadow:
                    "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 -8px 18px -6px rgb(0 0 0 / 0.1)",
            }}
        >
            <div className='relative flex-1 pt-2 pb-2 h-[82vh] min-h-[82vh]'>
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
                <div className='flex items-center justify-center py-4 max-h-[50%] my-4 overflow-hidden'>
                    <img
                        className='w-[100%]'
                        alt={title}
                        src={imageUrlFor(image)}
                    />
                </div>
                <div className='flex flex-col'>
                    <h4 className='font-bold text-l px-8'>{title}</h4>
                    <div className='px-8'>{description}</div>
                </div>

                <div className='absolute bottom-4 left-0 flex px-8 w-[100%]'>
                    {lookInside[index - 1] && (
                        <Button
                            isInverted
                            isSmall
                            onClick={() =>
                                setIndex((index) => Math.max(index - 1, 0))
                            }
                        >
                            <ArrowLeftIcon
                                style={{
                                    fill: "#FFF",
                                    width: "16px",
                                    height: "16px",
                                }}
                            />
                        </Button>
                    )}

                    <div className='flex-1' />

                    {lookInside[index + 1] && (
                        <Button
                            isInverted
                            isSmall
                            onClick={() =>
                                setIndex((index) =>
                                    Math.min(index + 1, lookInside.length)
                                )
                            }
                        >
                            <ArrowRightIcon
                                style={{
                                    fill: "#FFF",
                                    width: "16px",
                                    height: "16px",
                                }}
                            />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
