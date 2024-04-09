import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function TelaNoticias() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notícias</Text>
      <Text style={styles.text}>
        AMANHA NÃO ABRIREMOS PELA MANHA 
        PARA REALIZAÇÃO DE MANUTENÇÃO 
        DOS EQUIPAMENTOS.
      </Text>
       <Text style={styles.title}>Horários</Text>
      <Text style={styles.text}>
      FUNCIONAMENTO: SEGUNDA A SEXTA 
      HORARIO: 5:30 ATÉ 22HR
      SABADOS E FERIADOS: ATÉ 12HR
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
  },
});
