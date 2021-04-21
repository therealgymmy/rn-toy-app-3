import React from 'react'
import { useSelector } from 'react-redux'
import { ScrollView, Image, Button, StyleSheet, Text, View } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/HeaderButton'

const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <Text>{props.children}</Text>
    </View>
  )
}

const MealDetailScreen = props => {
  const meals = useSelector(state => state.meals.meals)
  const mealId = props.navigation.getParam('mealId')
  const meal = meals.find(meal => meal.id === mealId)
  console.log(mealId)
  console.log(meal)

  return (
    <ScrollView styles={styles.screen}>
      <View>
        <Image source={{ uri: meal.imageUrl }} style={styles.image} />
      </View>
      <View style={styles.details}>
        <Text>{meal.duration}m</Text>
        <Text>{meal.complexity.toUpperCase()}</Text>
        <Text>{meal.affordability.toUpperCase()}</Text>
      </View>
      <Text style={styles.textTitle}>Ingredients</Text>
      {meal.ingredients.map(ingredient => <ListItem>{ingredient}</ListItem>)}
      <Text style={styles.textTitle}>Steps</Text>
      {meal.steps.map(step => <ListItem>{step}</ListItem>)}
    </ScrollView>
  )
}

MealDetailScreen.navigationOptions = (navigationData) => {
  const mealTitle = navigationData.navigation.getParam('mealTitle')
  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Favorite" iconName="ios-star" onPress={() => {
          console.log('Mark as favorite')
        }} />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    flexDirection: 'row'
  },
  image: {
    width: '100%',
    height: 200
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around'
  },
  textTitle: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center'
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10
  }
})

export default MealDetailScreen
