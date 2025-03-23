/* eslint-disable @next/next/no-img-element */
import { getImageProps } from "../../helpers/urlFor";
import { Viewports } from "../viewports";
import clsx from "clsx";
import { Audio } from "components/audio";
import { LookInside } from "components/look-inside";
import { Metadata } from "components/metadata";
import { Sections } from "components/sections";
import { Button } from "components/ui/button";
import { Footer } from "components/ui/footer";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { BuildingPage, LandingPage } from "types";

const useDetailScroll = () => {
    const detailRef = useRef<HTMLDivElement>(null);
    const scrollToDetail = () => {
        detailRef.current?.scrollIntoView({ behavior: "smooth" });

        if (detailRef.current) {
            const top =
                detailRef.current?.getBoundingClientRect().top +
                window.pageYOffset -
                30;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    return { detailRef, scrollToDetail };
};

export const Base = ({ page }: { page: LandingPage | BuildingPage }) => {
    const { detailRef, scrollToDetail } = useDetailScroll();
    const [drawer, setDrawer] = useState<"audio" | "look-inside" | undefined>(
        undefined
    );
    const router = useRouter();
    const scrollRef = useRef<HTMLDivElement>(null);

    const isExplorerPage = page.type !== "LandingPage";

    useEffect(() => {
        scrollRef.current?.scrollTo(0, 0);
    }, [page.title]);

    return (
        <Viewports>
            <Metadata key={`${page.title}--metadata`} page={page} />

            <main className={clsx(drawer === "audio" && "pb-[90px]")}>
                <div
                    className=' md:flex md:flex-row md:mx-auto'
                    onClick={() => {
                        if (drawer === "look-inside") {
                            setDrawer(undefined);
                        }
                    }}
                >
                    {isExplorerPage && (
                        <Sections.Explore
                            className='md:hidden'
                            key={`${page.title}--explore`}
                            isExplore
                            page={page}
                        />
                    )}

                    <Sections.Building
                        key={`${page.title}--building`}
                        page={page}
                        openAudioPanel={() =>
                            setDrawer((drawer) => {
                                return drawer === "audio" ? undefined : "audio";
                            })
                        }
                        openLookInsidePanel={() =>
                            setDrawer((drawer) => {
                                return drawer === "look-inside"
                                    ? undefined
                                    : "look-inside";
                            })
                        }
                        scrollToDetail={scrollToDetail}
                    />
                    <div
                        ref={scrollRef}
                        className='md:w-[480px] md:overflow-scroll md:max-h-screen md:pb-8 md:mx-8'
                    >
                        <Sections.Detail
                            key={`${page.title}--detail`}
                            ref={detailRef}
                            page={page}
                        />

                        {Boolean(page.sponsors && page.sponsors.length > 0) && (
                            <div className='flex flex-col items-center'>
                                <div className='credits text-slate-500 tracking-wider portable-text flex flex-wrap justify-center items-center text-center p-8 border-t-2 border-b-2 my-4 border-slate-300 md:border-2 md:shadow-md'>
                                    <div className='mb-4'>
                                        <h3 className='text-sm tracking-widest'>
                                            {page.sponsors?.length === 1
                                                ? "PARTNER"
                                                : "PARTNERS"}
                                        </h3>
                                    </div>
                                    <div className='text-xs flex flex-wrap justify-center'>
                                        {page.sponsors?.map((sponsor) => {
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
                        )}

                        <div className='mt-4 pb-8 flex justify-center'>
                            <Button
                                isInverted
                                onClick={() => {
                                    router.push(
                                        page.nextBuildingSlug?.current
                                            ? `/explore/${page.nextBuildingSlug.current}`
                                            : "/"
                                    );
                                }}
                            >
                                {(() => {
                                    if (
                                        isExplorerPage &&
                                        page.nextBuildingSlug
                                    ) {
                                        return "Next building";
                                    } else if (isExplorerPage) {
                                        return "Home";
                                    }

                                    return "Explore";
                                })()}
                            </Button>
                        </div>
                    </div>

                    {isExplorerPage && (
                        <Sections.Explore
                            className='-md:hidden'
                            key={`${page.audioFileName}--explore`}
                            isExplore
                            page={page}
                        />
                    )}
                </div>

                <Audio
                    key={`${page.title}--audio`}
                    page={page}
                    isShowing={drawer === "audio"}
                    close={() => setDrawer(undefined)}
                />

                {page.type === "BuildingPage" && (
                    <LookInside
                        key={`${page.title}--lookInside`}
                        isShowing={drawer === "look-inside"}
                        close={() => setDrawer(undefined)}
                        lookInside={page.lookInside}
                    />
                )}

                <Footer />
            </main>
        </Viewports>
    );
};
