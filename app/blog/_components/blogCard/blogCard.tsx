import { getMeta, postMeta } from "@/util/blogUtil"
import Link from "next/link"
import { tagList } from "../tagList/tagList"
import { publishDate } from "../publishDate/publishDate"

export default async function blogCard(slug: string) {
    const currentPostMeta: postMeta = await getMeta(slug)

    return (
        <Link href={"/blog/" + slug}>
            <div className= "rounded-2xl w-full flex flex-col gap-3 transition-all duration-250 hover:bg-black/20" key={slug}>
                <h2>{currentPostMeta.title}</h2>
                {tagList(currentPostMeta.tags)}
                {publishDate(currentPostMeta.publishedDate)}
                {!currentPostMeta.image_url ?
                    '' :
                    <div className="flex w-full h-80 bg-purple-600 flex-row items-center rounded-[20]">
                        IMAGE
                    </div>}

                <div className="dark-gradient text-white p-5 rounded-2xl">
                    {currentPostMeta.summary}
                </div>
            </div>
        </Link>
    )
}