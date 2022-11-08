import React from "react";

export const Portrait = ({
    children,
    subtitle,
}: {
    children: React.ReactNode;
    subtitle: string;
}) => {
    return (
        <div className='flex flex-1 relative mx-2 first:ml-0 last:mr-0 w-32 h-52'>
            <div className='flex flex-col flex-1'>
                <div className='flex-1 overflow-hidden rounded-xl'>
                    {children}
                </div>

                <div className='mt-2 text-center'>{subtitle}</div>
            </div>
        </div>
    );
};
