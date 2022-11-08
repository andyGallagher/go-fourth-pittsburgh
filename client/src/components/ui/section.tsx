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
                "flex h-screen w-screen bg-slate-200 pb-16 text-white",
                className
            )}
        >
            {children}
        </section>
    );
});
Section.displayName = "Section";
