import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import {
  FlatList,
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import Note from '../components/Note'
import NoteInputModal from '../components/NoteInputModal'
import RoundIconBtn from '../components/RoundIconBtn'
import SearchBar from '../components/SearchBar'

const NoteScreen = ({ user, navigation }) => {
  const [greet, setGreet] = useState('Evening')
  const [modalVisible, setModalVisible] = useState(false)
  const [notes, setNotes] = useState([])

  const findGreet = () => {
    const hours = new Date().getHours()
    if (hours === 0 || hours < 12) return setGreet('Morning')
    if (hours === 1 || hours < 17) return setGreet('Afternoon')
    setGreet('Evening')
  }

  const findNotes = async () => {
    const result = await AsyncStorage.getItem('notes')
    if (result !== null) setNotes(JSON.parse(result))
  }

  useEffect(() => {
    findNotes()
    findGreet()
  }, [])

  const handleOnSubmit = async (title, desc) => {
    const note = { id: Date.now(), title, desc, time: Date.now() }
    const updatedNotes = [...notes, note]
    setNotes(updatedNotes)
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes))
  }

  const openNote = (note) => {
    navigation.navigate('NoteDetail', { note })
  }

  return (
    <>
      <StatusBar hidden />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>
          {notes.length ? <SearchBar containerStyle={{ marginVertical: 15 }} /> : null}
          <FlatList
            data={notes}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 15 }}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Note item={item} onPress={() => openNote(item)} />}
          />
          <View style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}>
            {!notes.length && <Text style={styles.emptyHeading}>Add Notes</Text>}
          </View>
          <RoundIconBtn name='plus' style={styles.addBtn} onPress={() => setModalVisible(true)} />
        </View>
      </TouchableWithoutFeedback>
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
    zIndex: 1,
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
    zIndex: 1,
  },
})

export default NoteScreen
