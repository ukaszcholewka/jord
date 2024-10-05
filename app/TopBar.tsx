'use client'

import Href from "@/atoms/Href"
import { usePathname } from "next/navigation"
import { useCallback } from "react"

const PATHS = {
  Upload: '/upload',
  Photos: '/photos',
} as const

function TopBar() {
  const path = usePathname()

  const isActive = useCallback((pathname: string) => {
    return path.startsWith(pathname)
  }, [path])

  return (
    <>
      <div className="flex justify-center py-2 fixed w-full">
        <Href isActive={isActive(PATHS.Upload)} href={PATHS.Upload}>
          Upload
        </Href>
        <Href isActive={isActive(PATHS.Photos)} href={PATHS.Photos}>
          Photos
        </Href>
      </div>
      <div className="h-12" />
    </>
  )
}

export default TopBar
