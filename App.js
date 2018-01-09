import React, { Component } from 'react'
import { View } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import reducer from './reducers'
import { primary } from './utils/colors'
import { setLocalNotification } from './utils/helpers'
import CustomStatusBar from './components/CustomStatusBar'
import { MainNavigator } from './components/Navigators'

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default class App extends Component {
  componentDidMount () {
    setLocalNotification()
  }

  render () {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <CustomStatusBar backgroundColor={primary} />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}
