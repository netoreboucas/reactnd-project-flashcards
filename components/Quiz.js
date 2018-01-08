import React, { Component } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { removeCard } from '../actions'
import { accent, primaryText, secondaryText, white, green, red } from '../utils/colors'

class Quiz extends Component {
  state = {
    questionIndex: 0,
    correctCount: 0,
    viewAnswer: false
  }

  static navigationOptions = ({ navigation }) => {
    return { title: 'Quiz' }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.deck.questions.length === 0) {
      this.props.navigation.goBack(null)
    }
  }

  nextCard = (correct) => {
    this.setState((prevState) => ({
      questionIndex: prevState.questionIndex + 1,
      correctCount: prevState.correctCount + (correct ? 1 : 0),
      viewAnswer: false
    }))
  }

  restart = () => {
    this.setState({
      questionIndex: 0,
      correctCount: 0,
      viewAnswer: false
    })
  }

  onRemovePress = () => {
    const { deck } = this.props
    const { questionIndex } = this.state

    Alert.alert(
      'Remove card',
      `Are you sure that you want remove the card "${deck.questions[questionIndex].question}"?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Remove',
          onPress: () => {
            this.props.removeCard(deck.title, deck.questions[questionIndex])
          }
        }
      ],
      { cancelable: false }
    )
  }

  render () {
    const { deck } = this.props
    const { questionIndex, correctCount, viewAnswer } = this.state

    if (questionIndex === deck.questions.length) { // Finish Quiz
      return (
        <View style={styles.container}>
          <View style={styles.questionContainer}>
            <Text style={styles.label}>
              You got {correctCount} question{correctCount > 1 ? 's' : ''} out of a total of {deck.questions.length} question{deck.questions.length > 1 ? 's' : ''}!
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, { borderColor: primaryText }]} onPress={this.restart}>
              <Text style={[styles.buttonText, { color: primaryText }]}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: primaryText }]} onPress={() => {
              this.props.navigation.goBack(null)
              this.props.navigation.goBack(null)
            }}>
              <Text style={[styles.buttonText, { color: white }]}>Back to Deck</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text style={styles.questionNumber}>
          {(questionIndex + 1)}/{deck.questions.length}
        </Text>

        {(!viewAnswer &&
        <View style={styles.questionContainer}>
          <Text style={styles.label}>{deck.questions[questionIndex].question}</Text>
          <TouchableOpacity onPress={() => { this.setState({ viewAnswer: true }) }}>
            <Text style={styles.link}>Answer</Text>
          </TouchableOpacity>
        </View>)}

        {(viewAnswer &&
        <View style={styles.questionContainer}>
          <Text style={styles.label}>{deck.questions[questionIndex].answer}</Text>
          <TouchableOpacity onPress={() => { this.setState({ viewAnswer: false }) }}>
            <Text style={styles.link}>Question</Text>
          </TouchableOpacity>
        </View>)}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            disabled={!viewAnswer}
            style={[styles.button, { backgroundColor: green }, !viewAnswer ? styles.disabled : null]}
            onPress={() => { this.nextCard(true) }}
          >
            <Text style={[styles.buttonText, { color: white }]}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!viewAnswer}
            style={[styles.button, { backgroundColor: red }, !viewAnswer ? styles.disabled : null]}
            onPress={() => { this.nextCard(false) }}
          >
            <Text style={[styles.buttonText, { color: white }]}>Incorrect</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onRemovePress}>
            <Text style={styles.link}>Remove card</Text>
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
  questionNumber: {
    alignSelf: 'flex-start',
    fontSize: 20,
    padding: 5
  },
  questionContainer: {
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

Quiz.propTypes = {
  deck: PropTypes.object,
  navigation: PropTypes.object,
  removeCard: PropTypes.func
}

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deck: state[deckId]
  }
}

const mapDispatchToProps = {
  removeCard
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
