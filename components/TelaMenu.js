import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TelaUsuario } from './TelaUsuario';
import { TelaNoticias } from './TelaNoticias';
import { TelaMensalidade } from './TelaMensalidade';
import { TelaContratar } from './TelaContratar';
import { TelaListaAcademia } from './TelaListaAcademia';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export function TelaMenu({ route }) {
  const { idusuarios } = route.params || {};

  return (
    <Tab.Navigator>
      <Tab.Screen name="usuarios" component={TelaUsuario} initialParams={{ idusuarios: idusuarios }} />
      <Tab.Screen name="noticias" component={TelaNoticias} />
      <Tab.Screen name="Mensalidade" component={TelaMensalidade} initialParams={{ idusuarios: idusuarios }} />
    </Tab.Navigator>
  );
}
