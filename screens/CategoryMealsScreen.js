import React from 'react'
import { useSelector } from 'react-redux'

import MealList from '../components/MealList'
import { CATEGORIES } from '../data/dummy-data'

const CategoryMealScreen = props => {
  const categoryId = props.navigation.getParam('categoryId')
  const availableMeals = useSelector(state => state.meals.filteredMeals)
  const displayedMeals =
    availableMeals.filter(meal => meal.categoryIds.indexOf(categoryId) >= 0)

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
