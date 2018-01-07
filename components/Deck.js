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

  onRemovePress = () => {
    const { deck } = this.props
    const { title } = deck

    Alert.alert(
      'Remove',
      `Are you sure that you want remove the deck ${title}?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Remove',
          onPress: () => {
            this.props.removeDeck(title)
              .then(() => {
                this.props.navigation.goBack()
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
          <TouchableOpacity style={styles.addButton} onPress={this.onAddPress}>
            <Text style={styles.addButtonText}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.startButton} onPress={this.onStartPress}>
            <Text style={styles.startButtonText}>Start Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.removeButton} onPress={this.onRemovePress}>
            <Text style={styles.removeButtonText}>Remove</Text>
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
    paddingTop: 50,
    paddingBottom: 50
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
  addButton: {
    borderWidth: 1,
    borderColor: primaryText,
    borderRadius: 5,
    alignItems: 'center',
    padding: 15,
    marginTop: 20,
    width: 200
  },
  addButtonText: {
    color: primaryText,
    textAlign: 'center'
  },
  startButton: {
    borderWidth: 1,
    borderColor: primaryText,
    borderRadius: 5,
    backgroundColor: primaryText,
    alignItems: 'center',
    padding: 15,
    marginTop: 20,
    width: 200
  },
  startButtonText: {
    color: white,
    textAlign: 'center'
  },
  removeButton: {
    alignItems: 'center',
    marginTop: 20
  },
  removeButtonText: {
    color: accent,
    textAlign: 'center'
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
