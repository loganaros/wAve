import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import { ProfileImage } from "./ProfileImage"
import { IconHoverEffect } from "./IconHoverEffect"
import { VscAccount, VscHome, VscSignIn, VscSignOut } from "react-icons/vsc"

export default function SideNav() {
    const session = useSession()
    const user = session.data?.user
    return <nav className="sticky top-0 px-10 py-4 min-w-[15%] min-h-screen shadow-2xl bg-gradient-to-br from-pink-200 to-yellow-200">
        <ul className="flex flex-col items-start gap-4 whitespace-nowrap text-lg">
            {user != null && (
                <li>
                    <span className="flex items-center gap-4">
                        <ProfileImage src={user.image}/>
                        <span className="hidden text-2xl md:inline">
                            Hi, {user.name}!
                        </span>
                    </span>
                </li>
            )}
            <li>
                <Link href="/">
                    <IconHoverEffect>
                        <span className="flex items-center gap-4">
                            <VscHome className="h-8 w-8" />
                            <span className="hidden text-lg md:inline">
                                Home
                            </span>
                        </span>
                    </IconHoverEffect>
                </Link>
            </li>
            {user != null && (
                <li>
                    <Link href={`/profiles/${user.id}`}>
                        <IconHoverEffect>
                            <span className="flex items-center gap-4">
                                <VscAccount className="h-8 w-8" />
                                <span className="hidden text-lg md:inline">
                                    My Profile
                                </span>
                            </span>
                        </IconHoverEffect>
                    </Link>
                </li>
            )}
            {user == null ? (
                <li>
                    <button onClick={() => void signIn('spotify')}>
                        <IconHoverEffect>
                            <span className="flex items-center gap-4">
                                <VscSignIn className="h-8 w-8 fill-green-700" />
                                <span className="hidden text-lg md:inline text-green-700">
                                    Log In
                                </span>
                            </span>
                        </IconHoverEffect>
                    </button>
                </li>
            ) : <li>
                    <button onClick={() => void signOut()}>
                        <IconHoverEffect>
                            <span className="flex items-center gap-4">
                                <VscSignOut className="h-8 w-8 fill-red-700" />
                                <span className="hidden text-lg md:inline text-red-700">
                                    Log Out
                                </span>
                            </span>
                        </IconHoverEffect>
                    </button>
                </li>}
        </ul>
        <div className="absolute bottom-5">
            <Image src="https://svgur.com/i/vyg.svg" width={64} height={32} alt="Logo" />
        </div> 
    </nav>
}