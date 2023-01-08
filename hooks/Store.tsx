import { createContext, useContext, useMemo, useState } from 'react'

interface StateInterface {
  coverMuted: boolean
  toggleCoverMuted: any
}

const initialState = {
  coverMuted: false,
  toggleCoverMuted: () => {},
}

const Store = createContext<any>(initialState)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [coverMuted, setCoverMuted] = useState(false)

  const toggleCoverMuted = () => setCoverMuted(!coverMuted)
  const value = useMemo(
    () => ({
      coverMuted,
      setCoverMuted,
    }),
    [coverMuted],
  )
  return <Store.Provider value={value}>{children}</Store.Provider>
}

export default function useStore() {
  return useContext(Store)
}
