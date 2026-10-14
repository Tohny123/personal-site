import { listPosts, getMeta, postMeta } from "@/util/blogUtil";
import { notFound } from "next/navigation";
import { tagList } from "../_components/tagList";
import { publishDate } from "../_components/publishDate";
import blogThumb  from '../_components/blogThumb'
import { Suspense } from "react";

//this is async because we need to wait for the slug to resolve in the generateStaticParams before we can use it
export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const { default: Post } = await import(
        `@/content/blogPosts/${slug}/content.mdx`
    );
    const postMeta: postMeta = await getMeta(slug);
    //each blog post uses the styling contained here VVV
    return (
        <div className="flex grow flex-col max-w-[65%] justify-center gap-10">
            <h1>{postMeta.title}</h1>
            <div className="text-4xl flex flex-col gap-10">
                {tagList(postMeta.tags)}
                {publishDate(postMeta.publishedDate)}
            </div>

              <Suspense>
                {blogThumb(slug)}
              </Suspense>
            {/*PROSE IS REALLY IMPORTANT, basically it populates the md file with the corresponding html styled elements*/}
            <div className="dark-gradient flex grow flex-col rounded-xl p-10 text-[white] shadow-2xl prose max-w-none w-full">
                <Post />
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    //gets all the posts from the blog_post_dir, and each posts gets its own dir
    const currentPosts = await listPosts();
    const params: { slug: string }[] = [];
    try {
        currentPosts.forEach((post) => {
            params.push({ slug: post });
        });
    } catch (err) {
        console.error(err);
        notFound();
    }

    return params;
}

export const dynamicParams = false;
