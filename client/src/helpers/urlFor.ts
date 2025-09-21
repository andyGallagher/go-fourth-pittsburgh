import imageUrlBuilder from "@sanity/image-url";
import client from "client";

const IS_DEV = true; //process.env.NODE_ENV === "development";

export const imageUrlFor = (
    source: any,
    options?: { isMeta?: boolean }
): string => {
    if (options?.isMeta || IS_DEV) {
        const url = imageUrlBuilder(client).image(source).url();
        return url;
    }

    if (source.asset._ref.includes("gif")) {
        return `https://cdn.gofourthpittsburgh.org/dist/${source.asset._ref}.gif`;
    }

    return `https://cdn.gofourthpittsburgh.org/dist/${source.asset._ref}.webp`;
};

export const getRawDimensions = (source: any) => {
    const ref = source.asset._ref;
    const [_a, _b, dimensionsRaw] = ref.split("-");
    const [width, height] = dimensionsRaw
        .split("x")
        .map((dim: string) => parseInt(dim));

    return { width, height };
};

export const getImageProps = (source: any) => {
    return {
        // ...getRawDimensions(source),
        src: imageUrlFor(source),
    };
};

export const isImageWider = (source: any) => {
    const { width, height } = getRawDimensions(source);

    return width > height;
};

export const audioUrlFor = (source: any): string => {
    const [_, fileName, extension] = source.split("-");

    const { apiHost: apiUrl, projectId, dataset } = client.clientConfig;
    const apiHost = apiUrl || "https://api.sanity.io";
    const baseUrl = apiHost.replace(/^https:\/\/api\./, "https://cdn.");

    return `${baseUrl}/files/${projectId}/${dataset}/${fileName}.${extension}`;
};
