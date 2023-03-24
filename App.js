import { useEffect, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Intro from './app/screens/Intro'
import NoteScreen from './app/screens/NoteScreen'
import NoteDetail from './app/components/NoteDetail'
import NoteProvider from './app/context/NoteProvider'

const Stack = createNativeStackNavigator()

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

  const RenderNoteScreen = (props) => <NoteScreen {...props} user={user} />

  if (!user.name) return <Intro onFinish={findUser} />
  return (
    <NavigationContainer>
      <NoteProvider>
        <Stack.Navigator screenOptions={{ headerTitle: '', headerTransparent: true }}>
          <Stack.Screen component={RenderNoteScreen} name='NoteScreen' />
          <Stack.Screen component={NoteDetail} name='NoteDetail' />
        </Stack.Navigator>
      </NoteProvider>
    </NavigationContainer>
  )
}
