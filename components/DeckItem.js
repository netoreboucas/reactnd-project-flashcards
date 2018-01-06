import React, { PureComponent } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types'

import { primaryText, secondaryText, divider } from '../utils/colors'

class DeckItem extends PureComponent {
  render () {
    const { title, questions, onPress } = this.props

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.numberOfCards}>{questions.length} cards</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: divider
  },
  button: {
    padding: 20
  },
  title: {
    textAlign: 'center',
    color: primaryText,
    fontSize: 25
  },
  numberOfCards: {
    textAlign: 'center',
    color: secondaryText,
    fontSize: 15
  }
})

DeckItem.propTypes = {
  title: PropTypes.string.isRequired,
  questions: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired
}

export default DeckItem
