import { listPosts, getMeta, postMeta } from '@/util/blogUtil'
import { notFound } from 'next/navigation';
import { tagList } from '../_components/tagList/tagList';
import { publishDate } from '../_components/publishDate/publishDate';
import { Suspense } from 'react';
import Image from 'next/image';


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
    <div className="flex grow flex-col max-w-[65%] justify-center gap-10">
      <h1>{postMeta.title}</h1>
      <div className="text-4xl">{tagList(postMeta.tags)}</div>
      <div className="text-4xl">{publishDate(postMeta.publishedDate)}</div>

      <div className='relative w-full h-200 overflow-clip rounded-2xl shadow-2xl'>
        {blogImage(slug, postMeta.image_url, postMeta.image_alt)}
      </div>

      <div className='dark-gradient flex grow flex-col rounded-xl p-20 text-[white] shadow-2xl prose max-w-none w-full'>
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


//TODO: UNIFY BOTH BLOG IMAGE GETTING FUNCTIONS INTO ONE, MAKE IT CORRECT AND ADD A SUSPENSE
function blogImage(slug: string, image_url?: string, image_alt?: string) {
    //image can be externally hosted image, or an image hosted in the directory
    return (
        <Suspense>
            <Image
                fill={true}
                src={
                    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                objectFit="cover"
                alt={image_alt ? image_alt : "Blog Image"}
                id={slug}
            />
        </Suspense>
    );
}
//TODO: have a custom image error handler
function blogImageError() {}