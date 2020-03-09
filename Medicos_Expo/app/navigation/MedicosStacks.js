import { createStackNavigator } from "react-navigation-stack";
import PrincipalScreen from "../screens/medicos/Principal";
import AddMedicosScreen from "../screens/medicos/AddMedicos";
import ServicioScreen from "../screens/medicos/Servicio";

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
  },
  Servicio: {
    screen: ServicioScreen,
    navigationOptions: props => ({
      title: props.navigation.state.params.medicosSe.item.servMedico.name
    })
  }
});

export default PrincipalScreenStacks;
