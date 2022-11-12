import { Audio } from "../components/audio";
import { Sections } from "components/sections";
import Head from "next/head";
import { useRef, useState } from "react";

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

export default function Home() {
    const { detailRef, scrollToDetail } = useDetailScroll();
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);

    return (
        <div>
            <Head>
                <title>GoFourthPittsburgh.org</title>
                <meta name='description' content='GoFourthPittsburgh.org' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <main className='pb-[90px]'>
                <Sections.Building
                    openAudioPanel={() => setIsPlayingAudio(true)}
                    scrollToDetail={scrollToDetail}
                />
                <Sections.Detail ref={detailRef} />

                <Audio
                    src='/audio/example.mp3'
                    isPlayingAudio={isPlayingAudio}
                />
            </main>
        </div>
    );
}
