import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ScrollView, Image, Button, StyleSheet, Text, View } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/HeaderButton'
import { toggleFavorite } from '../store/actions/meals'

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

  const favMeals = useSelector(state => state.meals.favoriteMeals)
  const isFav = favMeals.some(meal => meal.id === mealId)
  console.log('Meal is favorite: ' + isFav)

  const dispatch = useDispatch()
  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId))
  }, [dispatch, mealId])

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler })
  }, [toggleFavoriteHandler])

  useEffect(() => {
    props.navigation.setParams({ isFav: isFav })
  }, [isFav])

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
  const toggleFav = navigationData.navigation.getParam('toggleFav')
  const isFav = navigationData.navigation.getParam('isFav')
  const iconName = isFav ? 'ios-star' : 'ios-star-outline'
  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Favorite" iconName={iconName} onPress={toggleFav} />
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
