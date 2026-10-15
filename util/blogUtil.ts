import path from "path";
import { readFile, readdir, stat } from "node:fs/promises";
const BLOG_POST_DIR = path.join(process.cwd(), "content", "blogPosts");

export interface postMeta {
    title: string;
    publishedDate: string;
    summary: string;
    tags?: string[];
}

export async function listPosts(): Promise<string[]> {
    /**
     * Search through all the posts on the site, returns an array of slugs. Use only for initalization, since its blocking
     *
     * @returns A string promise for a list of all the posts in the BLOG_POST_DIR
     */
    try {
        const folders: string[] = await readdir(BLOG_POST_DIR);
        folders.forEach(async (folderName) => {
            const curDir: string = path.join(BLOG_POST_DIR, folderName);
            const curStat = await stat(curDir);
            if (!curStat.isDirectory()) {
                throw new Error(
                    "File/Invalid folder found in directory! check " +
                        BLOG_POST_DIR,
                );
            }
        });
        return folders;
    } catch (err) {
        console.error(err);
        throw new Error("LISTPOST ERROR");
    }
}

function isPostMeta(data: unknown): data is postMeta {
    /**
     * Validate if the format of meta.json is correct or not
     *
     * @param {unknown} data - given data, unknown type
     *
     */
    if (data != null && typeof data === "object") {
        if (
            Object.hasOwn(data, "tags") &&
            (!Array.isArray((data as Record<string, unknown>).tags) ||
                !((data as Record<string, unknown>).tags as unknown[]).every(
                    (item) => typeof item === "string",
                ))
        ) {
            return false;
        }
        return (
            typeof (data as Record<string, unknown>).title === "string" &&
            typeof (data as Record<string, unknown>).publishedDate ===
                "string" &&
            typeof (data as Record<string, unknown>).summary === "string"
        );
    } else {
        return false;
    }
}

export async function getMeta(post: string): Promise<postMeta> {
    /**
     * Given a post slug, give its metadata
     *
     * @param {string} post - the slug of the post
     * @returns {Promise<postMeta>} returns an object of postMeta containing the info of the post
     *
     */
    try {
        const fileDir = path.join(BLOG_POST_DIR, post, "meta.json");
        const rawData = await readFile(fileDir, "utf-8");
        const metaJson: postMeta = JSON.parse(rawData);
        if (!isPostMeta(metaJson)) {
            throw new Error("Incorrect JSON format");
        }
        return metaJson;
    } catch (err) {
        console.error(err);
        throw new Error("Can't read metadata!");
    }
}
