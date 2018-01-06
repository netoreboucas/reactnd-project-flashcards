import React, { Component } from 'react'
import { View } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { TabNavigator, StackNavigator } from 'react-navigation'

import reducer from './reducers'
import { accent, primary, white } from './utils/colors'
import CustomStatusBar from './components/CustomStatusBar'
import ListDecks from './components/ListDecks'
import NewDeck from './components/NewDeck'
import Deck from './components/Deck'

const Tabs = TabNavigator({
  ListDecks: {
    screen: ListDecks,
    navigationOptions: {
      tabBarLabel: 'Decks'
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck'
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    style: {
      height: 56,
      backgroundColor: primary
    },
    indicatorStyle: {
      backgroundColor: accent
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: primary
      }
    }
  }
})

export default class App extends Component {
  render () {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <CustomStatusBar backgroundColor={primary} />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}
