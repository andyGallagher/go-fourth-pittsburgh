export default {
    name: "building",
    title: "Building Page",
    type: "document",
    fields: [
        {
            name: "order",
            title: "Order",
            type: "number",
            description:
                "Order this building appears when cycling through `next` on a tour",
        },
        {
            name: "title",
            title: "Title",
            description: "Name of the building",
            type: "string",
        },
        {
            name: "slug",
            title: "Slug",
            description:
                "Unique identifier for the building page, spelled out in kebab-case",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
        },
        {
            name: "audioFileName",
            title: "Audio File Name",
            type: "string",
        },
        {
            name: "audio",
            title: "Audio",
            type: "file",
        },
        {
            name: "audioContributor",
            title: "Audio Contributor",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: { type: "contributor" },
                },
            ],
        },
        {
            name: "mainImage",
            title: "Main image",
            type: "image",
            options: {
                hotspot: true,
            },
        },
        {
            name: "zoomInAnimate",
            title: "Zoom In animation",
            description: "Optional GIF to show zoomin in on an image",
            type: "image",
            accept: "gif",
            options: {
                hotspot: true,
            },
        },

        {
            name: "zoomOutAnimate",
            title: "Zoom Out animation",
            description: "Optional GIF to show zooming out on an image",
            type: "image",
            accept: "gif",
            options: {
                hotspot: true,
            },
        },

        {
            name: "zoomedIn",
            description: "Optional image to show when zoomed in",
            title: "ZoomedIn",
            type: "image",
            options: {
                hotspot: true,
            },
        },

        {
            name: "zoomTransformCss",
            title: "Zoom Transform CSS",
            description:
                "Optional CSS transform to apply to the zoomed in image",
            type: "string",
        },

        {
            name: "body",
            title: "Body",
            type: "blockContent",
        },

        {
            title: "Look Inside",
            name: "lookInside",
            type: "array",
            of: [
                {
                    type: "lookInside",
                },
            ],
        },

        {
            name: "map",
            title: "Map Image",
            description: "Image of the building map on mobile",
            type: "image",
            options: {
                hotspot: true,
            },
        },

        {
            name: "rotatedMap",
            title: "Rotated Map Image",
            description: "Image of the building map on desktop",
            type: "image",
            options: {
                hotspot: true,
            },
        },

        {
            name: "metaTitle",
            title: "Meta Title",
            description: "Title for SEO purposes",
            type: "string",
        },
        {
            name: "metaDescription",
            title: "Meta Description",
            description: "Description for SEO purposes",
            type: "string",
        },
        {
            name: "metaThumbnail",
            title: "Meta Thumbnail",
            description: "Image for SEO purposes",
            type: "image",
            options: {
                hotspot: true,
            },
        },

        {
            name: "sponsors",
            title: "Sponsors",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: { type: "sponsor" },
                },
            ],
        },
    ],

    preview: {
        select: {
            title: "title",
            contributor: "contributor.name",
            media: "mainImage",
        },
        prepare(selection) {
            const { contributor } = selection;
            return Object.assign({}, selection, {
                subtitle: contributor && `by ${contributor}`,
            });
        },
    },
};
