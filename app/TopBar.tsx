'use client'

import Href from "@/atoms/Href"
import { usePathname } from "next/navigation"
import { useCallback } from "react"

const PATHS = {
  Home: '/',
  Upload: '/upload',
  Photos: '/photos',
} as const

function TopBar() {
  const path = usePathname()

  const isActive = useCallback((pathname: string) => {
    if (pathname !== '/')
      return path.startsWith(pathname)
    return path === '/'
  }, [path])

  return (
    <>
      <div
        className="flex justify-center py-2 fixed w-full ml-[-16px]"
        style={{ backdropFilter: 'blur(16px)' }}
      >
        <Href prefetch={false} isActive={isActive(PATHS.Home)} href={PATHS.Home}>
          Home
        </Href>
        <Href isActive={isActive(PATHS.Upload)} href={PATHS.Upload}>
          Upload
        </Href>
        <Href prefetch={false} isActive={isActive(PATHS.Photos)} href={PATHS.Photos}>
          Photos
        </Href>
      </div>
      <div className="h-12" />
    </>
  )
}

export default TopBar
