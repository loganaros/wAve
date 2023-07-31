import { InfinitePostList } from "~/components/InfinitePostList";
import { NewPostForm } from "~/components/NewPostForm";
import { api } from "~/utils/api";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  return (
    <>
      <header className="flex flex-col sticky top-0 z-10 bg-transparent pt-2 justify-center">
        <Image className="self-center" src="https://svgur.com/i/vyg.svg" width={128} height={64} alt="Logo" />
      </header>
      <NewPostForm />
      <RecentPosts />
    </>
  );
}

function RecentPosts() {
  const posts = api.post.infiniteFeed.useInfiniteQuery({}, { getNextPageParam: lastPage => lastPage.nextCursor });
  
  return ( 
    <InfinitePostList 
      posts={posts.data!.pages.flatMap((page) => page.posts)!}
      isError={posts.isError}
      isLoading={posts.isLoading}
      hasMore={posts.hasNextPage}
      fetchNewPosts={posts.fetchNextPage}
    />
  );
}