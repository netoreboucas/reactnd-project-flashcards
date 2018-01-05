import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

class NewDeck extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>New Deck</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default connect()(NewDeck)
