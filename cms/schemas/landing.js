export default {
    name: "landing",
    title: "Landing Page",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "subtitle",
            title: "Title",
            type: "string",
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
            name: "body",
            title: "Body",
            type: "blockContent",
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
