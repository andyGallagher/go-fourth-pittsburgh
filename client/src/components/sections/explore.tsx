import clsx from "clsx";
import { Map } from "components/map";
import { Marquee } from "components/ui/marquee";
import { Section } from "components/ui/section";
import { imageUrlFor } from "helpers/urlFor";
import React from "react";
import { BuildingPage } from "types";

export const Explore = React.forwardRef<
    HTMLDivElement,
    { isExplore: boolean; page: BuildingPage }
>(({ isExplore, page }, ref) => {
    return (
        <>
            <Section className={clsx("text-slate-700")} ref={ref}>
                <div className='relative flex justify-center'>
                    <div className='absolute w-screen bg-gradient-to-t from-slate-300 h32'></div>
                    <div className='z-2 absolute flex flex-col z-10 justify-center align-center px-16'>
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
                <div className='relative w-screen overflow-hidden flex flex-col'>
                    <Marquee />
                </div>
            )}
        </>
    );
});
Explore.displayName = "Explore";
