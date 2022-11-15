import clsx from "clsx";
import React, { HTMLAttributes } from "react";

export const Button = ({
    className,
    isSmall,
    isInverted,
    ...props
}: {
    isSmall?: boolean;
    isInverted?: boolean;
    className?: string;
} & HTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            className={clsx(
                "mx-2 first:ml-0 last:mr-0  px-4 py-1 rounded-xl my-2",
                isInverted
                    ? "bg-slate-800 text-white"
                    : "text-slate-800 bg-white",
                isSmall ? "min-w-fit" : "min-w-[120px]",
                className
            )}
            {...props}
        >
            {props.children}
        </button>
    );
};
