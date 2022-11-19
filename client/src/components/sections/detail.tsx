import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import { Section } from "components/ui/section";
import { getImageProps, isImageWider } from "helpers/urlFor";
import Image from "next/image";
import React from "react";
import { BasePage } from "types";

const components: Partial<PortableTextReactComponents> = {
    block: {
        normal: ({ children, index }) => {
            if (index === 0) {
                return (
                    <p>
                        {React.Children.map(children, (child, index) => {
                            if (index === 0 && typeof child === "string") {
                                const firstLetter = child.slice(0, 1);
                                const rest = child.slice(1);
                                return (
                                    <>
                                        <span
                                            style={{
                                                fontSize: "3rem",
                                                float: "left",
                                                marginRight: "8px",
                                                lineHeight: "53px",
                                                marginBottom: "1px",
                                                border: "1px solid",
                                                padding: "4px 8px 8px",
                                                marginTop: "7px",
                                                height: "64px",
                                                width: "64px",
                                                textAlign: "center",
                                            }}
                                        >
                                            {firstLetter}
                                        </span>
                                        <span>{rest}</span>
                                    </>
                                );
                            }

                            return child;
                        })}
                    </p>
                );
            }

            return <p>{children}</p>;
        },
        blockquote: ({ children, ...rest }) => {
            const childCount = React.Children.count(children);
            return (
                <blockquote className='mx-8 mt-8 p-4 font-garamond text-slate-200 bg-slate-700 rounded-sm'>
                    {React.Children.map(children, (child, index) => {
                        if (index === childCount - 1) {
                            return (
                                <span className='float-right mr-2'>
                                    {child}
                                </span>
                            );
                        }

                        return child;
                    })}
                </blockquote>
            );
        },
        h1: ({ children }) => <h1>{children}</h1>,
        h2: ({ children }) => <h2>{children}</h2>,
        h3: ({ children }) => <h3>{children}</h3>,
        h4: ({ children }) => <h4>{children}</h4>,
        h5: ({ children }) => <h5>{children}</h5>,
        h6: ({ children }) => <h6>{children}</h6>,
    },
    types: {
        image: ({ value }) => {
            if (!value?.asset?._ref) {
                return null;
            }

            if (isImageWider(value)) {
                return (
                    <Image
                        alt={value.alt || " "}
                        loading='lazy'
                        {...getImageProps(value)}
                        className='mt-8 mb-4 md:px-8'
                    />
                );
            }

            return (
                <Image
                    alt={value.alt || " "}
                    loading='lazy'
                    {...getImageProps(value)}
                    className='rounded-md mt-8 max-w-[50%]'
                />
            );
        },
    },
};

/**

 */
export const Detail = React.forwardRef<HTMLDivElement, { page: BasePage }>(
    ({ page }, ref) => {
        return (
            <Section
                className='text-slate-600 pt-12 pb-4 md:pt-0  md:h-auto'
                ref={ref}
            >
                <div className='detail portable-text flex flex-col flex-1 justify-center items-center md:justify-start'>
                    <PortableText value={page.body} components={components} />
                </div>
            </Section>
        );
    }
);
Detail.displayName = "Detail";

/**
Old reference: 
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
 */
