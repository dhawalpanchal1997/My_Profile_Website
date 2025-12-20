"use client"

import { useEffect, useState } from "react"

export function useScrollSpy(
  sectionIds: string[],
  offset = 120 // MUST match navbar height
) {
  const [activeId, setActiveId] = useState(sectionIds[0])

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    if (!sections.length) return

    const onScroll = () => {
      let current = sections[0].id

      for (const section of sections) {
        const rect = section.getBoundingClientRect()

        if (rect.top <= offset) {
          current = section.id
        }
      }

      setActiveId(current)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [sectionIds, offset])

  return activeId
}
