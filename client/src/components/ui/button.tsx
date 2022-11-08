import React from "react";

export const Button = ({ children }: { children: React.ReactNode }) => {
    return (
        <button className='br-16 mx-2 first:ml-0 last:mr-0 bg-white px-4 py-1 rounded-xl text-slate-800 min-w-[120px]'>
            {children}
        </button>
    );
};
