import clsx from "clsx";
import { Map } from "components/map";
import { Marquee } from "components/ui/marquee";
import { Section } from "components/ui/section";
import React, { useCallback, useEffect, useState } from "react";
import { BuildingPage } from "types";

export const Explore = React.forwardRef<
    HTMLDivElement,
    { isExplore: boolean; page: BuildingPage; className?: string }
>(({ className, isExplore, page }, ref) => {
    const [hasInteracted, setHasInteracted] = useState(false);
    const [isTimerElapsed, setIsTimerElapsed] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTimerElapsed(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const interact = useCallback(() => {
        if (isTimerElapsed) {
            setHasInteracted(true);
        }
    }, [isTimerElapsed]);

    return (
        <>
            <Section className={clsx("text-slate-700", className)} ref={ref}>
                <div className='relative flex justify-center flex-1'>
                    <div
                        className={clsx(
                            "z-10 absolute w-screen bg-gradient-to-b from-white h-48 md:hidden transition-opacity duration-200",
                            { "opacity-0": hasInteracted }
                        )}
                    ></div>
                    <div
                        className={clsx(
                            "z-100 absolute flex flex-col z-10 justify-center align-center px-16 md:hidden transition-opacity duration-200",
                            { "opacity-0": hasInteracted }
                        )}
                    >
                        <h2 className='text-xl font-bold pt-8 pb-2 text-center'>
                            Explore
                        </h2>

                        <div className='mt-2 mb-8 text-center'>
                            Touch a highlighted building to discover more.
                        </div>
                    </div>

                    <Map
                        currentSlug={page.slug.current}
                        interact={interact}
                        horizontalSrc={page.map}
                        verticalSrc={page.rotatedMap}
                    />
                </div>
            </Section>
            {isExplore && (
                <div className='relative flex-1 overflow-hidden flex flex-col md:hidden'>
                    <Marquee />
                </div>
            )}
        </>
    );
});

Explore.displayName = "Explore";
