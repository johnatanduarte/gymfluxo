import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, Alert } from 'react-native';

export function TelaExcluirInstrutor({ navigation, route }) {
  const idinstrutor = route.params.idinstrutor;

  useEffect(() => {
    fetch('https://cmov-johnatan.glitch.me//instrutor/' + idinstrutor, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        const instrutor = resJson[0];
        console.log(instrutor);
      })
      .catch((e) => console.log(e));
  }, [idinstrutor]);

  function Excluir() {
    fetch('https://cmov-johnatan.glitch.me//instrutor/' + idinstrutor, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        navigation.navigate('TelaLogin', { idinstrutor }); // Navigate back to TelaUsuario after successful deletion
      })
      .catch((err) => {
        console.log(err);
        alert('Erro ao excluir usuário'); // Handle deletion errors
      });
  }

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button title="Voltar" onPress={() => navigation.goBack()} />
        <Text style={{ fontWeight: 'bold' }}>Excluir Usuário</Text>
      </View>

      <Text style={{ margin: 20 }}>Tem certeza que deseja excluir este usuário?</Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
        <Button title="Cancelar" onPress={() => navigation.goBack()} />
        <Button title="Excluir" color="red" onPress={Excluir} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
