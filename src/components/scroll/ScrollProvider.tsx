import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react'

interface Section {
  id: string
  el: HTMLElement
}

interface ScrollContextValue {
  currentId: string
  sections: React.MutableRefObject<Section[]>
  setCurrentId: (id: string) => void
  register: (id: string, el: HTMLElement) => void
}

const ScrollContext = createContext<ScrollContextValue | null>(null)

export function useScrollContext() {
  const ctx = useContext(ScrollContext)
  if (!ctx) throw new Error('useScrollContext must be used within ScrollProvider')
  return ctx
}

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [currentId, setCurrentId] = useState('')
  const sections = useRef<Section[]>([])
  // Initialize with null so TS knows observer.current might be null
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Create a new IntersectionObserver and assign it to observer.current
    observer.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
              const id = (entry.target as HTMLElement).dataset.sectionId!
              setCurrentId(id)
            }
          })
        },
        { threshold: 0.5 }
    )

    // Observe every section element we’ve registered so far
    sections.current.forEach((s) => {
      if (observer.current) {
        observer.current.observe(s.el)
      }
    })

    return () => {
      // Disconnect only if observer.current is not null
      observer.current?.disconnect()
    }
  }, [])

  const register = (id: string, el: HTMLElement) => {
    // Avoid double‐registering the same id
    if (sections.current.find((s) => s.id === id)) return

    sections.current.push({ id, el })
    el.dataset.sectionId = id

    // Start observing this newly added element
    observer.current?.observe(el)
  }

  return (
      <ScrollContext.Provider value={{ currentId, sections, setCurrentId, register }}>
        {children}
      </ScrollContext.Provider>
  )
}
