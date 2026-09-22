import blogCard from "./components/blogCard/blogCard"
export default function BlogHome() {
  return (
    <div className="w-full flex flex-col w-full max-w-7xl gap-10">
      <h1>Blog!</h1>
      <div className="w-full grid grid-cols-3 gap-4">
        {blogCard()} {blogCard()} {blogCard()} {blogCard()} {blogCard()} {blogCard()} {blogCard()} {blogCard()} {blogCard()} {blogCard()} {/**Temporary blog for layout Will be dynamic later*/}
      </div>
    </div>
  )
}
