'use client'

import Button from "@/atoms/Button"
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"

type FileStatus = 'uploading' | 'done' | 'idle' | 'error'

type FileUploadState = {
  status: FileStatus,
  file: File
}

const uploadImage = async (data: FormData) => {
  const response = await fetch('/upload/api', {
    method: "POST",
    body: data
  })
  const json = await response.json()
  return json as { status: FileStatus }
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
    if (photos.find(({status}) => status === 'uploading')) return

    const next = photos.find(({ status }) => status === 'idle')
    if (!next) return

    const data = new FormData()
    data.append('files', next?.file)

    next.status = 'uploading'
    setPhotos([...photos])
    uploadImage(data).then((res) => {
      next.status = res.status
      setPhotos([...photos])
    })
  }, [photos])

  return (
    <div>
      <Button onClick={uploadPhotos} hideBorder className="text-5xl">Photos</Button>
      <input accept="image/*" onChange={onPhotoChange} ref={photoInputRef} hidden multiple type="file" />

      {photos && (
        <div className="flex gap-2 px-5 mt-6">
          {photos.map(({ file, status }) => (
            <div className={`px-2
              ${status === 'done' && 'bg-white text-black'} 
              ${status === 'error' && 'bg-red-700 text-black'} 
              ${status === 'uploading' && 'bg-gray-700 text-black'}
            `} key={file.name}>
              {file.name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Upload
