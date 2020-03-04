import { createStackNavigator } from "react-navigation-stack";
import TopMedicosScreen from "../screens/TopMedicos";

export const TopListScreenStacks = createStackNavigator({
  TopMedicos: {
    screen: TopMedicosScreen,
    navigationOptions: () => ({
      title: "Los mejores Medicos"
    })
  }
});

export default TopListScreenStacks;
