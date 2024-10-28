'use client'

import jordApi from "@/api/JordApi"

async function downloadImage(date: string, name: string, ext: string) {
  const title = `${name}.${ext}`
  const image = await fetch(jordApi.getImageUrl(date, name))
  const blob = await image.blob()
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = `${title}`
  link.click()
}

export default downloadImage
