import React from 'react'
import {
  StyleSheet,
  FlatList
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import { CATEGORIES } from '../data/dummy-data'
import CategoryGridTile from '../components/CategoryGridTile'
import HeaderButton from '../components/HeaderButton'

const renderGridItem = (props, itemData) => {
  return (
    <CategoryGridTile
      title={itemData.item.title}
      color={itemData.item.color}
      onSelect={() => {
        props.navigation.navigate({
          routeName: 'CategoryMeals',
          params: {
            categoryId: itemData.item.id
          }
        })
      }}
    />
  )
}

const CategoriesScreen = props => {
  return (
    <FlatList
      data={CATEGORIES}
      renderItem={renderGridItem.bind(this, props)}
      numColumns={2}
    />
  )
}

CategoriesScreen.navigationOptions = navigationData => {
  return {
    headerTitle: 'Meal Categories',
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
})

export default CategoriesScreen
