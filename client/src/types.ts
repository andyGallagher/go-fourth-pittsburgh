import { SanityImageAssetDocument } from "@sanity/client";

export interface BasePage {
    audioContributor: {
        _ref: string;
    }[];
    contributors: {
        _id: string;
        name: string;
        byline: string;
        image: SanityImageAssetDocument;
    }[];
    audio: any; // Audio file
    body: any; // PortableText
    mainImage: SanityImageAssetDocument;
    subtitle: string;
    title: string;
    type: "LandingPage" | "BuildingPage";
    nextBuildingSlug?: { current: string };
}

export interface LandingPage extends BasePage {
    type: "LandingPage";
}

export interface BuildingPage extends BasePage {
    type: "BuildingPage";
    lookInside: {
        title: string;
        description: string;
        image: SanityImageAssetDocument;
    }[];
    map: SanityImageAssetDocument;
    slug: string;
    title: "Benedum-Trees Building";
    zoomInAnimate: SanityImageAssetDocument;
    zoomOutAnimate: SanityImageAssetDocument;
    zoomedIn: SanityImageAssetDocument;
}
