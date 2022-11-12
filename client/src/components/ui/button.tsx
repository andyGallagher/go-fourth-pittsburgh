import React, { HTMLAttributes } from "react";

export const Button = (props: HTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            className='mx-2 first:ml-0 last:mr-0 bg-white px-4 py-1 rounded-xl text-slate-800 min-w-[120px]'
            {...props}
        >
            {props.children}
        </button>
    );
};
