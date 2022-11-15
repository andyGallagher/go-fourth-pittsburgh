// client.js
import sanityClient from "@sanity/client";

export default sanityClient({
    projectId: "r6svgyjt",
    dataset: "production",
    useCdn: true,
});
