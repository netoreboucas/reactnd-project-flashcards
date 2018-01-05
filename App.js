import React, { Component } from 'react'
import { View } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { TabNavigator } from 'react-navigation'

import reducer from './reducers'
import { accent, primary } from './utils/colors'
import CustomStatusBar from './components/CustomStatusBar'
import ListDecks from './components/ListDecks'
import NewDeck from './components/NewDeck'

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
  tabBarOptions: {
    style: {
      backgroundColor: primary
    },
    indicatorStyle: {
      backgroundColor: accent
    }
  }
})

export default class App extends Component {
  render () {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <CustomStatusBar backgroundColor={primary} />
          <Tabs />
        </View>
      </Provider>
    )
  }
}
