// Getter & Setter for token in local storage
export const setToken = (token: string) => {
    localStorage.setItem('token', token)
}
  
export const getToken = () => {
    return localStorage.getItem('token')
}
  
export const clearToken = () => {
    localStorage.removeItem('token')
}
  