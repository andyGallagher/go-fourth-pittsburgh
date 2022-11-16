import React from "react";

export const MobileWarning = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex justify-center md:bg-slate-100 md:p-16'>
            <div className='bg-white md:max-w-[400px] md:shadow-lg md:border-2 md:border-gray-300'>
                <div className='hidden md:flex bg-yellow-50 text-slate-500 justify-center text-center p-8 border-b-2 border-yellow-100 tracking-wide uppercase text-sm font-extralight'>
                    GoFourthPittsburgh.org is currently only optimized for
                    mobile devices.
                </div>

                {children}

                <div className='hidden md:flex bg-yellow-50 text-slate-500 justify-center text-center p-8 border-t-2 border-yellow-100 tracking-wide uppercase text-sm font-extralight'>
                    GoFourthPittsburgh.org is currently only optimized for
                    mobile devices.
                </div>
            </div>
        </div>
    );
};
