import axios, { AxiosError } from 'axios'
import { getToken } from '@/lib/utils'

export class AuthService {
  static async login(username: string, password: string) {
    const response: { token: string } | ErrorResponse = await fetch(
      'api/auth/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      },
    ).then(res => res.json())

    if ('code' in response) {
      throw new Error(response.errorMessage)
    }

    return response.token
  }

  static async getUserInfo() {
    const token = getToken()

    if (!token) {
      return
    }

    try {
      const response = await axios.get<User>('api/employees/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return response.data
    } catch (e) {
      const error = e as AxiosError<ErrorResponse>
      if (error.response) {
        const errorStatus = error.response.status
        const errorMessage = error.response.data.errorMessage

        return {
          status: errorStatus,
          errorMessage,
        }
      } else {
        console.log(error)
        return {
          status: 500,
          errorMessage: 'Произошла ошибка при выполнении запроса',
        }
      }
    }
  }

  static async resetPass(email: string) {
    try {
      const response = await axios.post('api/employees/reset-password', {
        email,
      })

      return {
        status: response.status,
        message: 'Вам было отправлено письмо. Проверьту почту',
      }
    } catch (e) {
      const error = e as AxiosError<ErrorResponse>

      if (error.response) {
        const errorStatus = error.response.status
        const errorMessage = error.response.data.errorMessage

        return {
          status: errorStatus,
          errorMessage,
        }
      } else {
        console.log(error)
        return {
          status: 500,
          errorMessage: 'Произошла ошибка при выполнении запроса',
        }
      }
    }
  }

  static async recoverPass(
    verificationCode: string,
    newPassword: string,
    repeatNewPassword: string,
  ) {
    if (newPassword !== repeatNewPassword) {
      return {
        status: 400,
        errorMessage: 'Пароли не совпадают',
      }
    }

    try {
      const response = await axios.post<
        ErrorResponse | ErrorsResponse | ViolationError
      >('api/employees/recover-password', {
        verificationCode,
        newPassword,
        repeatNewPassword,
      })

      return {
        status: response.status,
        data: response.data,
      }
    } catch (e) {
      const error = e as AxiosError<
        ErrorResponse | { errors: ErrorResponse[] } | ViolationError
      >
      if (error.response) {
        // Обработка ошибок, возвращаемых сервером
        const errorData = error.response.data
        let errorMessage = 'Неизвестная ошибка'

        if ('code' in errorData) {
          errorMessage = errorData.errorMessage
        } else if ('errors' in errorData) {
          errorMessage = errorData.errors[0].errorMessage
        } else if ('violations' in errorData) {
          errorMessage = errorData.violations[0].message
        }

        return {
          status: error.response.status,
          errorMessage: errorMessage,
        }
      } else {
        console.log(error)
        return {
          status: 500,
          errorMessage: 'Произошла ошибка при выполнении запроса',
        }
      }
    }
  }
}
