import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { fetchData } from '../actions'

class Dashboard extends Component {

    componentDidMount() {
        this.props.dispatch(fetchData(false))
    }

    addNewCards = (title, cards) => {
        this.props.navigation.navigate("Add New Card", { title: title, cards: cards })
    }

    render() {
        return (
            <View style={{ flex: 1, alignSelf: 'stretch' }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    {typeof (this.props.decks) === 'undefined' ? <Text>loading data</Text> :
                        <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
                            {Object.keys(this.props.decks).map((deck) => {
                                return (<View key={deck} style={{ alignItems: 'center' }}>
                                    <TouchableOpacity onPress={(event) => this.addNewCards(deck, this.props.decks[deck].questions.length)} value={deck}><Text style={{ fontSize: 24 }}>{deck}</Text></TouchableOpacity>
                                    {typeof this.props.decks[deck].questions === 'undefined' ? <Text>0 cards</Text> : <Text>{this.props.decks[deck].questions.length} card(s)</Text>}
                                </View>)
                            })}
                        </View>}
                </View>
            </View>
        )
    }
}

const mapStateToProps = ({ decks }) => {
    return { decks }
}

export default connect(mapStateToProps)(Dashboard)