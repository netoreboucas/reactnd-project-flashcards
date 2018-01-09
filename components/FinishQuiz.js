import React, { PureComponent } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types'

import { primaryText, white } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class FinishQuiz extends PureComponent {
  componentDidMount () {
    clearLocalNotification()
      .then(setLocalNotification)
  }

  render () {
    const { correctCount, totalCount, restart, back } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.scoreContainer}>
          <Text style={styles.label}>
            You got {correctCount} question{correctCount > 1 ? 's' : ''} out of a total of {totalCount} question{totalCount > 1 ? 's' : ''}!
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, { borderColor: primaryText }]} onPress={restart}>
            <Text style={[styles.buttonText, { color: primaryText }]}>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: primaryText }]} onPress={back}>
            <Text style={[styles.buttonText, { color: white }]}>Back to Deck</Text>
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
  scoreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    paddingTop: 30,
    paddingBottom: 10
  },
  label: {
    textAlign: 'center',
    color: primaryText,
    fontSize: 40
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
  }
})

FinishQuiz.propTypes = {
  correctCount: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  restart: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired
}

export default FinishQuiz
