import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

type ButtonProps = {
  children: ReactNode,
  hideBorder?: boolean
} & JSX.IntrinsicElements['button']

function Button({
  children,
  className,
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
        className
      )}
    >
      {children}
    </button>
  )
}

export default Button
