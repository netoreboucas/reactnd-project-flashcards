import React, { Component } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { removeDeck } from '../actions'
import { accent, primaryText, secondaryText, white } from '../utils/colors'

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    return { title: navigation.state.params.deckId }
  }

  onAddPress = () => {
    this.props.navigation.navigate('AddCard', { deckId: this.props.deck.title })
  }

  onStartPress = () => {
    this.props.navigation.navigate('Quiz', { deckId: this.props.deck.title })
  }

  onRemovePress = () => {
    const { deck } = this.props
    const { title } = deck

    Alert.alert(
      'Remove deck',
      `Are you sure that you want remove the deck "${title}"?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Remove',
          onPress: () => {
            this.props.removeDeck(title)
              .then(() => {
                this.props.navigation.goBack(null)
              })
          }
        }
      ],
      { cancelable: false }
    )
  }

  render () {
    const { deck } = this.props

    if (!deck) {
      return <View />
    }

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.numberOfCards}>{deck.questions.length} cards</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { borderColor: primaryText }]}
            onPress={this.onAddPress}
          >
            <Text style={[styles.buttonText, { color: primaryText }]}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={deck.questions.length === 0}
            style={[styles.button, { backgroundColor: primaryText }, deck.questions.length === 0 ? styles.disabled : null]}
            onPress={this.onStartPress}
          >
            <Text style={[styles.buttonText, { color: white }]}>Start Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onRemovePress}>
            <Text style={styles.link}>Remove deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    paddingTop: 30,
    paddingBottom: 10
  },
  title: {
    textAlign: 'center',
    color: primaryText,
    fontSize: 40
  },
  numberOfCards: {
    textAlign: 'center',
    color: secondaryText,
    fontSize: 20
  },
  button: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: primaryText,
    alignItems: 'center',
    padding: 15,
    marginTop: 20,
    width: 200
  },
  buttonText: {
    textAlign: 'center'
  },
  link: {
    padding: 20,
    color: accent,
    textAlign: 'center'
  },
  disabled: {
    backgroundColor: secondaryText
  }
})

Deck.propTypes = {
  deck: PropTypes.object,
  navigation: PropTypes.object,
  removeDeck: PropTypes.func
}

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deck: state[deckId]
  }
}

const mapDispatchToProps = {
  removeDeck
}

export default connect(mapStateToProps, mapDispatchToProps)(Deck)
