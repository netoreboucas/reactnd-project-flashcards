import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { addCard } from '../actions'
import { primaryText, white } from '../utils/colors'

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  }

  static navigationOptions = ({ navigation }) => {
    return { title: 'Add Card' }
  }

  onSubmitPress = () => {
    const { question, answer } = this.state
    this.props.addCard(this.props.deck.title, { question, answer })
      .then(() => {
        this.props.navigation.goBack(null)
      })
  }

  render () {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} value={this.state.question} placeholder="Question" onChangeText={(question) => this.setState({question})} />
        <TextInput style={styles.input} value={this.state.answer} placeholder="Answer" onChangeText={(answer) => this.setState({answer})} />
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
  input: {
    borderWidth: 1,
    borderColor: primaryText,
    borderRadius: 5,
    padding: 5,
    marginTop: 20,
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

AddCard.propTypes = {
  deck: PropTypes.object,
  navigation: PropTypes.object,
  addCard: PropTypes.func
}

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deck: state[deckId]
  }
}

const mapDispatchToProps = {
  addCard
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)
