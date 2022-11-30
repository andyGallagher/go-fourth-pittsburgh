/* eslint-disable @next/next/no-img-element */
import { getImageProps } from "helpers/urlFor";
import Link from "next/link";
import React, { useRef } from "react";

export type MapKeys =
    | "bank-of-pittsburgh"
    | "benedum-trees-building"
    | "pittsburgh-stock-exchange";

const COORDINATES: Record<MapKeys, { style: React.CSSProperties }> = {
    ["bank-of-pittsburgh"]: {
        style: {
            top: "51%",
            left: "0%",
            width: "53%",
            height: "17%",
        },
    },
    ["benedum-trees-building"]: {
        style: {
            top: "36.5%",
            left: "68%",
            width: "28%",
            height: "16%",
        },
    },
    ["pittsburgh-stock-exchange"]: {
        style: {
            top: "53%",
            left: "68%",
            width: "30%",
            height: "15%",
        },
    },
};

export const Map = ({ src }: { src: any }) => {
    const mapRef = useRef<HTMLDivElement>(null);

    return (
        <div className='flex-1 h-[60vh] overflow-hidden flex md:h-[100vh]'>
            <div
                className='flex-1 h-[60vh] relative flex items-start justify-start md:h-[703px]'
                ref={mapRef}
            >
                <img
                    className='-md:hidden w-[420px] md:rounded-xl md:overflow-hidden'
                    alt='map'
                    {...getImageProps(src)}
                />

                <img
                    className='absolute top-0 bottom-0 m-auto h-[60vh] w-[auto] max-w-[initial] md:rounded-xl md:hidden'
                    alt='map'
                    {...getImageProps(src)}
                    style={{
                        width: "100%",
                        height: "auto",
                    }}
                />

                {Object.entries(COORDINATES).map(([key, { style }]) => {
                    return (
                        <Link
                            key={key}
                            href={`/explore/${key}`}
                            style={{
                                position: "absolute",
                                ...style,
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};
