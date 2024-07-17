import { UserLogin } from '../types/user'
import { customFetch, showError } from '../util/http'
import { USER_URL } from './constant'

export const login = async (data: UserLogin): Promise<any> => {
  return await customFetch
    .post(`${USER_URL}/login`, {
      body: data,
      signalKey: 'login'
    })
    .catch(showError)
}
