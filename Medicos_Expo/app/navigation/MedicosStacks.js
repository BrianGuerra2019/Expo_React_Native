import { createStackNavigator } from "react-navigation-stack";
import PrincipalScreen from "../screens/medicos/Principal";
import AddMedicosScreen from "../screens/medicos/AddMedicos";

export const PrincipalScreenStacks = createStackNavigator({
  Medicos: {
    screen: PrincipalScreen,
    navigationOptions: () => ({
      title: "Medicos"
    })
  },
  AddMedicos: {
    screen: AddMedicosScreen,
    navigationOptions: () => ({
      title: "Nuevos Medicos"
    })
  }
});

export default PrincipalScreenStacks;
