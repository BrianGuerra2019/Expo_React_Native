import { createStackNavigator } from "react-navigation-stack";
import SearchScreen from "../screens/Search";

export const SearchScreenStacks = createStackNavigator({
  Medicos: {
    screen: SearchScreen,
    navigationOptions: () => ({
      title: "Busca tu Paquete"
    })
  }
});

export default SearchScreenStacks;
