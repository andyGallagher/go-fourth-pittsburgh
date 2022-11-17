export default {
    name: "about",
    title: "About Page",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "subtitle",
            title: "Subtitle",
            type: "string",
        },
        {
            name: "description",
            title: "Description",
            type: "blockContent",
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
            name: "contributors",
            title: "Project Contributors",
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
            title: "Credits",
            type: "blockContent",
        },

        {
            name: "ads",
            title: "Ads",
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
