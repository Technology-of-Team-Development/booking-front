import { createGlobalState } from '@vueuse/core'
import { ref } from 'vue'
import { PlaceService } from '@/api/places'

// type Placee = {
//   title: string
//   free: boolean
// }
//
// type Desk = {
//   leftPlaces: Placee[]
//   rightPlaces: Placee[]
//   vertical?: boolean
// }

const PossibleDesks: {
  placeCode: string
  maxPlaces: number
  vertical?: boolean
}[] = [
  { placeCode: 'A', maxPlaces: 10 },
  { placeCode: 'B', maxPlaces: 6 },
  { placeCode: 'C', maxPlaces: 10 },
  { placeCode: 'D', maxPlaces: 6 },
  { placeCode: 'E', maxPlaces: 2 },
  { placeCode: 'F', maxPlaces: 8 },
  { placeCode: 'G', maxPlaces: 8 },
  { placeCode: 'H', maxPlaces: 8 },
  { placeCode: 'I', maxPlaces: 8 },
]

function comparePlaceCodes(a: Place, b: Place): number {
  const codeA = a.placeCode
  const codeB = b.placeCode

  const letterA = codeA.match(/[A-Za-z]+/)?.[0] || ''
  const numberA = parseInt(codeA.match(/\d+/)?.[0] || '0', 10)

  const letterB = codeB.match(/[A-Za-z]+/)?.[0] || ''
  const numberB = parseInt(codeB.match(/\d+/)?.[0] || '0', 10)

  if (letterA < letterB) return -1
  if (letterA > letterB) return 1

  if (numberA < numberB) return -1
  if (numberA > numberB) return 1

  return 0
}

export const useDeskState = createGlobalState(() => {
  // const topDesks = ref<Desk[]>([
  //   {
  //     leftPlaces: [
  //       { title: 'A1', free: true },
  //       { title: 'A2', free: true },
  //       { title: 'A3', free: true },
  //       { title: 'A4', free: true },
  //       { title: 'A5', free: true },
  //     ],
  //
  //     rightPlaces: [
  //       { title: 'A6', free: true },
  //       { title: 'A7', free: true },
  //       { title: 'A8', free: true },
  //       { title: 'A9', free: true },
  //       { title: 'A10', free: true },
  //     ],
  //   },
  //
  //   {
  //     leftPlaces: [
  //       { title: 'B1', free: true },
  //       { title: 'B2', free: true },
  //       { title: 'B3', free: true },
  //     ],
  //
  //     rightPlaces: [
  //       { title: 'B4', free: true },
  //       { title: 'B5', free: true },
  //       { title: 'B6', free: true },
  //     ],
  //   },
  //
  //   {
  //     leftPlaces: [
  //       { title: 'C1', free: true },
  //       { title: 'C2', free: true },
  //       { title: 'C3', free: true },
  //       { title: 'C4', free: true },
  //       { title: 'C5', free: true },
  //     ],
  //
  //     rightPlaces: [
  //       { title: 'C6', free: true },
  //       { title: 'C7', free: true },
  //       { title: 'C8', free: true },
  //       { title: 'C9', free: true },
  //       { title: 'C10', free: true },
  //     ],
  //   },
  //
  //   {
  //     leftPlaces: [
  //       { title: 'D1', free: true },
  //       { title: 'D2', free: true },
  //       { title: 'D3', free: true },
  //     ],
  //
  //     rightPlaces: [
  //       { title: 'D4', free: true },
  //       { title: 'D5', free: true },
  //       { title: 'D6', free: true },
  //     ],
  //   },
  //
  //   {
  //     leftPlaces: [{ title: 'E1', free: true }],
  //
  //     rightPlaces: [{ title: 'E4', free: true }],
  //
  //     vertical: true,
  //   },
  // ])
  // const bottomDesks = ref<Desk[]>([
  //   {
  //     leftPlaces: [
  //       { title: 'F1', free: true },
  //       { title: 'F2', free: true },
  //       { title: 'F3', free: true },
  //       { title: 'F4', free: true },
  //     ],
  //     rightPlaces: [
  //       { title: 'F5', free: true },
  //       { title: 'F6', free: true },
  //       { title: 'F7', free: true },
  //       { title: 'F8', free: true },
  //     ],
  //   },
  //   {
  //     leftPlaces: [
  //       { title: 'G1', free: true },
  //       { title: 'G2', free: true },
  //       { title: 'G3', free: true },
  //       { title: 'G4', free: true },
  //     ],
  //     rightPlaces: [
  //       { title: 'G5', free: true },
  //       { title: 'G6', free: true },
  //       { title: 'G7', free: true },
  //       { title: 'G8', free: true },
  //     ],
  //   },
  //   {
  //     leftPlaces: [
  //       { title: 'H1', free: true },
  //       { title: 'H2', free: true },
  //       { title: 'H3', free: true },
  //       { title: 'H4', free: true },
  //     ],
  //     rightPlaces: [
  //       { title: 'H5', free: true },
  //       { title: 'H6', free: true },
  //       { title: 'H7', free: true },
  //       { title: 'H8', free: true },
  //     ],
  //   },
  //   {
  //     leftPlaces: [
  //       { title: 'I1', free: true },
  //       { title: 'I2', free: true },
  //       { title: 'I3', free: true },
  //       { title: 'I4', free: true },
  //     ],
  //     rightPlaces: [
  //       { title: 'I5', free: true },
  //       { title: 'I6', free: true },
  //       { title: 'I7', free: true },
  //       { title: 'I8', free: true },
  //     ],
  //   },
  // ])

  const tDesks = ref<Desk[]>([])

  const bDesks = ref<Desk[]>([])

  function getTopDesks(): Desk[] {
    tDesks.value.forEach(desk => {
      desk.places.sort(comparePlaceCodes)
    })

    return tDesks.value
  }

  function getBottomDesks() {
    bDesks.value.forEach(desk => {
      desk.places.sort(comparePlaceCodes)
    })

    return bDesks.value
  }

  // function bookPlace(title: string) {
  //   const titleIdx = +title.slice(1)
  //
  //   let placeIdx = -1
  //
  //   topDesks.value.forEach(desk => {
  //     if (titleIdx <= desk.leftPlaces.length) {
  //       placeIdx = desk.leftPlaces.findIndex(p => p.title === title)
  //       if (placeIdx !== -1) {
  //         desk.leftPlaces[placeIdx].free = false
  //
  //         return
  //       }
  //     } else {
  //       placeIdx = desk.rightPlaces.findIndex(p => p.title === title)
  //
  //       if (placeIdx !== -1) {
  //         desk.rightPlaces[placeIdx].free = false
  //
  //         return
  //       }
  //     }
  //   })
  //
  //   bottomDesks.value.forEach(desk => {
  //     if (titleIdx <= desk.leftPlaces.length) {
  //       placeIdx = desk.leftPlaces.findIndex(p => p.title === title)
  //
  //       if (placeIdx !== -1) {
  //         desk.leftPlaces[placeIdx].free = false
  //         return
  //       }
  //     } else {
  //       placeIdx = desk.rightPlaces.findIndex(p => p.title === title)
  //
  //       if (placeIdx !== -1) {
  //         desk.rightPlaces[placeIdx].free = false
  //
  //         return
  //       }
  //     }
  //   })
  // }

  async function initDesks() {
    const today = new Date().toISOString().split('T')[0]
    const data = await PlaceService.getAll(today)

    if (!data) return

    PossibleDesks.forEach((pDesk, idx) => {
      const desk: Desk = { places: [], maxPlaces: -1 }

      data.forEach(place => {
        const placeCode = place.placeCode[0]

        if (pDesk.vertical) {
          desk.vertical = true
        }

        if (pDesk.placeCode == placeCode) {
          desk.maxPlaces = pDesk.maxPlaces
          desk.places.push(place)
        }
      })

      if (idx < 5) tDesks.value.push(desk)
      else bDesks.value.push(desk)
    })
  }

  // function getAllTitles() {
  //   const titles: string[] = []
  //
  //   topDesks.value.forEach(desk => {
  //     desk.leftPlaces.forEach(place => {
  //       titles.push(place.title)
  //     })
  //     desk.rightPlaces.forEach(place => {
  //       titles.push(place.title)
  //     })
  //   })
  //
  //   bottomDesks.value.forEach(desk => {
  //     desk.leftPlaces.forEach(place => {
  //       titles.push(place.title)
  //     })
  //     desk.rightPlaces.forEach(place => {
  //       titles.push(place.title)
  //     })
  //   })
  //
  //   return titles
  // }

  return { getBottomDesks, getTopDesks, initDesks }
})
