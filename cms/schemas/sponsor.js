export default {
    name: "sponsor",
    title: "Sponsor",
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
            name: "image",
            title: "Image",
            type: "image",
            options: {
                hotspot: true,
            },
        },
        {
            name: "url",
            title: "URL",
            type: "string",
        },
    ],
    preview: {
        select: {
            title: "name",
            media: "image",
        },
    },
};
