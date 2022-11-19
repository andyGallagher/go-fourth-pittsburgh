import React from "react";

export const Viewports = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex justify-center md:p-16'>
            <div className='bg-white'>{children}</div>
        </div>
    );
};
