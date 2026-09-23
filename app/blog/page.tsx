import blogCard from "./_components/blogCard/blogCard"
import { Button } from "@/components/ui/button/button"
import { listPosts } from "@/util/blogUtil"

export default function BlogHome() {
  const currentPosts: string[] = listPosts();
  return (
    <div className="w-full flex flex-col w-full max-w-7xl gap-10">
      <h1>Blog!</h1>
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
