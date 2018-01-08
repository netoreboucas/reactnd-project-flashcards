/* global alert */

import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { addDeck } from '../actions'
import { primaryText, white } from '../utils/colors'
import * as API from '../utils/api'

class NewDeck extends Component {
  state = {
    title: ''
  }

  onSubmitPress = () => {
    let { title } = this.state
    title = title.trim()

    if (title === '') {
      alert('Deck title is mandatory')
      return
    }

    API.getDeck(title).then((deck) => {
      if (deck !== undefined) {
        alert('Already exists one deck with this title')
        return
      }

      this.props.addDeck(title)
        .then(() => {
          this.setState({title: ''})
          this.props.navigation.navigate('ListDecks')
          this.props.navigation.navigate('Deck', { deckId: title })
        })
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>What is the title of your new deck?</Text>
        <TextInput style={styles.input} value={this.state.title} placeholder="Deck Title" onChangeText={(title) => this.setState({title})} />
        <TouchableOpacity style={styles.button} onPress={this.onSubmitPress}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  label: {
    textAlign: 'center',
    color: primaryText,
    fontSize: 45,
    padding: 20
  },
  input: {
    borderWidth: 1,
    borderColor: primaryText,
    borderRadius: 5,
    padding: 5,
    marginLeft: 20,
    marginRight: 20,
    alignSelf: 'stretch'
  },
  button: {
    borderWidth: 1,
    borderColor: primaryText,
    borderRadius: 5,
    backgroundColor: primaryText,
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
    width: 100
  },
  buttonText: {
    color: white,
    textAlign: 'center'
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
