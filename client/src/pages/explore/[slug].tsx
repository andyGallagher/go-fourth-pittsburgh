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
        fallback: "blocking", // Changed from true to 'blocking' for better SEO and UX
    };
}

export const getStaticProps: GetStaticProps = async (context: any) => {
    const { slug = "" } = context.params;
    const [buildings, contributors, sponsors]: [any[], any[], any[]] =
        await Promise.all([
            client.fetch(`*[_type == "building"]`),
            client.fetch(`*[_type == "contributor"]`),
            client.fetch(`*[_type == "sponsor"]`),
        ]);

    const sortedBuildings = buildings.sort((a, b) => {
        const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
        const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
        return orderA - orderB;
    });

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

    const buildingSponsors = sortedBuildings[activeBuildingIndex].sponsors?.map(
        (sponsor: any) => {
            return sponsors.find((s) => s._id === sponsor._ref);
        }
    );

    const buildingCoordinates = sortedBuildings.map((building) => {
        if (!building.mapCoordinates) {
            console.warn(
                "mapCoordinates is undefined for building:",
                building.slug.current
            );
            return {
                slug: building.slug.current,
                coordinates: [0, 0, 0, 0],
            };
        }

        return {
            slug: building.slug.current,
            coordinates: building.mapCoordinates,
        };
    });

    return {
        props: {
            page: {
                ...sortedBuildings[activeBuildingIndex],
                nextBuildingSlug:
                    sortedBuildings[activeBuildingIndex + 1]?.slug ?? null,
                previousBuildingSlug:
                    sortedBuildings[activeBuildingIndex - 1]?.slug ?? null,
                type: "BuildingPage",
                sponsors: buildingSponsors ?? null,
                contributors,
                buildingCoordinates,
            },
        },
        // Enables ISR with a revalidation period of 60 seconds
        revalidate: 60,
    };
};
