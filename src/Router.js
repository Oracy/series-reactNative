import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import LoginPage from './pages/LoginPage'
import SeriesPage from './pages/SeriesPage'

const AppNavigator = createStackNavigator({
  'Login': {
    screen: LoginPage,
    navigationOptions: {
      title: 'Bem Vindo',
    }
  },
  'Main': {
    screen: SeriesPage
  }
}, {
  defaultNavigationOptions: {
    title: "Series",
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#6CA2F7',
      borderBottomWidth: 1,
      borderBottomColor: '#C5C5C5'
    },
    headerTitleStyle: {
      color: 'white',
      fontSize: 30,
    }
  }
})

const AppContainer = createAppContainer(AppNavigator)

export default AppContainer