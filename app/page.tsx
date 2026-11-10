// import Image from 'next/image'
// import Link from 'next/link'
import Image from "next/image";
import { PiMapPin } from "react-icons/pi";
import { Button } from "@/components/ui/button/button";
import { PiBookOpen } from "react-icons/pi";
import { listPosts } from "@/util/blogUtil"

export default function Home() {
    return (
        <main className="flex flex-1 w-full flex-col items-center justify-between py-16 px-16 sm:items-start">
            <div className="px-40 py-20">
                <div className="flex flex-row items-center gap-2">
                    <h3 className="pr-2">
                        <i>Hi! </i>
                    </h3>
                    <h3>My name is:</h3>
                </div>
                <h1 className="text-[10rem] -mt-10 -ml-6">Tony Cui</h1>
                <hr className="border-0 h-1 border-t-6 rounded-2xl opacity-50" />
                <h2 className="text-6xl py-5">Software Developer</h2>
                <div className="flex flex-row items-center gap-2">
                    <PiMapPin color="white" size={40} className="shadow-2xl" />
                    <h3>Based in: Brooklyn, NY</h3>
                </div>
            </div>
            <div className="px-40 py-60 w-full">
                <h1>Who am I?</h1>
                <div className="flex-row flex w-full gap-6">
                    <Image
                        src="/img/home/photo.jpg"
                        alt="Its me!"
                        width="400"
                        height="1200"
                        className="rounded-2xl shadow-2xl"
                    />
                    <div className="flex-col w-full flex justify-center gap-2">
                        <div className=" dark-gradient w-full p-5 rounded-2xl flex flex-row text-white ">
                            <p>Hi, My name is Tony Cui, blah blah blah blah blah <br/></p>
                        </div>
                        <div className="flex flex-row gap-2">
                            <Button Icon={PiBookOpen} text="Resume" href="/resources/resume.pdf" />
                            <Button Icon={PiBookOpen} text="Email" href="/" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-40 py-60">
                <h1>Keep up with my thoughts!</h1>
                <div className="w-full flex flex-row">
                    
                </div>  
            </div>
        </main>
    );
}

async function postSlideshow() {
    const recentPosts: string[] = await listPosts();

}