import { Base } from "components/base";
import { GetServerSideProps } from "next";

export default function Explore({ slug }: { slug: string }) {
    return <></>;
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    return {
        redirect: {
            permanent: false,
            destination: "/explore/nice",
        },
        props: {},
    };
};
