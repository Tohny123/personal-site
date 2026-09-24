import { listPosts, getMeta, postMeta } from '@/util/blogUtil'
import { notFound } from 'next/navigation';
import { tagList } from '../_components/tagList/tagList';
import { publishDate } from '../_components/publishDate/publishDate';
import "./blogPage.css"
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  //PROSE IS REALLY IMPORTANT

  const { default: Post } = await import(`@/content/blogPosts/${slug}/content.mdx`);
  const postMeta: postMeta = await getMeta(slug)

  return (
    <div className="flex grow flex-col max-w-[75%] justify-center gap-10">
      <h1>{postMeta.title}</h1>
      <h4 className="text-4xl">{tagList(postMeta.tags)}</h4>
      <h4 className="text-4xl">{publishDate(postMeta.publishedDate)}</h4>
      <div className='blog-text prose max-w-none w-full'>
        <Post />
      </div>
    </div>
  );
}

export function generateStaticParams() {
  const currentPosts = listPosts()
  const params: { slug: string }[] = []
  try {
    currentPosts.forEach(post => {
      params.push({ slug: post })
    });
  } catch (err) {
    console.error(err)
    notFound()
  }


  return params; //idealy, this should automatically search through the "content" directory and fetch all the file names, and use that as the slug
}

export const dynamicParams = false;
