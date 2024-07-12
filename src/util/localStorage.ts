export const setTokenToLocalStorage = (token: string) => {
    localStorage.setItem('token', JSON.stringify(token))
  }
  
  export const getTokenFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('token') || '')
  }
  
  export const removeTokenFromLocalStorage = () => {
    localStorage.removeItem('token')
  }