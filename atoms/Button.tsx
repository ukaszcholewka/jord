import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

type ButtonProps = {
  children: ReactNode,
  hideBorder?: boolean
  isActive?: boolean
} & JSX.IntrinsicElements['button']

function Button({
  children,
  className,
  isActive = false,
  hideBorder = false,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        `border-white border-y-2 px-4 mx-2,
        hover:bg-white hover:text-black`,
        hideBorder && 'border-none',
        isActive && 'bg-white text-black hover:bg-black hover:text-white',
        className
      )}
    >
      {children}
    </button>
  )
}

export default Button
