import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {TelaLogin} from './components/TelaLogin'; 
import {TelaLista} from './components/TelaLista';
import {TelaListaInstrutor} from './components/TelaListaInstrutor';
import {TelaRegistrarInstrutor} from './components/TelaRegistrarInstrutor';
import {TelaRegistrarUsuario} from './components/TelaRegistrarUsuario';
import {TelaRegistrarAcademia} from './components/TelaRegistrarAcademia';
import {TelaMenu} from './components/TelaMenu';
import {TelaMenuInstrutor} from './components/TelaMenuInstrutor';
import {TelaEditarUsuario} from './components/TelaEditarUsuario';
import {TelaEditarInstrutor} from './components/TelaEditarInstrutor';
import {TelaExcluirUsuario } from './components/TelaExcluirUsuario';
import {TelaExcluirInstrutor } from './components/TelaExcluirInstrutor';
import {TelaMensalidade } from './components/TelaMensalidade';
import {TelaNoticias } from './components/TelaNoticias';
import {TelaContratar } from './components/TelaContratar';
import {TelaUsuario } from './components/TelaUsuario';
import {TelaInstrutor } from './components/TelaInstrutor';
import {TelaListaAcademia } from './components/TelaListaAcademia';
import {TelaEditarAcademia } from './components/TelaEditarAcademia';
import {TelaProcurarAcademia } from './components/TelaProcurarAcademia';
import TelaAcademia  from './components/TelaAcademia';




const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, 
        }}
      >
      
      <Stack.Screen name="TelaLogin" component={TelaLogin} />
      <Stack.Screen name="TelaMenuInstrutor" component={TelaMenuInstrutor} />
      <Stack.Screen name="TelaMenu" component={TelaMenu} />
      <Stack.Screen name="TelaEditarInstrutor" component={TelaEditarInstrutor} />
      <Stack.Screen name="TelaEditarUsuario" component={TelaEditarUsuario} />
      <Stack.Screen name="TelaInstrutor" component={TelaInstrutor} />
      <Stack.Screen name="TelaUsuario" component={TelaUsuario} />
      <Stack.Screen name="TelaAcademia" component={TelaAcademia} />
      <Stack.Screen name="TelaLista" component={TelaLista} />
      <Stack.Screen name="TelaListaInstrutor" component={TelaListaInstrutor} />
      <Stack.Screen name="TelaExcluirUsuario" component={TelaExcluirUsuario} />
      <Stack.Screen name="TelaExcluirInstrutor" component={TelaExcluirInstrutor} />
      <Stack.Screen name="TelaRegistrarInstrutor" component={TelaRegistrarInstrutor} />
      <Stack.Screen name="TelaRegistrarUsuario" component={TelaRegistrarUsuario} />
      <Stack.Screen name="TelaRegistrarAcademia" component={TelaRegistrarAcademia} />
      <Stack.Screen name="TelaMensalidade" component={TelaMensalidade} />
      <Stack.Screen name="TelaNoticias" component={TelaNoticias} />
      <Stack.Screen name="TelaContratar" component={TelaContratar} />
      <Stack.Screen name="TelaListaAcademia" component={TelaListaAcademia} />
      <Stack.Screen name="TelaEditarAcademia" component={TelaEditarAcademia} />
      <Stack.Screen name="TelaProcurarAcademia" component={TelaProcurarAcademia} />
     
       
      </Stack.Navigator>
    </NavigationContainer>
    //<telaLogin/>
  );
}
