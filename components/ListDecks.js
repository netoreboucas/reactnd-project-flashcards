import React, { Component } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import DeckItem from './DeckItem'
import { getDecks } from '../actions'

class ListDecks extends Component {
  componentDidMount () {
    this.props.getDecks()
  }

  renderItem = ({ item }) => {
    return <DeckItem {...item} onPress={() => this.props.navigation.navigate('Deck', { deckId: item.title })} />
  }

  render () {
    const { decks } = this.props

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
    flex: 1
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
  })
})

const mapDispatchToProps = {
  getDecks
}

export default connect(mapStateToProps, mapDispatchToProps)(ListDecks)
