import { createStackNavigator } from "react-navigation-stack";
import ChatScreen from "../screens/Chat/ChatScreen";

const ChatScreenStacks = createStackNavigator({
  Chat: {
    screen: ChatScreen,
    navigationOptions: () => ({
      title: "Mensajes de Servicios",
    }),
  },
});

export default ChatScreenStacks;
