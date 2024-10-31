import { twMerge } from "tailwind-merge"

type InputProps = {
  className?: string
} & JSX.IntrinsicElements['input']

export default function Input({
  className,
  ...props
}: InputProps) {
  return (
    <input
      {...props}
      className={twMerge(
        className,
        'bg-black text-white border-b-white border-b-2 border-dotted'
      )}
    />
  )
}
