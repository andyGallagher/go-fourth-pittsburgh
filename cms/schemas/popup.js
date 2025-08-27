export default {
    name: "popup",
    title: "Popup",
    description:
        "Content for informational popups that appear on the site to new visitors",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            description: "Main heading displayed on the popup",
        },
        {
            name: "description",
            title: "Description",
            type: "blockContent",
            description: "Content for the popup body",
        },
        {
            name: "image",
            title: "Image",
            type: "image",
            description: "Main popup image (optional)",
            options: {
                hotspot: true,
            },
        },
        {
            name: "buttons",
            title: "Buttons",
            type: "array",
            description: "Call-to-action buttons that will appear on the popup",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "label",
                            title: "Button Label",
                            type: "string",
                            description: "Text displayed on the button",
                        },
                        {
                            name: "url",
                            title: "URL",
                            type: "url",
                            description:
                                "Where the button links to when clicked",
                        },
                    ],
                    preview: {
                        select: {
                            title: "label",
                            subtitle: "url",
                        },
                    },
                },
            ],
        },
        {
            name: "isLive",
            title: "Is Live",
            type: "boolean",
            description: "Toggle to show or hide this popup on the site",
            initialValue: false,
        },
        {
            name: "order",
            title: "Display Order",
            type: "number",
            description: "Controls popup priority (lower numbers appear first)",
        },
    ],
    preview: {
        select: {
            title: "title",
            media: "image",
        },
    },
};
