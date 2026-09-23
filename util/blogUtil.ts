import fs from "fs";
import path from "path";
import { readFile } from 'node:fs/promises';


// this should read the /blogPosts directory, get all the files, and provide a buncha resources, (like a list of slugs or the ability to get the last modified date / created date)

const BLOG_POST_DIR = path.join(process.cwd(), 'content', 'blogPosts')

export type postMeta = {
    "title": string,
    "publishedDate": string,
    "summary": string,
    "image_url"?: string
}

export function listPosts(): string[] {
    /**
     * search through all the posts on the site, returns an array of slugs 
     * use only for initalization, since its blocking
     */
    const folders: string[] = fs.readdirSync(BLOG_POST_DIR);
    folders.forEach(folderName => { //check if there aren't folders in the posts dir
        const curDir: string = path.join(BLOG_POST_DIR, folderName)
        if(!fs.statSync(curDir).isDirectory()){
            console.log(folderName)
            throw new Error("Folder has forbidden character or isn't folder")
        }
    })
    return folders
}

function isPostMeta(data: unknown): data is postMeta {
    /**
     * validate if the format of meta.json is correct or not 
     */
    return (
        data != null &&
        typeof data === 'object' &&
        typeof (data as Record<string, unknown>).title === 'string' &&
        typeof (data as Record<string, unknown>).publishedDate === 'string' &&
        typeof (data as Record<string, unknown>).summary === 'string' &&
        (typeof (data as Record<string, unknown>).title === 'string' || typeof (data as Record<string, unknown>).title === undefined)
    );

}

export async function getMeta(post: string): Promise<postMeta> {
    /**
     * given a post slug, give its metadata
     * 
     */
    try {
        const fileDir = path.join(BLOG_POST_DIR, post, "meta.json")
        const rawData = await readFile(fileDir, "utf-8")
        const metaJson: postMeta = JSON.parse(rawData)
        if (!isPostMeta(metaJson)) {
            throw new Error("Incorrect JSON format")
        }
        return metaJson
    }
    catch (err) {
        console.error(err)
        throw new Error("Can't read metadata!")
    }
}

