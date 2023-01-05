import client from "client";
import { Base } from "components/base";
import { GetStaticProps } from "next";
import { BuildingPage } from "types";

export default function Explore({ page }: { page: BuildingPage }) {
    if (page === undefined) {
        return <div>undefined</div>;
    }
    return <Base page={page} />;
}

export async function getStaticPaths() {
    const buildings = await client.fetch(
        `*[_type == "building" && defined(slug.current)][].slug.current`
    );

    return {
        paths: buildings.map((building: any) => ({
            params: { slug: building },
        })),
        fallback: true,
    };
}

export const getStaticProps: GetStaticProps = async (context: any) => {
    const { slug = "" } = context.params;
    const [buildings, contributors]: [any[], any[]] = await Promise.all([
        client.fetch(`*[_type == "building"]`),
        client.fetch(`*[_type == "contributor"]`),
    ]);
    const sortedBuildings = buildings.sort((a, b) => a.order - b.order);
    const activeBuildingIndex = sortedBuildings.findIndex(
        (building) => building.slug.current === slug
    );

    if (activeBuildingIndex === -1) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
        };
    }

    return {
        props: {
            page: {
                ...sortedBuildings[activeBuildingIndex],
                nextBuildingSlug:
                    sortedBuildings[activeBuildingIndex + 1]?.slug ?? null,
                type: "BuildingPage",
                contributors,
            },
        },
    };
};
