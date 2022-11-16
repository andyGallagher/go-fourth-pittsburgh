import imageUrlBuilder from "@sanity/image-url";
import client from "client";

export const imageUrlFor = (source: any, isGif = false): string => {
    const url = imageUrlBuilder(client).image(source).url();

    if (isGif) {
        return imageUrlBuilder(client)
            .image(source)
            .url()
            .replace(".jpg", ".gif");
    }

    return url;
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
