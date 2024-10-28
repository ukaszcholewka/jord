import Link, { LinkProps } from "next/link"
import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"


type LinkComponentProps = {
  children: ReactNode,
  className?: string,
  isActive?: boolean,
  disabled?: boolean
} & LinkProps

function Href({ children, className, isActive = false, ...props }: LinkComponentProps) {
  return (
    <Link
      {...props}
      className={twMerge(
        `border-white border-y-2 px-4 mx-2
        hover:bg-white hover:text-black`,
        isActive && 'italic',
        'disabled:border-gray-500 disabled:text-gray-500',
        className
      )}
    >
      {children}
    </Link>
  )
}

export default Href
