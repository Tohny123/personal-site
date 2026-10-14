import { getThumbPath } from "@/util/imageUtil";
import Image from "next/image";

//simulates slow connections
const delay = (seconds) => new Promise(resolve => setTimeout(resolve, seconds * 1000));

export default async function blogThumb(slug: string) {
    const test = await delay(1);
    console.log(slug);
    const thumbPath: string | null = await getThumbPath(slug)
    if(!thumbPath) {
      return false;
    }
    console.log(thumbPath)
    return (
        <div className="w-full aspect-4/3 bg-purple-600 relative rounded-[20] overflow-clip shadow-2xl ">
            <Image
                fill={true}
                src={
                  thumbPath
                }
                objectFit="cover"
                alt={"Blog Image"}
                id={slug}
            />
        </div>

    );
}
