import client from "client";
import { Base } from "components/base";
import { GetStaticProps } from "next";
import { LandingPage } from "types";

export default function Index({ page }: { page: LandingPage }) {
    return <Base page={page} />;
}

export const getStaticProps: GetStaticProps = async (context) => {
    const [page, buildings, contributors, sponsors]: [
        any,
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
    ]);

    const sortedBuildings = buildings.sort((a, b) => a.order - b.order);

    return {
        props: {
            page: {
                ...page,
                type: "LandingPage",
                nextBuildingSlug: sortedBuildings[0].slug,
                contributors,
                sponsors,
            },
        },
    };
};
