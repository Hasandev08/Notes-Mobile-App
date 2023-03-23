import React, { useEffect, useState } from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'

import NoteInputModal from '../components/NoteInputModal'
import RoundIconBtn from '../components/RoundIconBtn'
import SearchBar from '../components/SearchBar'

const NoteScreen = ({ user }) => {
  const [greet, setGreet] = useState('Evening')
  const [modalVisible, setModalVisible] = useState(false)

  const findGreet = () => {
    const hours = new Date().getHours()
    if (hours === 0 || hours < 12) return setGreet('Morning')
    if (hours === 1 || hours < 17) return setGreet('Afternoon')
    setGreet('Evening')
  }

  useEffect(() => {
    findGreet()
  }, [])

  const handleOnSubmit = (title, desc) => {}

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>
        <SearchBar containerStyle={{ marginVertical: 15 }} />
        <View style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}>
          <Text style={styles.emptyHeading}>Add Notes</Text>
          <RoundIconBtn name='plus' style={styles.addBtn} onPress={() => setModalVisible(true)} />
        </View>
      </View>
      <NoteInputModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}
      />
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  emptyHeading: {
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    opacity: 0.2,
  },
  emptyHeaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  addBtn: {
    position: 'absolute',
    right: 15,
    bottom: 50,
  },
})

export default NoteScreen
