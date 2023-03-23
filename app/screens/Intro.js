import React, { useState } from 'react'

import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

import RoundIconBtn from '../components/RoundIconBtn'

import colors from '../misc/colors'

const Intro = ({ onFinish }) => {
  const [name, setName] = useState('')

  const handleOnChangeText = (text) => setName(text)

  const handleSubmit = async () => {
    try {
      const user = { name: name }
      await AsyncStorage.setItem('user', JSON.stringify(user))
      if (onFinish) onFinish()
    } catch (error) {
      console.log('Error', error)
    }
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.inputTitle}>Enter your name to continue</Text>
        <TextInput
          value={name}
          onChangeText={handleOnChangeText}
          placeholder='Enter Name'
          style={styles.textInput}
        />
        {name.trim().length >= 3 && <RoundIconBtn name='arrowright' onPress={handleSubmit} />}
      </View>
    </>
  )
}

const width = Dimensions.get('window').width - 50

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  textInput: {
    borderWidth: 2,
    borderColor: colors.PRIMARY,
    color: colors.PRIMARY,
    width,
    height: 50,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 25,
    marginBottom: 15,
  },
  inputTitle: {
    alignSelf: 'flex-start',
    paddingLeft: 25,
    marginBottom: 5,
    opacity: 0.5,
  },
})

export default Intro
