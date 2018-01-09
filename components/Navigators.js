import { TabNavigator, StackNavigator } from 'react-navigation'

import { accent, primary, white } from '../utils/colors'

import ListDecks from './ListDecks'
import NewDeck from './NewDeck'
import Deck from './Deck'
import AddCard from './AddCard'
import Quiz from './Quiz'

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

export const MainNavigator = StackNavigator({
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
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: primary
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: primary
      }
    }
  }
})
