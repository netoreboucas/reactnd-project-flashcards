import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { addDeck } from '../actions'

class NewDeck extends Component {
  state = {
    title: ''
  }

  onPress = () => {
    const { title } = this.state
    this.props.addDeck(this.state.title)
      .then(() => {
        this.setState({title: ''})
        this.props.navigation.navigate('ListDecks')
        this.props.navigation.navigate('Deck', { deckId: title })
      })
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>What is the title of your new deck?</Text>
        <TextInput value={this.state.title} onChangeText={(title) => this.setState({title})} />
        <TouchableOpacity onPress={this.onPress}>
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

NewDeck.propTypes = {
  navigation: PropTypes.object,
  addDeck: PropTypes.func
}

const mapDispatchToProps = {
  addDeck
}

export default connect(null, mapDispatchToProps)(NewDeck)
