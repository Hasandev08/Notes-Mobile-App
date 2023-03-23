import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements'

const NoteDetail = (props) => {
  const { note } = props.route.params
  const headerHeight = useHeaderHeight()

  return (
    <View style={[styles.container, { paddingTop: headerHeight }]}>
      <Text>{note.title}</Text>
      <Text>{note.desc}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

export default NoteDetail
