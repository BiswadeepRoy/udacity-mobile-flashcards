import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import DashboardStack from './components/DasboardStack'
import NewDeckStack from './components/NewDeckStack'
import { NavigationContainer } from '@react-navigation/native';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import reducers from './reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import middlewares from './middleware'
import { fetchData } from './actions';
import { setLocalNotification } from './utils/helpers'

const Tab = createBottomTabNavigator();

const store = createStore(reducers, middlewares)
store.dispatch(fetchData(true))

export default class App extends Component {

  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar style='auto' />
          <NavigationContainer >
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  if (route.name === 'Dashboard') {
                    return <MaterialCommunityIcons name={'cards'} size={size} color={color} />
                  } else if (route.name === 'Add Deck') {
                    return <Entypo name={"add-to-list"} size={size} color={color} />
                  }

                },
              })}
              tabBarOptions={{
                activeTintColor: 'darkgreen',
                inactiveTintColor: 'gray',
              }}>
              <Tab.Screen name="Dashboard" component={DashboardStack} />
              <Tab.Screen name="Add Deck" component={NewDeckStack} />
            </Tab.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
