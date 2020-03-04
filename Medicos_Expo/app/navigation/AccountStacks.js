import { createStackNavigator } from "react-navigation-stack";
import MyAccountScreen from "../screens/Acount/MyAcount";
import LoginScreen from "../screens/Acount/Login";
import RegisterScreen from "../screens/Acount/Register";
import RegisterSocioScreen from "../screens/Acount/RegisterSocio";

export const AccountScreenStacks = createStackNavigator({
  MyAccount: {
    screen: MyAccountScreen,
    navigationOptions: () => ({
      title: "Mi cuenta"
    })
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: () => ({
      title: "Login"
    })
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: () => ({
      title: "Registro"
    })
  },
  RegisterSocio: {
    screen: RegisterSocioScreen,
    navigationOptions: () => ({
      title: "Registro Socio"
    })
  }
});

export default AccountScreenStacks;
