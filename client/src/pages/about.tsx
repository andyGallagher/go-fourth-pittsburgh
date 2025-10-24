/* eslint-disable @next/next/no-img-element */
import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import client from "client";
import clsx from "clsx";
import { Audio } from "components/audio";
import { FloatingAudioButton } from "components/audio/floating-button";
import { Metadata } from "components/metadata";
import { Button } from "components/ui/button";
import { Footer } from "components/ui/footer";
import { Section } from "components/ui/section";
import { Viewports } from "components/viewports";
import { getImageProps } from "helpers/urlFor";
import { GetStaticProps } from "next";
import React, { useState } from "react";
import { AboutPage } from "types";

const baseComponents: Partial<PortableTextReactComponents> = {
    types: {
        image: ({ value }) => {
            if (!value?.asset?._ref) {
                return null;
            }
            return (
                <img
                    alt={value.alt || " "}
                    loading='lazy'
                    {...getImageProps(value)}
                    className='rounded-xl mt-4 mb-4 max-w-[50%] mx-auto'
                />
            );
        },
    },
};

const creditsComponents: Partial<PortableTextReactComponents> = {
    types: {
        image: ({ value }) => {
            if (!value?.asset?._ref) {
                return null;
            }
            return (
                <img
                    alt={value.alt || " "}
                    loading='lazy'
                    {...getImageProps(value)}
                    className='mt-4 mb-4 max-w-[50%] mx-auto'
                />
            );
        },
    },
};

const adComponents: Partial<PortableTextReactComponents> = {
    types: {
        image: (res) => {
            if (!res.value?.asset?._ref) {
                return null;
            }

            if (res.index === 0) {
                return (
                    <a
                        key='chris'
                        className='block mt-4 mb-4'
                        target='_blank'
                        rel='noreferrer noopener'
                        href='http://www.HighrisesCollection.com'
                    >
                        <img
                            alt={res.value.alt || " "}
                            loading='lazy'
                            {...getImageProps(res.value)}
                            className='rounded-xl w-[100%]'
                        />
                    </a>
                );
            }

            if (res.index === 2) {
                return (
                    <a
                        key='mark'
                        className='block mt-4 mb-4'
                        target='_blank'
                        rel='noreferrer noopener'
                        href='http://www.amazon.com/MultiStories-Antique-Skyscrapers-Business-Tycoons/dp/057880736X'
                    >
                        <img
                            alt={res.value.alt || " "}
                            loading='lazy'
                            {...getImageProps(res.value)}
                            className='rounded-xl w-[100%]'
                        />
                    </a>
                );
            }

            return (
                <img
                    alt={res.value.alt || " "}
                    loading='lazy'
                    {...getImageProps(res.value)}
                    className='rounded-xl mt-4 mb-4 max-w-[50%] mx-auto'
                />
            );
        },
    },
};

export default function About({ page }: { page: AboutPage }) {
    return (
        <Viewports>
            <main className='pb-[90px] md:pb-[0px]'>
                <Metadata page={page} />
                <Section className='text-slate-600 pt-12' isHundo={false}>
                    <div className='flex flex-col items-center md:max-w-[600px] md:mx-auto'>
                        <h1
                            className={
                                "text-3xl pb-1 border-b-[1px] uppercase tracking-wider"
                            }
                        >
                            {page.title}
                        </h1>

                        <h2 className='text-xl mt-2 mb-8'>{page.subtitle}</h2>

                        <div className='flex flex-col pt-8 px-12 portable-text'>
                            <PortableText
                                value={page.description}
                                components={baseComponents}
                            />
                        </div>

                        <div className='flex flex-col pt-8 px-12 mt-4'>
                            {page.contributors.map((contributor) => (
                                <React.Fragment key={contributor.name}>
                                    <div className='flex flex-col mb-8 last:mb-0 portable-text items-center'>
                                        {contributor.image && (
                                            <div className='max-w-[30%] rounded-md overflow-hidden'>
                                                <img
                                                    // YES, I know better
                                                    className={
                                                        contributor.name ===
                                                        "Mark Houser"
                                                            ? "transform scale-[1.15] translate-y-[3.5%]"
                                                            : undefined
                                                    }
                                                    alt={`picture of ${contributor.name}`}
                                                    {...getImageProps(
                                                        contributor.image
                                                    )}
                                                    style={(() => {
                                                        if (
                                                            contributor.name ===
                                                            "Chris Hytha"
                                                        ) {
                                                            return {
                                                                transform:
                                                                    "scale(1.25) translate(0, -5px)",
                                                            };
                                                        }

                                                        return {};
                                                    })()}
                                                />
                                            </div>
                                        )}
                                        <h4 className='text-xl mt-2'>
                                            {contributor.name}
                                        </h4>
                                        <div className='text-md mb-1'>
                                            {contributor.byline}
                                        </div>
                                        <PortableText
                                            value={contributor.bio}
                                            components={baseComponents}
                                        />
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </Section>

                <Section
                    className='text-slate-600 mt-16 flex flex-col'
                    isHundo={false}
                >
                    <div className='flex flex-col items-center'>
                        <div className='credits bg-slate-200 text-slate-500 tracking-wider portable-text uppercase flex px-8 flex-col justify-center items-center text-center p-16 border-t-2 border-b-2 border-slate-300 md:border-2 md:shadow-md'>
                            <div className='text-sm'>
                                <PortableText
                                    value={page.body}
                                    components={creditsComponents}
                                />
                            </div>
                        </div>
                    </div>
                </Section>

                <Section
                    className='text-slate-600 flex flex-col md:w-[50%] md:mx-auto'
                    isHundo={false}
                >
                    <div className='flex flex-col items-center'>
                        <div className='credits  text-slate-500 tracking-wider portable-text flex px-8 flex-col justify-center items-center text-center p-16 border-slate-300'>
                            <div className='text-xs'>
                                <PortableText
                                    value={page.ads}
                                    components={adComponents}
                                />
                            </div>
                        </div>
                    </div>
                </Section>

                <Section
                    className='text-slate-600 flex flex-col md:w-[50%] md:mx-auto'
                    isHundo={false}
                >
                    <div className='flex flex-col items-center'>
                        <div className='credits text-slate-500 tracking-wider portable-text flex flex-wrap justify-center items-center text-center p-16 border-t-2 border-b-2 border-slate-300 md:border-2 md:shadow-md'>
                            <div className='mb-4'>
                                <h3 className='text-sm tracking-widest'>
                                    PARTNERS
                                </h3>
                            </div>
                            <div className='text-xs flex flex-wrap justify-center flex-col align-center items-center'>
                                {page.sponsors.map((sponsor) => {
                                    return (
                                        <a
                                            key={sponsor.name}
                                            href={sponsor.url}
                                            target='_blank'
                                            rel='noreferrer noopener'
                                            className='flex flex-col mb-8 last:mb-0 portable-text items-center w-1/2'
                                        >
                                            <img
                                                className='p-2'
                                                {...getImageProps(
                                                    sponsor.image
                                                )}
                                                alt={`${sponsor.name} logo`}
                                            />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </Section>

                <Footer />
            </main>
        </Viewports>
    );
}

export const getStaticProps: GetStaticProps = async (context) => {
    const [page, contributors, sponsors]: [any, any[], any[]] =
        await Promise.all([
            client.fetch(
                `
            *[_type == "about"][0]
        `
            ),
            client.fetch(`*[_type == "contributor"]`),
            client.fetch(`*[_type == "sponsor"]`),
        ]);

    const sortedContributors = contributors.sort((a, b) => a.order - b.order);
    const sortedSponsors = sponsors.sort((a, b) => a.order - b.order);

    return {
        props: {
            page: {
                ...page,
                type: "LandingPage",
                contributors: sortedContributors,
                sponsors: sortedSponsors,
            },
        },
        // Enables ISR with a revalidation period of 60 seconds
        revalidate: 60,
    };
};
