import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import MealList from '../components/MealList'
import HeaderButton from '../components/HeaderButton'

const FavoritesScreen = props => {
  const favMeals = useSelector(state => state.meals.favoriteMeals)

  if (favMeals.length === 0) {
    return (
      <View style={styles.content}>
        <Text>{'No favorites found. Start adding some!'}</Text>
      </View>
    )
  }

  return (
    <MealList
      displayedMeals={favMeals}
      navigation={props.navigation}
    />
  )
}

FavoritesScreen.navigationOptions = navigationData => {
  return {
    headerTitle: 'Your Favorites',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navigationData.navigation.toggleDrawer()
          }}
        />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default FavoritesScreen
