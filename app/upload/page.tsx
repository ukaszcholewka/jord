'use client'

import Button from "@/atoms/Button"
import { useMutation } from "@tanstack/react-query"
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"
import Query from "../Query"


type FileUploadState = {
  status: 'uploading' | 'done' | 'idle',
  file: File
}

function Upload() {
  const [photos, setPhotos] = useState<FileUploadState[] | null>(null)
  const photoInputRef = useRef<HTMLInputElement>(null)

  const uploadPhotos = useCallback(() => {
    photoInputRef.current?.click()
  }, [])

  const onPhotoChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target

    if (!files) return

    const photos = Array.from(files).map((item) => ({
      status: 'idle',
      file: item
    })) satisfies FileUploadState[]

    setPhotos(photos)
  }, [])


  useEffect(() => {
    if (photos === null) return
    const next = photos.find(({ status }) => status === 'idle')

    if (!next) return
    console.log(next)

    const data = new FormData()
    data.append('files', next?.file)

    fetch('/upload/api', {
      method: "POST",
      body: data
    })
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
