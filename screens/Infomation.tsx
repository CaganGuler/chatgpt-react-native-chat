import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Infomation = () => {
  return (
    <View style={styles.container}>
      <Text>Çağan Güler</Text>
    </View>
  )
}

export default Infomation

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})