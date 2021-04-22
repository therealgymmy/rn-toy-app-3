import React from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'

import MealList from '../components/MealList'
import { CATEGORIES } from '../data/dummy-data'

const CategoryMealScreen = props => {
  const categoryId = props.navigation.getParam('categoryId')
  const availableMeals = useSelector(state => state.meals.filteredMeals)
  const displayedMeals =
    availableMeals.filter(meal => meal.categoryIds.indexOf(categoryId) >= 0)

  if (displayedMeals.length === 0) {
    return (
      <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{'No meals found. Check your filters?'}</Text>
      </View>
    )
  }

  return (
    <MealList
      displayedMeals={displayedMeals}
      navigation={props.navigation}
    />
  )
}

CategoryMealScreen.navigationOptions = navigationData => {
  const categoryId = navigationData.navigation.getParam('categoryId')
  const selectedCategory = CATEGORIES.find(cat => cat.id === categoryId)
  return {
    headerTitle: selectedCategory.title
  }
}

export default CategoryMealScreen
