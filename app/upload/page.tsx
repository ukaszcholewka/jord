'use client'

import Button from "@/atoms/Button"
import { useMutation } from "@tanstack/react-query"
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"


type FileUploadState = {
  done: boolean,
  file: File
}

function Upload() {
  const [photos, setPhotos] = useState<FileUploadState[] | null>(null)
  const photoInputRef = useRef<HTMLInputElement>(null)

  // const mutation = useMutation({
  //   mutationFn: () => {
  //     return fetch('/upload/api', {})
  //   }
  // })

  const uploadPhotos = useCallback(() => {
    photoInputRef.current?.click()
  }, [])

  const onPhotoChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target

    if (!files) return

    const photos = Array.from(files).map((item) => ({
      done: false,
      file: item
    }))

    setPhotos(photos)
  }, [])


  useEffect(() => {
    if (photos === null) return
    const allDone = !photos.find(({ done }) => done === false)
    if (allDone) return

    const next = photos.find(({ done }) => done === false)
    console.log(next)
  }, [photos])

  return (
    <div>
      <Button onClick={uploadPhotos} hideBorder className="text-5xl">Photos</Button>
      <input onChange={onPhotoChange} ref={photoInputRef} hidden multiple type="file" />

      {photos && (
        <div className="flex gap-2 px-5 mt-6">
          {photos.map(({ file, done }) => (
            <div key={file.name}>{file.name}</div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Upload
