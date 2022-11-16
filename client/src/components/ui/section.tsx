import clsx from "clsx";
import React from "react";

export const Section = React.forwardRef<
    HTMLDivElement,
    {
        children: React.ReactNode;
        className?: string;
        isHundo?: boolean;
    }
>(({ children, className, isHundo = true }, ref) => {
    return (
        <section
            ref={ref}
            className={clsx(
                "flex text-slate-600",
                isHundo && "h-[100%]",
                className
            )}
        >
            {children}
        </section>
    );
});
Section.displayName = "Section";
