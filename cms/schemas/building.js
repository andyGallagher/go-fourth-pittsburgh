export default {
    name: "building",
    title: "Building Page",
    type: "document",
    fields: [
        {
            name: "order",
            title: "Order",
            type: "number",
        },
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "slug",
            title: "Slug",
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
            type: "image",
            accept: "gif",
            options: {
                hotspot: true,
            },
        },

        {
            name: "zoomOutAnimate",
            title: "Zoom Out animation",
            type: "image",
            accept: "gif",
            options: {
                hotspot: true,
            },
        },

        {
            name: "zoomedIn",
            title: "ZoomedIn",
            type: "image",
            options: {
                hotspot: true,
            },
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
            type: "image",
            options: {
                hotspot: true,
            },
        },

        {
            name: "rotated map",
            title: "Rotated Map Image",
            type: "image",
            options: {
                hotspot: true,
            },
        },

        {
            name: "metaTitle",
            title: "Meta Title",
            type: "string",
        },
        {
            name: "metaDescription",
            title: "Meta Description",
            type: "string",
        },
        {
            name: "metaThumbnail",
            title: "Meta Thumbnail",
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
