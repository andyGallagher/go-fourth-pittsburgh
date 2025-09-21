import { SanityImageAssetDocument } from "@sanity/client";

export interface BasePage {
    audioFileName?: string;
    audioContributor?: {
        _ref: string;
    }[];
    contributors: {
        _id: string;
        name: string;
        byline: string;
        image: SanityImageAssetDocument;
    }[];
    audio?: any; // Audio file
    body: any; // PortableText
    mainImage: SanityImageAssetDocument;
    subtitle: string;
    title: string;
    type: "LandingPage" | "BuildingPage" | "AboutPage";
    previousBuildingSlug?: { current: string };
    nextBuildingSlug?: { current: string };
    metaTitle: string;
    metaDescription: string;
    metaThumbnail: SanityImageAssetDocument;
}

export interface LandingPage extends BasePage {
    type: "LandingPage";
    sponsors: undefined;
    popup: any;
}

export interface BuildingPage extends BasePage {
    type: "BuildingPage";
    lookInside: {
        title: string;
        description: string;
        image: SanityImageAssetDocument;
    }[];
    map: SanityImageAssetDocument;
    rotatedMap: SanityImageAssetDocument;
    slug: { current: string };
    title: string;
    zoomInAnimate?: SanityImageAssetDocument;
    zoomOutAnimate?: SanityImageAssetDocument;
    zoomedIn?: SanityImageAssetDocument;
    zoomTransformCss?: string;
    shouldShowGradient?: boolean;
    imageColor?: string;
    mobileOffset?: number;
    sponsors: {
        _id: string;
        name: string;
        url: string;
        image: SanityImageAssetDocument;
    }[];
    popup: any;
    buildingCoordinates: {
        slug: string;
        coordinates: [number, number, number, number];
    }[];
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
    sponsors: {
        _id: string;
        name: string;
        url: string;
        image: SanityImageAssetDocument;
    }[];
    description: any; // PortableText
    ads: any; // PortableText
}
