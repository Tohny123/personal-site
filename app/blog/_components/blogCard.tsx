import { getMeta, postMeta } from "@/util/blogUtil";
import Link from "next/link";
import { tagList } from "./tagList";
import { publishDate } from "./publishDate";
import { Suspense } from "react";
import blogThumb  from './blogThumb'

//TODO: this might need to be moved into the general "page.tsx" file, since it really ONLY gets used here, unless maybe use this for the homepage?? then move to components

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
                    {blogThumb(slug)}
                    <div className="dark-gradient text-white p-4 rounded-2xl ">
                        <p>{currentPostMeta.summary}</p>
                    </div>
                </div>
            </Link>
    );
}
