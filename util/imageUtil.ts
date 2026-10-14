import { readdir, stat } from "node:fs/promises";
import path from "path";
import { listPosts } from "./blogUtil";

//TODO: for the blog image url, check if the image exists in the public/img/blogCover folder, by default the title image should be named after the blog post,
// if there are many images in a single blog post, make own folder for it in the blogImg folder
//TODO: we don't really need to check the image_url anymore, since i can just check the fs for if a cover
// image alt can just be the cover, and the hover can be a replacement
// Try and refactor all the functions so they are using the server, and are async (e.g. 'use server' is on top of the file) this is fs stuff, so i don't want this done anywhere near the client
//

// this should read the /blogPosts directory, get all the files, and provide a buncha resources, (like a list of slugs or the ability to get the last modified date / created date)
const RELATIVE_PATH = path.join("img", "blogThumb")
const BLOG_THUMB_DIR = path.join(process.cwd(), "public", RELATIVE_PATH); //maybe just have this be a partial directory, since static things are already hosted on the site

let validThumbs: string[] | null = null;

const SUPPORTED_IMAGE_TYPES = [
    ".png",
    ".apng",
    ".jpg",
    ".jpeg",
    ".jfif",
    ".gif",
    ".avif",
    ".webp",
    ".svg",
];
async function listThumbs() {
    /**
     * List the thumbnails in the thumbnail path
     */
    try {
        const allPosts: string[] = await listPosts();
        const allThumbs: string[] = await readdir(BLOG_THUMB_DIR);
        // checks for invalid files in the BLOG_THUMB_DIR, if there is a folder or invalid file extension, then we error out
        allThumbs.forEach(async (thumb) => {
            //this checks 3 things
            //- wether there is a folder in the thumbnail folder
            //- wether there is a file that isn't accociated with a blog post
            // - wether there is a non-image file in the directory
            // if there is weird fs shenanagins somewhere, we catch it with an error and ig let the program crash for now
            // IDEALLY this should be caught when used
            // the parser handles reades the name and extension of all the files in the BLOGTHUMBDIR
            const curDir: string = path.join(BLOG_THUMB_DIR, thumb);
            const parsedPath = path.parse(curDir);
            const curStat = await stat(curDir);
            if (!curStat.isFile()) {
                throw new Error(
                    "Folder found in the thumbs folder! " + BLOG_THUMB_DIR,
                );
            }
            if (!allPosts.includes(parsedPath.name)) {
                //Compare the name of the file without its extension
                console.error(
                    "Thumbnail doesn't have accociated post! " + thumb,
                );
            }
            if (!SUPPORTED_IMAGE_TYPES.includes(parsedPath.ext)) {
                throw new Error("Non-Image File Found in " + BLOG_THUMB_DIR);
            }
        });
        return allThumbs;
    } catch (err) {
        console.error(err);
        throw new Error("LIST ERROR");
    }
}

export async function getThumbPath(slug: string): string | null {
  /**
   * Returns a string fragment that is ready to use in the next/image compoent given the blog image slug or returns null
   */
    try {
        if (!validThumbs) {
            validThumbs = await listThumbs(); //get all the valid thumbs if there isn't any,
        }
        for (const fileName of validThumbs) {
            if (fileName.substring(0, fileName.lastIndexOf(".")) === slug) {
                //returns the relative path of the function
                // also manually replaces the \\ with / bc windows behaves differently then posix systems
                return ("/" + path.posix.join(RELATIVE_PATH, fileName)).replaceAll('\\', '/');
            }
        }
        return null;
    } catch (err) {
        console.error(err);
        throw new Error("FAILED GETTING THUMB");
    }
}
