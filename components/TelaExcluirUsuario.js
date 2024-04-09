import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, Alert } from 'react-native';

export function TelaExcluirUsuario({ navigation, route }) {
  const idusuarios = route.params.idusuarios;

  useEffect(() => {
    fetch('https://cmov-johnatan.glitch.me//usuarios/' + idusuarios, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        const usuario = resJson[0];
        console.log(usuario);
      })
      .catch((e) => console.log(e));
  }, [idusuarios]);

  function Excluir() {
    fetch('https://cmov-johnatan.glitch.me//usuarios/' + idusuarios, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        navigation.navigate('TelaLogin', { idusuarios }); // Navigate back to TelaUsuario after successful deletion
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
