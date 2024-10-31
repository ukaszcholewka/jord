import { STORAGE } from "@/constants";
import { agonizeAsync } from "@/utils";
import { exec } from "child_process";

type FreeSpace = {
  percent: string,
  mb: string
}

const freeSpace = () => new Promise<FreeSpace>((resolve, reject) => {
  exec(`df -m ./${STORAGE} | grep /dev | awk '{print $5} {print $4}'`, (err, stdout, stderr) => {
    console.log({ err, stdout, stderr })
    if (err) {
      reject(err)
    }

    const [percent, mb] = stdout.split('\n')
    resolve({ percent, mb })
  })
})


export default async function Home() {

  const [err, free] = await agonizeAsync(freeSpace)

  return (
    <div className="flex">
      <div>
        <h3 className="text-3xl">info</h3>
        {!err && (
          <>
            <p>used: {free.percent}</p>
            <p>free: {free.mb}MB</p>
          </>
        )}
      </div>
    </div>
  );
}
