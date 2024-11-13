/* eslint-disable @typescript-eslint/no-unused-vars */

type User = {
  fullname: string
  email: string
  password: string
}

type MyResponse = {
  error: boolean
  message: string
}

type MyReport = {
  surname: string
  name: string
  team: string
  place: string
  date: string
}

type AvailablePagesNames =
  | 'map'
  | 'report'
  | 'employee'
  | 'meeting'
  | 'settings'
