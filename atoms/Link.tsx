import Link, { LinkProps } from "next/link"
import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"


type LinkComponentProps = {
  children: ReactNode,
  className: string
} & LinkProps

function Href({ children, className, ...props }: LinkComponentProps) {
  return (
    <Link
      {...props}
      className={twMerge(
        `border-white border-y-2 px-4 mx-2
        hover:bg-white hover:text-black`,
        className
      )}
    >
      {children}
    </Link>
  )
}

export default Href
