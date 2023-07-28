import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { ProfileImage } from "./ProfileImage"

export default function SideNav() {
    const session = useSession()
    const user = session.data?.user
    return <nav className="sticky top-0 px-10 py-4 min-w-[15%] min-h-screen shadow-2xl bg-white">
        <ul className="flex flex-col items-start gap-4 whitespace-nowrap text-lg divide-y divide-gray-200">
            {user != null && (
                <li>
                    <h1 className="text-2xl">Hi, {user.name}!</h1>
                </li>
            )}
            <li>
                <Link href="/">Home</Link>
            </li>
            {user != null && (
                <li>
                    <Link href={`/profiles/${user.id}`}>My Profile</Link>
                </li>
            )}
            {user == null ? (
                <li>
                    <button onClick={() => void signIn()}>Sign In</button>
                </li>
            ) : <li>
                    <button onClick={() => void signOut()}>Log Out</button>
                </li>}
        </ul>
    </nav>
}