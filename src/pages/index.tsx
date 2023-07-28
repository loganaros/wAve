import { InfinitePostList } from "~/components/InfinitePostList";
import { NewPostForm } from "~/components/NewPostForm";
import { api } from "~/utils/api";

export default function Home() {
  return (
    <>
      <header className="flex sticky top-0 z-10 bg-transparent pt-2 justify-center">
        <h1 className="mb-2 px-4 text-3xl font-bold">wAve</h1>
      </header>
      <NewPostForm />
      <RecentPosts />
    </>
  );
}

function RecentPosts() {
  const posts = [];
  
  return <InfinitePostList posts={posts}/>
}