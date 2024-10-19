import { create } from "zustand";

type StoreState = {
  list: string[],
  toggle: (item: string) => void
}

const usePhotoList = create<StoreState>((set) => ({
  list: [],
  toggle: (item) => set((state) => ({
    list: state.list.includes(item)
      ? state.list.filter((name) => name !== item)
      : [...state.list, item]
  }))
}))

export default usePhotoList

