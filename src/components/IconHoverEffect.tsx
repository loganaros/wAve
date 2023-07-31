import { ReactNode } from "react"

type IconHoverEffectProps = {
    children: ReactNode
    red?: boolean
}

export function IconHoverEffect({ children, red = false }: IconHoverEffectProps) {
    const colorClasses = red ? "outline-red-400 hover:bg-red-200 group-hover-bg-red-200 group-focus-visible:bg-red-200 focus-visible:bg-red-200" :
                               "outline-white hover:bg-white group-hover-bg-white group-focus-visible:bg-white focus-visible:bg-white"
    return <div className={`rounded-full p-2 transition-colors duration-100 ${colorClasses}`}>{children}</div>
}