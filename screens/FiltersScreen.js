import React, { useState, useEffect, useCallback } from 'react'
import { Switch, StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import Colors from '../constants/colors'
import { setFilters } from '../store/actions/meals'

const FilterSwitch = props => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        trackColor={{ true: Colors.primaryColor }}
        value={props.state}
        onValueChange={newState => props.setState(newState)}
      />
    </View>
  )
}

const FiltersScreen = props => {
  const { navigation } = props

  const [isGlutenFree, setIsGlutenFree] = useState(false)
  const [isLactoseFree, setIsLactoseFree] = useState(false)
  const [isVegan, setIsVegan] = useState(false)
  const [isVegetarian, setIsVegetarian] = useState(false)

  const dispatch = useDispatch()

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian
    }

    console.log(appliedFilters)

    dispatch(setFilters(appliedFilters))
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian])

  useEffect(() => {
    navigation.setParams({ save: saveFilters })
  }, [saveFilters])

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterSwitch label="Gluten-free" state={isGlutenFree} setState={setIsGlutenFree} />
      <FilterSwitch label="Lactose-free" state={isLactoseFree} setState={setIsLactoseFree} />
      <FilterSwitch label="Vegan" state={isVegan} setState={setIsVegan} />
      <FilterSwitch label="Vegetarian" state={isVegetarian} setState={setIsVegetarian} />
    </View>
  )
}

FiltersScreen.navigationOptions = navigationData => {
  return {
    headerTitle: 'Filter Meals',
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
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName="ios-save"
          onPress={() => {
            const saveFn = navigationData.navigation.getParam('save')
            saveFn()
          }}
        />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    margin: 20,
    textAlign: 'center'
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical: 10
  }
})

export default FiltersScreen
