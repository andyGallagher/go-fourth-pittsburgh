import clsx from "clsx";
import React from "react";

export const Section = React.forwardRef<
    HTMLDivElement,
    {
        children: React.ReactNode;
        className?: string;
    }
>(({ children, className }, ref) => {
    return (
        <section
            ref={ref}
            className={clsx(
                "flex w-screen bg-slate-200 text-white h-[100%]",
                className
            )}
        >
            {children}
        </section>
    );
});
Section.displayName = "Section";
