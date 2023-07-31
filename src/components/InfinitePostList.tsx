import Link from "next/link"
import InfiniteScroll from "react-infinite-scroll-component"
import { ProfileImage } from "./ProfileImage"
import { getToken } from "next-auth/jwt"
import { useSession } from "next-auth/react"
import { VscHeart, VscHeartFilled } from "react-icons/vsc"
import { IconHoverEffect } from "./IconHoverEffect"
import { api } from "~/utils/api"
import { LoadingSpinner } from "./LoadingSpinner"

interface Post {
    id: string
    content: string
    createdAt: Date
    likeCount: number
    likedByMe: boolean
    user: { id: string, image: string | null, name: string | null }
}

interface InfinitePostListProps {
    posts: Post[]
    isLoading: boolean
    isError: boolean
    hasMore: boolean | undefined
    fetchNewPosts: () => Promise<unknown>
}

export function InfinitePostList({ posts, isError, isLoading, fetchNewPosts, hasMore }: InfinitePostListProps ) {
    if(isLoading) return <LoadingSpinner />
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
                hasMore={hasMore ?? false}
                loader={<LoadingSpinner />}>
                    {posts.map(post => {
                        return <PostCard key={post.id} {...post} />;
                    })}
            </InfiniteScroll>
        </ul>
    )
}

const dateTimeFormatter = new Intl.DateTimeFormat(undefined, { timeStyle: "short" });

function PostCard({ id, user, content, createdAt, likeCount, likedByMe }: Post) {
    const trpcUtils = api.useContext();
    const toggleLike = api.post.toggleLike.useMutation({ onSuccess: ({ addedLike }) => {
        const updateData: Parameters<typeof trpcUtils.post.infiniteFeed.setInfiniteData>[1] = (oldData) => {
            if(oldData == null) return

            const countModifier = addedLike ? 1 : -1

            return {
                ...oldData,
                pages: oldData.pages.map(page => {
                    return {
                        ...page,
                        posts: page.posts.map(post => {
                            if(post.id === id) {
                                return {
                                    ...post,
                                    likeCount: post.likeCount + countModifier,
                                    likedByMe: addedLike
                                }
                            }

                            return post
                        })
                    }
                })
            }
        }
        
        trpcUtils.post.infiniteFeed.setInfiniteData({ }, updateData);
        trpcUtils.post.infiniteFeed.setInfiniteData({ onlyFollowing: true }, updateData);
        trpcUtils.post.infiniteProfileFeed.setInfiniteData({ userId: user.id }, updateData);

    }})

    function handleToggleLike() {
        toggleLike.mutate({ id });
    }

    return (
        <li className={`flex max-w-fit m-5 gap-2 rounded-xl ring-1 ring-gray-900/5 shadow-lg bg-white px-4 py-2`}>
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
                <HeartButton onClick={handleToggleLike} isLoading={toggleLike.isLoading} likedByMe={likedByMe} likeCount={likeCount} />
            </div>
        </li>
    );
}

interface HeartButtonProps {
    onClick: () => void
    isLoading: boolean
    likedByMe: boolean
    likeCount: number
}

function HeartButton({ onClick, isLoading, likedByMe, likeCount }: HeartButtonProps) {
    const session = useSession()
    const HeartIcon = likedByMe ? VscHeartFilled : VscHeart

    if(session.status !== "authenticated") {
        return <div className="mb-1 p-1 mt-1 flex items-center gap-3 self-start text-gray-500">
            <HeartIcon />
            <span>{ likeCount }</span>
        </div>
    }

    return (
        <button disabled={isLoading} onClick={onClick} className={`group -ml-2 items-center gap-1 p-1 self-start flex transition-colors duration-100 ${likedByMe ? "text-red-500" : "text-gray-500 hover:text-red-500 focus-visible:text-red-500"}`}>
            <IconHoverEffect red>
                <HeartIcon className={`transition-colors duration-100 ${likedByMe ? "fill-red-500" : "fill-gray-500 group-hover:fill-red-500 grouop-focus-visible:fill-red-500"}`}/>
            </IconHoverEffect>
            <span>{likeCount}</span>
        </button>
    );
}