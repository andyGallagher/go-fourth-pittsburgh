/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

export type MapKeys =
    | "bank-of-pittsburgh"
    | "benedum-trees-building"
    | "pittsburgh-stock-exchange";

const COORDINATES: Record<MapKeys, { style: React.CSSProperties }> = {
    ["bank-of-pittsburgh"]: {
        style: {
            top: "50%",
            left: "0%",
            width: "45%",
            height: "15%",
        },
    },
    ["benedum-trees-building"]: {
        style: {
            top: "42.5%",
            left: "55%",
            width: "33%",
            height: "10%",
        },
    },
    ["pittsburgh-stock-exchange"]: {
        style: {
            top: "52.5%",
            left: "55%",
            width: "25%",
            height: "12%",
        },
    },
};

export const Map = ({ src }: { src: string }) => {
    const mapRef = useRef<HTMLDivElement>(null);

    return (
        <div className='w-screen h-[60vh] overflow-hidden flex'>
            <div
                className='w-screen h-[60vh] relative flex items-center justify-center'
                ref={mapRef}
            >
                <img
                    className='absolute top-0 bottom-0 m-auto h-[60vh] w-[auto] max-w-[initial]'
                    alt='map'
                    src={src}
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
