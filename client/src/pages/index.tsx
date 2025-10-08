import client from "client";
import { Base } from "components/base";
import { GetStaticProps } from "next";
import { LandingPage } from "types";

export default function Index({ page }: { page: LandingPage }) {
    return <Base page={page} />;
}

export const getStaticProps: GetStaticProps = async (context) => {
    const [page, buildings, contributors, sponsors, popups]: [
        any,
        any[],
        any[],
        any[],
        any[]
    ] = await Promise.all([
        client.fetch(
            `
      *[_type == "landing"][0]
    `
        ),
        client.fetch(`*[_type == "building"]`),
        client.fetch(`*[_type == "contributor"]`),
        client.fetch(`*[_type == "sponsor"]`),
        client.fetch(`*[_type == "popup"]`),
    ]);

    const sortedBuildings = buildings.sort((a, b) => {
        const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
        const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
        return orderA - orderB;
    });

    const sortedPopups = popups.sort((a, b) => {
        const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
        const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
        return orderA - orderB;
    });

    return {
        props: {
            page: {
                ...page,
                type: "LandingPage",
                nextBuildingSlug: sortedBuildings[0].slug,
                contributors,
                sponsors: [],
                popup: sortedPopups[0],
            },
        },
        // Enables ISR with a revalidation period of 60 seconds
        revalidate: 60,
    };
};
