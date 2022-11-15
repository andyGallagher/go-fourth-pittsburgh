import clsx from "clsx";
import { Audio } from "components/audio";
import { LookInside } from "components/look-inside";
import { Sections } from "components/sections";
import { Button } from "components/ui/button";
import { Footer } from "components/ui/footer";
import { imageUrlFor } from "helpers/urlFor";
import Head from "next/head";
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

    return (
        <div>
            <Head>
                <title>Go Fourth | GoFourthPittsburgh.org</title>
                <meta name='description' content='GoFourthPittsburgh.org' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <main className={clsx(drawer === "audio" && "pb-[90px]")}>
                <div
                    className={clsx(
                        "transition-all duration-500",
                        drawer === "look-inside" && "blur"
                    )}
                    onClick={() => {
                        if (drawer === "look-inside") {
                            setDrawer(undefined);
                        }
                    }}
                >
                    {isExplorerPage && (
                        <Sections.Explore isExplore page={page} />
                    )}

                    <Sections.Building
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
                    <Sections.Detail ref={detailRef} page={page} />

                    <div className='mt-4 pb-8 flex justify-center'>
                        <Button
                            isInverted
                            onClick={() => {
                                window.scrollTo(0, 0);
                                router.push(
                                    `/explore/${page.nextBuildingSlug?.current}`
                                );
                            }}
                        >
                            {(() => {
                                if (isExplorerPage && page.nextBuildingSlug) {
                                    return "Next building";
                                } else if (isExplorerPage) {
                                    return "Home";
                                }

                                return "Explore";
                            })()}
                        </Button>
                    </div>
                </div>

                <Audio page={page} isShowing={drawer === "audio"} />

                {page.type === "BuildingPage" && (
                    <LookInside
                        isShowing={drawer === "look-inside"}
                        close={() => setDrawer(undefined)}
                        lookInside={page.lookInside}
                    />
                )}

                <Footer />
            </main>
        </div>
    );
};
