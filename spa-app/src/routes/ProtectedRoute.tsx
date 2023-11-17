import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getToken } from '../utils/token'
import { decodeToken, isExpired } from 'react-jwt'

type ProtectedRouteProps = {
  role: boolean;
  children: JSX.Element
}

interface DecodedToken {
    uid: string;
    isAdmin: boolean;
    username: number;
    ProfilePicDirectory: string;
    email: string;
  }

const ProtectedRoute = ({ role, children }: ProtectedRouteProps) => {
  const token = getToken()
  const navigate = useNavigate()

  if (!token) {
    throw new Error('No token found');
  }

  const decodedToken = decodeToken(token) as DecodedToken;
  const isMyTokenExpired = isExpired(token) as boolean;

  if(isMyTokenExpired){
    navigate('/SignIn')
  }

  const fetchData = async () => {
    try {
      if (!token) {
        navigate('/')
        return;
      }
    
      else if (decodedToken.isAdmin !== role){
        navigate('*')
        return;
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])


  return children
}

export default ProtectedRoute