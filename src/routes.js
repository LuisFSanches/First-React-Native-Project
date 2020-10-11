import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Main from './pages/Main';
import User from './pages/User';

const RootStack = createStackNavigator(
  {
    Main,
    User,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#7159c1',
      },
      headerTitleAlign: 'center',
      headerTintColor: '#FFF',
      headerBackTitleVisible: false,
    },
  },
);
const Routes = createAppContainer(RootStack);
export default Routes;
