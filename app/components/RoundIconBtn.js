import React from 'react'
import { StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import colors from '../misc/colors'

const RoundIconBtn = ({ name, size, color, style, onPress }) => {
  return (
    <AntDesign
      style={[styles.icon, { ...style }]}
      name={name}
      size={size || 24}
      color={color || colors.LIGHT}
      onPress={onPress}
    />
  )
}

const styles = StyleSheet.create({
  icon: {
    backgroundColor: colors.PRIMARY,
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
})

export default RoundIconBtn
