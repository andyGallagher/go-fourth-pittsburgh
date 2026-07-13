import { imageUrlFor } from "../../helpers/urlFor";
import Head from "next/head";
import { BasePage } from "types";

export const Metadata = ({ page }: { page: BasePage }) => {
    const description =
        page.metaDescription ||
        "Discover Pittsburgh's Wall Street on a virtual tour of Fourth Avenue with Mark Houser and Megan Harris. With rare images and drone photography by Chris Hytha of Highrises.";
    const title = page.metaTitle
        ? `Pittsburgh's Wall Street | ${page.metaTitle}`
        : "Pittsburgh's Wall Street | Go Fourth";
    const thumbnail = page.metaThumbnail
        ? imageUrlFor(page.metaThumbnail)
        : undefined;

    return (
        <Head>
            <title>{title}</title>
            <meta name='description' content={description} />
            <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
            <link
                rel='icon'
                href='/favicon.png'
                type='image/png'
                sizes='48x48'
            />
            <link rel='apple-touch-icon' href='/apple-touch-icon.png' />

            <meta property='og:type' content='website' />
            <meta property='og:title' content={title} />
            <meta
                property='og:url'
                content='https://www.pittsburghwallstreet.com'
            />
            <meta property='og:site_name' content="Pittsburgh's Wall Street" />
            <meta property='og:description' content={description} />
            <meta name='twitter:title' content={title} />
            <meta property='og:image' content={thumbnail} />
            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:creator' content='@housertalks' />
            <meta name='twitter:site' content='@housertalks' />
            <meta property='twitter:image' content={thumbnail} />
            <meta property='twitter:image:alt' content='' />
            <link
                rel='canonical'
                href='https://www.pittsburghwallstreet.com'
            />
        </Head>
    );
};
