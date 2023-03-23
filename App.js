import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Intro from './app/screens/Intro'

export default function App() {
  const findUser = async () => {
    try {
      const result = await AsyncStorage.getItem('user')
      console.log(result)
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    findUser()
  }, [])

  return <Intro />
}
