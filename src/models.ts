/* eslint-disable @typescript-eslint/no-unused-vars */

type User = {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  middleName: string
  avatar: string
  position: string
  team: string
}

type MyReport = {
  surname: string
  name: string
  team: string
  place: string
  date: string
}

type ErrorResponse = {
  code: string
  errorMessage: string
}

type ViolationError = {
  violations: { fieldName: string; message: string }[]
}

type ErrorsResponse = {
  errors: ErrorResponse[]
}

type Place = {
  placeId: number
  placeCode: string
  booking: {
    id: number
    bookingDate: string
    employee: User
    placeCode: string
  } | null
  isLocked: boolean
  hasSchedule: boolean
}

type Desk = {
  vertical?: boolean
  places: Place[]
  maxPlaces: number
}
