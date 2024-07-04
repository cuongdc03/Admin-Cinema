export const setTokenToLocalStorage = (token: string) => {
    localStorage.setItem('token', JSON.stringify(token))
  }
  
  export const getTokenFromLocalStorage = () => {
    return localStorage.getItem('token') || null
  }
  
  export const removeTokenFromLocalStorage = () => {
    localStorage.removeItem('token')
  }