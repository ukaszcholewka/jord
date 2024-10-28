import { TAGS_PATH } from "@/constants"
import { existsSync, mkdirSync } from "fs"

class Tags {
  
  public constructor() {
    if (!existsSync(TAGS_PATH))
      mkdirSync(TAGS_PATH)
  }

  public getTags() {
    const glob = new Bun.Glob(`${TAGS_PATH}/*.json`)
    const tags = glob.scanSync()
    console.log(tags)
  }
}

const tags = new Tags()

export default tags
