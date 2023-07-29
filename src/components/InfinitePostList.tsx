import Link from "next/link"
import InfiniteScroll from "react-infinite-scroll-component"
import { ProfileImage } from "./ProfileImage"
import { MusicPlayer } from "./MusicPlayer"

type Post = {
    id: string
    content: string
    createdAt: Date
    likeCount: number
    likedByMe: boolean
    user: { id: string, image: string | null, name: string }
}

type InfinitePostListProps = {
    isLoading: boolean
    isError: boolean
    hasMore: boolean
    fetchNewPosts: () => Promise<unknown>
    posts?: Post[]
}

export function InfinitePostList({ posts, isError, isLoading, fetchNewPosts, hasMore }: InfinitePostListProps ) {
    if(isLoading) return <h1>Loading posts...</h1>
    if(isError) return <h1>Error!</h1>
    if(posts == null || posts.length === 0) {
        return <h2 className="my-4 text-center text-2xl text-gray-500">No posts.</h2>
    }

    return (
        <ul>
            <InfiniteScroll
                className="flex flex-col float-left min-w-full"
                dataLength={posts.length}
                next={fetchNewPosts}
                hasMore={hasMore}
                loader={"Loading posts..."}>
                    {posts.map(post => {
                        return <PostCard key={post.id} {...post} />;
                    })}
            </InfiniteScroll>
        </ul>
    )
}

const dateTimeFormatter = new Intl.DateTimeFormat(undefined, { timeStyle: "short" });

function PostCard({ id, user, content, createdAt, likeCount, likedByMe }: Post) {
    return (
        <li className="flex max-w-fit float-left m-5 gap-2 rounded-xl ring-1 ring-gray-900/5 shadow-lg bg-white px-4 py-2">
            <Link href={`/profiles/${user.id}`}>
                <ProfileImage src={user.image} />
            </Link>
            <div className="flex flex-grow flex-col">
                <div className="flex gap-1 p-1">
                    <Link 
                        href={`/profiles/${user.id}`}
                        className="font-bold hover:underline focus-visible:underline"
                    >
                        {user.name}
                    </Link>
                    <span className="text-gray-500">{dateTimeFormatter.format(createdAt)}</span>
                </div>
                <p className="whitespace-pre-wrap p-1">{content}</p>
                {/* <MusicPlayer songId="https://soundcloud.com/glennmorrison/beethoven-moonlight-sonata" /> */}
            </div>
        </li>
    );
}