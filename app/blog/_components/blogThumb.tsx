import { getThumbPath } from "@/util/imageUtil";
import Image from "next/image";
import { Suspense, ViewTransition} from "react"
import { PiHourglassHigh } from "react-icons/pi";

export default async function blogThumb(slug: string) {
    const thumbPath: string | null = await getThumbPath(slug);
    if (!thumbPath) {
        return false;
    }
  return (
      <ViewTransition>
        <Suspense fallback={<div className="w-full aspect-4/3 bg-gray-600 flex items-center justify-center rounded-[20]"><PiHourglassHigh size={"50px"} color="white"/></div>}>
              <div className="w-full aspect-4/3 bg-gray-600 relative rounded-[20] overflow-clip shadow-2xl ">
                  <Image
                      fill={true}
                      src={thumbPath}
                      alt={"Blog Image"}
                      id={slug}
                      sizes="(max-width: 480px) 480px, (max-width: 1200px) 1200"
                  />
              </div>
          </Suspense>
      </ViewTransition>

    );
}
