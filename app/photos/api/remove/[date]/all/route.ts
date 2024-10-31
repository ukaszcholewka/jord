import { APP_URL } from "@/api/JordApi"
import { revalidatePath } from "next/cache"

export async function POST(
  request: Request,
  { params }: { params: { date: string } }
) {
  const images = await request.json() as string[] || []

  for await (const image of images) {
    await fetch(`${APP_URL}/photos/api/remove/${params.date}/${image}`)
  }

  revalidatePath('/photos', 'page')
  return new Response(null, {
    status: 200
  })
}
