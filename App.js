import { useEffect, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

import Intro from './app/screens/Intro'
import NoteScreen from './app/screens/NoteScreen'

export default function App() {
  const [user, setUser] = useState({})

  const findUser = async () => {
    try {
      const result = await AsyncStorage.getItem('user')
      if (result !== null) setUser(JSON.parse(result))
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    findUser()
  }, [])

  if (!user.name) return <Intro onFinish={findUser} />
  return <NoteScreen user={user} />
}
