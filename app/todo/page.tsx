import Button from "@/atoms/Button";
import Input from "@/atoms/Input";

export default function ToDo() {


  return (
    <div className="flex items-center mt-4 justify-center">
      <Button
        className="text-2xl"
      >
        Add
      </Button>
      <Input className="text-2xl ml-3" />
    </div>
  )
}
