import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'

import { Ionicons } from '@expo/vector-icons'

import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import MealDetailScreen from '../screens/MealDetailScreen'
import FavoritesScreen from '../screens/FavoritesScreen'
import FiltersScreen from '../screens/FiltersScreen'

import Colors from '../constants/colors'

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primaryColor
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: 'white',
  headerBackTitle: 'Back'
}

const MealsNavigator = createStackNavigator({
  Categories: {
    screen: CategoriesScreen
  },
  CategoryMeals: {
    screen: CategoryMealsScreen
  },
  MealDetail: MealDetailScreen
},
{
  defaultNavigationOptions: defaultStackNavOptions
})

const FavoritesNavigator = createStackNavigator({
  Favorites: FavoritesScreen,
  MealDetail: MealDetailScreen
},
{
  defaultNavigationOptions: defaultStackNavOptions
})

const MealsFavTabNavigator = createBottomTabNavigator({
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons
            name='ios-restaurant'
            size={25}
            color={tabInfo.tintColor}
          />
        )
      }
    }
  },
  Favorites: {
    screen: FavoritesNavigator,
    navigationOptions: {
      tabBarLabel: 'Favorites!',
      tabBarIcon: tabInfo => {
        return (
          <Ionicons
            name='ios-star'
            size={25}
            color={tabInfo.tintColor}
          />
        )
      }
    }
  }
},
{
  tabBarOptions: {
    labelStyle: {
      fontFamily: 'open-sans-bold'
    },
    activeTintColor: Colors.accentColor,
    style: {
      backgroundColor: Colors.primaryColor
    }
  }
})

const FiltersNavigator = createStackNavigator({
  Filters: FiltersScreen
},
{
  defaultNavigationOptions: defaultStackNavOptions
})

const MainNavigator = createDrawerNavigator({
  MealsFavs: {
    screen: MealsFavTabNavigator,
    navigationOptions: {
      drawerLabel: 'Browse Meals'
    }
  },
  Filters: {
    screen: FiltersNavigator,
    navigationOptions: {
      drawerLabel: 'Customize Filters'
    }
  }
},
{
  contentOptions: {
    activeTintColor: Colors.accentColor,
    labelStyle: {
      fontFamily: 'open-sans-bold'
    }
  }
})

export default createAppContainer(MainNavigator)
