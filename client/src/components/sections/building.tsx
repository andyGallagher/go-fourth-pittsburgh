import { ReactComponent as ChevronDown } from "../../assets/icons/chevron--down.svg";
import { Button } from "components/ui/button";
import { Section } from "components/ui/section";
import Image from "next/image";
import { useEffect, useState } from "react";
import { use100vh } from "react-div-100vh";

const useHundo = () => {
    const [hundo, setHundo] = useState<number | null>(null);
    const fakeHundo = use100vh();

    useEffect(() => {
        setHundo((hundo) => {
            if (!hundo) {
                return fakeHundo;
            }

            return hundo;
        });
    }, [fakeHundo]);

    return { hundo };
};

export const Building = ({
    openAudioPanel,
    scrollToDetail,
}: {
    openAudioPanel: () => void;
    scrollToDetail: () => void;
}) => {
    const { hundo } = useHundo();

    return (
        <div
            style={{
                height: hundo ?? "100vh",
            }}
        >
            <Section>
                <div className='flex-1'>
                    <div className='w-screen h-screen flex items-center justify-center overflow-hidden'>
                        <Image
                            alt=''
                            src='/images/benedum-trees-building.jpg'
                            width={902}
                            height={1094}
                            style={{
                                height: "100%",
                                maxWidth: "initial",
                            }}
                        />
                    </div>
                </div>

                <div className='absolute top-0 left-0 w-screen flex flex-col items-center justify-center pt-12 bg-gradient-to-b from-slate-400'>
                    <h1 className='text-3xl uppercase pb-1 border-b-[1px]'>
                        Go Fourth
                    </h1>
                    <h2 className='text-xl pt-1'>1. Benedum-Trees Bldg</h2>
                </div>

                <div className='absolute bottom-0 left-0 w-screen flex flex-col items-center justify-center py-16 bg-gradient-to-t from-slate-300'>
                    <div className='flex'>
                        <Button onClick={openAudioPanel}>Play Audio</Button>
                        <Button>Look Inside</Button>
                    </div>

                    <div
                        tabIndex={0}
                        role='button'
                        className='flex flex-col mt-4 justify-center items-center'
                        onClick={scrollToDetail}
                    >
                        <div>
                            <ChevronDown style={{ fill: "#fff" }} />
                        </div>
                        <div className='my-1 text-white'>Read More</div>
                    </div>
                </div>
            </Section>
        </div>
    );
};
