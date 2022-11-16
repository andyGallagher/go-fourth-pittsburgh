export default {
    name: "contributor",
    title: "Contributor",
    type: "document",
    fields: [
        {
            name: "order",
            title: "Order",
            type: "number",
        },
        {
            name: "name",
            title: "Name",
            type: "string",
        },
        {
            name: "byline",
            title: "Byline",
            type: "string",
            options: {
                source: "name",
                maxLength: 96,
            },
        },
        {
            name: "image",
            title: "Image",
            type: "image",
            options: {
                hotspot: true,
            },
        },
        {
            name: "bio",
            title: "Bio",
            type: "blockContent",
        },
    ],
    preview: {
        select: {
            title: "name",
            media: "image",
        },
    },
};
