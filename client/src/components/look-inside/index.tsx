/* eslint-disable @next/next/no-img-element */
import { ReactComponent as ArrowLeftIcon } from "../../assets/icons/arrow--left.svg";
import { ReactComponent as ArrowRightIcon } from "../../assets/icons/arrow--right.svg";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import { imageUrlFor } from "../../helpers/urlFor";
import clsx from "clsx";
import { Button } from "components/ui/button";
import { useEffect, useState } from "react";
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

    useEffect(() => {
        setIndex(0);
    }, [isShowing]);

    return (
        <div
            className={clsx(
                "fixed bottom-0 left-0 w-[100%] bg-white py-2 px-4 flex flex-col rounded-lg transition-transform duration-300 shadow-xl z-50 h-[75vh]",
                isShowing ? "translate-y-0" : "translate-y-full"
            )}
        >
            <div className='relative flex-1 flex flex-col px-2 pt-6 pb-2'>
                <button
                    className='absolute top-0 right-0 [&_polygon]:fill-slate-600 flex'
                    onClick={close}
                >
                    <CloseIcon
                        style={{
                            width: "32px",
                            height: "32px",
                        }}
                    />
                </button>
                <div className='flex items-center justify-center p-4'>
                    <img
                        className='max-h-[30vh]'
                        alt={title}
                        src={imageUrlFor(image)}
                    />
                </div>
                <h4 className='font-bold text-l'>{title}</h4>
                <div>{description}</div>

                <div className='mt-auto flex'>
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
