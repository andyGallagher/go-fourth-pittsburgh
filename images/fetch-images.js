const sanityClient = require("@sanity/client");
const fs = require("fs");
const request = require("request");
const { join } = require("path");
const sharp = require("sharp");
const { promisify } = require("util");
const gifResize = require("@gumlet/gif-resize");

const pullImages = async () => {
    const download = (url, path, callback) => {
        request.head(url, (err, res, body) => {
            request(url).pipe(fs.createWriteStream(path)).on("close", callback);
        });
    };

    const client = sanityClient({
        projectId: "r6svgyjt",
        dataset: "production",
        useCdn: true,
    });

    const res = await client.fetch(`*[]`);
    const images = res.filter((r) => r._type === "sanity.imageAsset");

    images.forEach((image) => {
        download(image.url, `./raw-images/${image._id}`, () => {
            console.log("✅ Done!");
        });
    });
};

const writeImages = async () => {
    const asyncReaddir = promisify(fs.readdir);

    const rawImagesDir = join(__dirname, "raw-images");
    const outputDir = join(__dirname, "dist");

    const files = await asyncReaddir(rawImagesDir);

    files.forEach(async (file, i) => {
        if (file.includes("gif")) {
            const buf = fs.readFileSync(join(rawImagesDir, file));
            const data = await gifResize({
                width: 360,
            })(buf);
            await fs.promises.writeFile(join(outputDir, `${file}.gif`), data);
        } else {
            await sharp(join(rawImagesDir, file)).toFile(
                join(outputDir, `${file}.webp`)
            );
        }
    });
};

// Pulls and converts only the images not already on the CDN.
// `existingFile` lists the filenames currently in s3://go-fourth-cdn/dist/, one per line.
const processNewImages = async (existingFile) => {
    const existing = new Set(fs.readFileSync(existingFile, "utf8").split("\n"));

    const client = sanityClient({
        projectId: "r6svgyjt",
        dataset: "production",
        apiVersion: "2022-11-01",
        useCdn: false,
    });

    const images = await client.fetch(`*[_type == "sanity.imageAsset"]{_id, url}`);
    const outputName = (id) => (id.includes("gif") ? `${id}.gif` : `${id}.webp`);
    const missing = images.filter((image) => !existing.has(outputName(image._id)));

    console.log(`${images.length} images, ${missing.length} new`);

    fs.mkdirSync(join(__dirname, "dist"), { recursive: true });

    for (const image of missing) {
        const res = await fetch(image.url);
        if (!res.ok) {
            throw new Error(`Failed to download ${image.url}: ${res.status}`);
        }
        const buf = Buffer.from(await res.arrayBuffer());
        const output = join(__dirname, "dist", outputName(image._id));

        if (image._id.includes("gif")) {
            await fs.promises.writeFile(output, await gifResize({ width: 360 })(buf));
        } else {
            await sharp(buf).toFile(output);
        }

        console.log(`✅ ${outputName(image._id)}`);
    }
};

(async () => {
    // # TODO => Uncomment the below lines to fetch and write images
    const args = process.argv.slice(2);
    if (args[0] === "--new") {
        await processNewImages(args[1]);
        return;
    }
    if (args.includes("--pull")) {
        await pullImages();
        return;
    }
    if (args.includes("--write")) {
        await writeImages();
        return;
    }

    console.warn(`Unrecognized command: ${args}`);
    console.warn(
        "Usage: node fetch-images.js --pull | --write | --new <existing-list-file>"
    );
})();
