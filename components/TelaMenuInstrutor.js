import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {TelaRegistrarInstrutor} from './TelaRegistrarInstrutor';
import {TelaRegistrarUsuario} from './TelaRegistrarUsuario';
import {TelaContratar} from './TelaContratar';
import {TelaNoticias} from './TelaNoticias';
import {MaterialCommunityIcons} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export function TelaMenuInstrutor({ route }) {
  const { idinstrutor } = route.params || {};
  return (
    <Tab.Navigator>
       <Tab.Screen name="Instrutor" component={TelaContratar} initialParams={{ idinstrutor: idinstrutor }} />
     
      <Tab.Screen name="Noticias" component={TelaNoticias} />
    </Tab.Navigator>
  );
} //Instrutor não esta pegando do instrutor logado 