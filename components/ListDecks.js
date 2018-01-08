import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import DeckItem from './DeckItem'
import { getDecks } from '../actions'
import { primaryText } from '../utils/colors'

class ListDecks extends Component {
  componentDidMount () {
    this.props.getDecks()
  }

  renderItem = ({ item }) => {
    return <DeckItem {...item} onPress={() => this.props.navigation.navigate('Deck', { deckId: item.title })} />
  }

  render () {
    const { decks } = this.props

    if (Object.keys(decks).length === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.empty}>
            You do not have any deck of cards
          </Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={decks}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  empty: {
    fontSize: 20,
    alignSelf: 'center',
    color: primaryText
  }
})

ListDecks.propTypes = {
  decks: PropTypes.array,
  navigation: PropTypes.object,
  getDecks: PropTypes.func
}

const mapStateToProps = (decks) => ({
  decks: Object.keys(decks).map((key) => {
    return decks[key]
  }).sort((a, b) => (a.title > b.title ? 1 : a.title < b.title ? -1 : 0))
})

const mapDispatchToProps = {
  getDecks
}

export default connect(mapStateToProps, mapDispatchToProps)(ListDecks)
