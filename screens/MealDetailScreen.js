import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

const MealDetailScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>MealDetailScreen</Text>
      <Button title="Go Back to Categories" onPress={() => {
        props.navigation.popToTop()
      }} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default MealDetailScreen
