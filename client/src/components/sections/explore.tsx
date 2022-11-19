import clsx from "clsx";
import { Map } from "components/map";
import { Marquee } from "components/ui/marquee";
import { Section } from "components/ui/section";
import { imageUrlFor } from "helpers/urlFor";
import React from "react";
import { BuildingPage } from "types";

export const Explore = React.forwardRef<
    HTMLDivElement,
    { isExplore: boolean; page: BuildingPage; className?: string }
>(({ className, isExplore, page }, ref) => {
    return (
        <>
            <Section className={clsx("text-slate-700", className)} ref={ref}>
                <div className='relative flex justify-center flex-1'>
                    <div className='z-10 absolute w-screen bg-gradient-to-b from-white h-48 md:hidden'></div>
                    <div className='z-100 absolute flex flex-col z-10 justify-center align-center px-16 md:hidden'>
                        <h2 className='text-xl font-bold pt-8 pb-2 text-center'>
                            Explore
                        </h2>

                        <div className='mt-2 mb-8 text-center'>
                            Touch a highlighted building to discover more.
                        </div>
                    </div>

                    <Map src={imageUrlFor(page.map)} />
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
