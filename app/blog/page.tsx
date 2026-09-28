import blogCard from "./_components/blogCard/blogCard"
import { listPosts } from "@/util/blogUtil"

export default function BlogHome() {
  const currentPosts: string[] = listPosts();
  return (
    <div className="w-full flex flex-col items-center max-w-400 gap-10 p-20">
      <h1 className="w-5/6">Blog!</h1>
      <h3 className="text-white w-5/6 p-2">
        Welcome to my blog! This is where I put my ideas that, at least I think, deserve to be written about. 
      </h3>
      <div className="w-full grid grid-cols-3 gap-4">
        {
          currentPosts.map(slug => (
            blogCard(slug)
          ))
        }
      </div>
    </div>
  )
}
