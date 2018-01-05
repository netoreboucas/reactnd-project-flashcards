import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

class ListDecks extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>List Decks</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default connect()(ListDecks)
