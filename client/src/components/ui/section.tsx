import React from "react";

export const Section = ({ children }: { children: React.ReactNode }) => {
    return (
        <section className='flex h-screen w-screen bg-slate-300 pb-16 text-white'>
            {children}
        </section>
    );
};
