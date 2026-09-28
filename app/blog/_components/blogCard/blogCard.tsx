import { getMeta, postMeta } from "@/util/blogUtil";
import Link from "next/link";
import { tagList } from "../tagList/tagList";
import { publishDate } from "../publishDate/publishDate";
import Image from "next/image";
import { PiHourglass } from "react-icons/pi";
import { Suspense } from "react";

export default async function blogCard(slug: string) {
    const currentPostMeta: postMeta = await getMeta(slug);

    return (
        <Link href={"/blog/" + slug}>
            <div
                className="rounded-2xl w-full flex flex-col gap-3 transition-all duration-250 hover:bg-black/20 p-4"
                key={slug}
            >
                <h2>{currentPostMeta.title}</h2>
                {tagList(currentPostMeta.tags)}
                {publishDate(currentPostMeta.publishedDate)}
                {!currentPostMeta.image_url ? (
                    ""
                ) : (
                    <div className="flex w-full h-80 bg-purple-600 flex-row items-center rounded-[20] relative overflow-clip">
                        {blogImage(
                            slug,
                            currentPostMeta.image_url,
                            currentPostMeta.image_alt,
                        )}
                    </div>
                )}

                <div className="dark-gradient text-white p-4 rounded-2xl ">
                    <p>{currentPostMeta.summary}</p>
                </div>
            </div>
        </Link>
    );
}

function blogImage(slug: string, image_url: string, image_alt?: string) {
    //image can be externally hosted image, or an image hosted in the directory
    return (
        <Suspense>
            <Image
                fill={true}
                src={
                    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                objectFit="cover"
                alt={image_alt ? image_alt : "Blog Image"}
                id={slug}
            />
        </Suspense>
    );
}
//TODO: have a custom image error handler
function blogImageError() {}
