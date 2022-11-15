import imageUrlBuilder from "@sanity/image-url";
import client from "client";

export const imageUrlFor = (source: any, isGif = false): string => {
    const url = imageUrlBuilder(client).image(source).url();
    if (isGif) {
        return url.replace(".jpg", ".gif");
    }
    return url;
};

export const audioUrlFor = (source: any): string => {
    const [_, fileName, extension] = source.split("-");

    const { apiHost: apiUrl, projectId, dataset } = client.clientConfig;
    const apiHost = apiUrl || "https://api.sanity.io";
    const baseUrl = apiHost.replace(/^https:\/\/api\./, "https://cdn.");

    return `${baseUrl}/files/${projectId}/${dataset}/${fileName}.${extension}`;
};
