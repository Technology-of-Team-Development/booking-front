import axiosInstance from '@/api/api'
import type { AxiosError } from 'axios'

export class PlaceService {
  static async getAll(date: string) {
    try {
      const response = await axiosInstance.get<Place[]>(
        `places/map?date=${date}`,
      )

      return response.data
    } catch (e) {
      console.log(e)
    }
  }

  static async book(placeId: number, bookingDate: string, code: string) {
    try {
      const response = await axiosInstance.post('bookings/places', {
        placeId,
        bookingDate,
      })
      return {
        status: response.status,
        errorMessage: '',
      }
    } catch (e) {
      const error = e as AxiosError<ErrorsResponse | ViolationError>

      if (!error.response) {
        return {
          status: 500,
          errorMessage: 'Произошла ошибка при выполнении запроса',
        }
      }

      if ('violations' in error.response.data) {
        // Если место не найдено, пытаемся создать его
        await this.createPlace(placeId, bookingDate, code)
      } else {
        console.log(error.response)
        return {
          status: 500,
          errorMessage: error.response.data.errors[0].errorMessage,
        }
      }
    }
  }

  static async createPlace(placeId: number, bookingDate: string, code: string) {
    try {
      await axiosInstance.post('places', {
        code,
      })

      // После создания места, повторно пытаемся забронировать
      await PlaceService.book(placeId, bookingDate, code)
    } catch (createError) {
      const createAxiosError = createError as AxiosError<ErrorResponse>

      if (createAxiosError.response) {
        return {
          status: createAxiosError.response.status,
          errorMessage: createAxiosError.response.data.errorMessage,
        }
      } else {
        return {
          status: 500,
          errorMessage: 'Произошла ошибка при выполнении запроса',
        }
      }
    }
  }
}
