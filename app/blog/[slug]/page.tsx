import { listPosts, getMeta, postMeta } from '@/util/blogUtil'
import { notFound } from 'next/navigation';
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
    <div>
      <h1>Title: {postMeta.title}</h1>
      <div className='prose bg-gray-500'> 
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
