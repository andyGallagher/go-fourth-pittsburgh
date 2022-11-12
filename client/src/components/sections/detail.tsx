import { Portrait } from "components/ui/portrait";
import { Section } from "components/ui/section";
import Image from "next/image";
import React from "react";

export const Detail = React.forwardRef<HTMLDivElement, {}>((props, ref) => {
    return (
        <Section
            className='text-slate-600 py-16 bg-gradient-to-b from-slate-300 to-white'
            ref={ref}
        >
            <div className='flex flex-col flex-1'>
                <div className='flex px-8 justify-center items-center'>
                    <Portrait subtitle='Mike Benedum'>
                        <Image
                            alt=''
                            src='/images/benedum.jpg'
                            width={538}
                            height={727}
                        />
                    </Portrait>

                    <Portrait subtitle='Joe Trees'>
                        <Image
                            alt=''
                            src='/images/trees.jpg'
                            width={350}
                            height={507}
                        />
                    </Portrait>
                </div>

                <div className='mt-4 text-center px-8'>
                    <p className='mt-2'>
                        Originally called the Machesney Building, this 19-story
                        skyscraper of granite, brick, and terracotta supported
                        by 1,400 tons of structural steel was built to appeal to
                        stockbrokers and bankers. Its lavish lobby is swathed in
                        Italian marble with bronze fixtures and coffered plaster
                        ceilings accented in gold leaf. Cutouts on both sides
                        ensured that if other skyscrapers were built next door,
                        the open shafts would still admit light and air.
                    </p>
                    <p className='mt-4'>
                        The building was renamed in 1913 when it was bought by
                        two &quot;wildcatters&quot; who made immense fortunes
                        drilling for oil. From their 15h floor offices, Mike
                        Benedum and Joe Trees pioneered major oil discoveries in
                        West Virginia, Illinois, Louisiana, Arkansas, Texas, and
                        Mexico. Their long friendship was forged not only in
                        business but in suffering — each lost his only son in
                        1918 during World War I.
                    </p>
                    <p className='mt-4'>
                        Both were generous philanthropists, Benedum especially
                        for his home state of West Virginia, and Trees for his
                        alma mater, the University of Pittsburgh. The charitable
                        foundation Mike and Sarah Lantz Benedum established in
                        memory of their son, Claude Worthington Benedum, is
                        still in the building. A second charity here is the
                        Benter Foundation, founded by Bill Benter, who has his
                        offices on the uppermost floors.
                    </p>
                </div>
            </div>
        </Section>
    );
});
Detail.displayName = "Detail";
