import { SanityImageAssetDocument } from "@sanity/client";

export interface BasePage {
    audioFileName?: string;
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
    type: "LandingPage" | "BuildingPage" | "AboutPage";
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
    title: string;
    zoomInAnimate: SanityImageAssetDocument;
    zoomOutAnimate: SanityImageAssetDocument;
    zoomedIn: SanityImageAssetDocument;
}

// This one is different enough to not extend
export interface AboutPage extends BasePage {
    type: "AboutPage";
    contributors: {
        _id: string;
        name: string;
        byline: string;
        image: SanityImageAssetDocument;
        bio: any; // PortableText
    }[];
    description: any; // PortableText
    ads: any; // PortableText
}
