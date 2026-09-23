import "./blogCard.css"
import { PiCalendarBlank } from "react-icons/pi"
import { getMeta, postMeta } from "@/util/blogUtil"
import Link from "next/link"

function tagElement() {
    return (
        <div className="rounded-[20] bg-yellow-500 py-1 px-4 text-[15pt]">
            TAG
        </div>
    )
}

export default async function blogCard(slug: string) {
    const currentPostMeta: postMeta = await getMeta(slug)

    //date
    const postDate: Date = new Date(currentPostMeta.publishedDate);
    const formattedDate = postDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });


    return (
        <Link href={"/blog/" + slug}>

            <div className="w-full blog-card flex flex-col gap-2" key={slug}>
                <h2>{currentPostMeta.title}</h2>
                <div className="flex flex-row gap-4 text-white items-center">
                    Tags:
                    <div className="flex flex-row gap-5">
                        {tagElement()}
                        {tagElement()}
                        {tagElement()} {/**again, will be dynamic later */}
                    </div>
                </div>
                <div className="flex flex-row gap-2 items-center text-white text-1">
                    <PiCalendarBlank />
                    Date: <b> {formattedDate}</b>
                </div>
                {
                    !currentPostMeta.image_url ?
                        '' :
                        <div className="flex w-full h-80 bg-purple-600 flex-row items-center rounded-[20]">
                            IMAGE
                        </div>
                }


                <div className="bg-pink-600 p-5 rounded-[20]">
                    {currentPostMeta.summary}
                </div>
            </div>
        </Link>
    )
}