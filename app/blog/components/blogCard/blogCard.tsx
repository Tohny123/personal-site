import "./blogCard.css"
import { PiCalendarBlank } from "react-icons/pi"

function tagElement() {
    return (
        <div className="rounded-[20] bg-yellow-500 py-1 px-4 text-[15pt]">
            TAG
        </div>
    )
}

export default function blogCard() {
    return (
        <div className="w-full blog-card flex flex-col gap-2">
            <h2>Blog Title</h2>
            <div className="flex flex-row gap-4 text-white items-center">
                Tags:
                <div className="flex flex-row gap-5">
                    {tagElement()}
                    {tagElement()}
                    {tagElement()} {/**again, will be dynamic later */}
                </div>
            </div>
            <div className="flex flex-row gap-2 items-center text-white">
                <PiCalendarBlank />
                Date: <b> Sep, 22, 2026</b>
            </div>
            <div className="flex w-full h-80 bg-purple-600 flex-row items-center rounded-[20]">
                IMAGE
            </div>
            <div className="bg-pink-600 p-5 rounded-[20]">
                lorem ipsum dolor sit amet consectetur adipiscing elit voluptate facere elit rerum consectetur exercitation imperdiet accusamus nisi...
            </div>
        </div>
    )
}