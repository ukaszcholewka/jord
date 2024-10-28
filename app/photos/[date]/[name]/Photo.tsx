'use client'

import jordApi, { GetPhotoApiListResponse, PhotosByDayList } from "@/api/JordApi"
import Button from "@/atoms/Button"
import Href from "@/atoms/Href"
import downloadImage from "@/utils/downloadImage"
import { useRouter } from "next/navigation"
import { useCallback, useEffect } from "react"

type PhotoProps = {
  params: {
    date: GetPhotoApiListResponse[number],
    name: string
  },
  photos: PhotosByDayList[],
  next: string | null
  prev: string | null
}

function Photo({ params, photos, next, prev }: PhotoProps) {
  const router = useRouter()

  const onPhotoClose = useCallback(() => {
    router.push('/photos')
  }, [])

  const onRemove = useCallback((date: string, name: string) => async () => {
    await jordApi.onRemovePhoto(date, name)
  }, [])

  const onDownloadImage = useCallback((ext: string) => async () => {
    const name = photos[0].name
    const date = photos[0].date
    await downloadImage(name, date, ext)
  }, [photos])

  useEffect(() => {
    const onKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && next)
        router.push(`/photos/${params.date}/${next}`)
      if (e.key === 'ArrowLeft' && prev)
        router.push(`/photos/${params.date}/${prev}`)
    }

    window.addEventListener('keydown', onKeyPress)
    return () => window.removeEventListener('keydown', onKeyPress)
  }, [])

  return (
    <div>
      <div className="flex h-full gap-4 px-4 flex-col sm:flex-row overflow-auto pb-24 sm:pb-0 justify-between">
        <div className="flex items-center justify-center min-w-[50%] w-full">
          <img
            src={jordApi.getImageUrl(params.date, `${params.name}.webp`, '2048')}
            alt={params.name}
            className="max-w-full max-h-[90vh]"
          />
        </div>
        <div className="min-w-[300px] flex flex-col items-end">
          <div className="flex flex-row">
            {prev && (
              <Href className="mr-0" href={`/photos/${params.date}/${prev}`} prefetch>
                prev
              </Href>
            )}

            {next && (
              <Href href={`/photos/${params.date}/${next}`} prefetch>
                next
              </Href>
            )}
            <Button onClick={onPhotoClose}>close</Button>
          </div>

          <h1 className="text-5xl mb-2 mt-6">{params.name}</h1>
          <Button onClick={onRemove(params.date, params.name)}>remove</Button>
          <h2 className="text-4xl mb-2 mt-6">Download</h2>
          <div>
            {photos.map(({ ext }) => (
              <Button key={ext} onClick={onDownloadImage(ext)}>{ext}</Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Photo
