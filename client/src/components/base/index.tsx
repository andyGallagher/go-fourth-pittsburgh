import { Viewports } from "../viewports";
import clsx from "clsx";
import { useWindowListener } from "common/useDocumentListener";
import { Audio } from "components/audio";
import { LookInside } from "components/look-inside";
import { Metadata } from "components/metadata";
import { Sections } from "components/sections";
import { Button } from "components/ui/button";
import { Footer } from "components/ui/footer";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
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

    const isExplorerPage = page.type !== "LandingPage";

    useWindowListener(
        "scroll",
        () => {
            if (drawer === "look-inside") {
                setDrawer(undefined);
            }
        },
        [drawer]
    );

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
                    <div className='md:w-[480px] md:overflow-scroll md:max-h-screen md:pb-8 md:mx-8'>
                        <Sections.Detail
                            key={`${page.title}--detail`}
                            ref={detailRef}
                            page={page}
                        />

                        <div className='mt-4 pb-8 flex justify-center'>
                            <Button
                                isInverted
                                onClick={() => {
                                    router.push(
                                        `/explore/${page.nextBuildingSlug?.current}`
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
                            key={`${page.title}--explore`}
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
