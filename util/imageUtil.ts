import fs from "fs";
//TODO: for the blog image url, check if the image exists in the public/img/blogCover folder, by default the title image should be named after the blog post,
// if there are many images in a single blog post, make own folder for it in the blogImg folder
//TODO: we don't really need to check the image_url anymore, since i can just check the fs for if a cover
// image alt can just be the cover, and the hover can be a replacement
// Try and refactor all the functions so they are using the server, and are async (e.g. 'use server' is on top of the file) this is fs stuff, so i don't want this done anywhere near the client
//

// this should read the /blogPosts directory, get all the files, and provide a buncha resources, (like a list of slugs or the ability to get the last modified date / created date)

const BLOG_THUMB_DIR = "/img/blogThumb"; //maybe just have this be a partial directory, since static things are already hosted on the site
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

export async function getImg() {

}
