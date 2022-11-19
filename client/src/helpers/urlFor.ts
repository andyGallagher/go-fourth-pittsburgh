import imageUrlBuilder from "@sanity/image-url";
import client from "client";

export const imageUrlFor = (
    source: any,
    options?: { isMeta?: boolean }
): string => {
    if (options?.isMeta) {
        const url = imageUrlBuilder(client).image(source).url();
        return url;
    }

    if (source.asset._ref.includes("gif")) {
        return `/assets/images/${source.asset._ref}.gif`;
    }

    return `/assets/images/${source.asset._ref}.webp`;
};

export const isImageWider = (source: any) => {
    const ref = source.asset._ref;
    const [_a, _b, dimensionsRaw] = ref.split("-");
    const [width, height] = dimensionsRaw
        .split("x")
        .map((dim: string) => parseInt(dim));

    return width > height;
};

export const audioUrlFor = (source: any): string => {
    const [_, fileName, extension] = source.split("-");

    const { apiHost: apiUrl, projectId, dataset } = client.clientConfig;
    const apiHost = apiUrl || "https://api.sanity.io";
    const baseUrl = apiHost.replace(/^https:\/\/api\./, "https://cdn.");

    return `${baseUrl}/files/${projectId}/${dataset}/${fileName}.${extension}`;
};
