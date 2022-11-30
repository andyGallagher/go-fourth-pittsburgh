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

(async () => {
    // await pullImages();
    await writeImages();
})();
