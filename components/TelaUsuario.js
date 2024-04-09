import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';

export function TelaUsuario({ route, navigation }) {
  const { idusuarios } = route.params || {};
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Buscar os detalhes do usuário logado com base no idusuarios
    fetch(`https://cmov-johnatan.glitch.me/usuarios/${idusuarios}`)
      .then((response) => {
        console.log('Status da resposta:', response.status);
        return response.json();
      })
      .then((json) => {
        console.log('Resposta da API:', json);
        if (json.length > 0) {
          setUsuarios(json); // Armazenar o usuário logado no estado
        } else {
          console.log('Nenhum usuário encontrado');
        }
      })
      .catch((err) => {
        console.log('Erro na busca:', err);
      });
  }, [idusuarios]);

  const handleAlterar = () => {
    navigation.navigate('TelaEditarUsuario', { idusuarios: idusuarios });
  };

  const handleExcluir = () => {
    navigation.navigate('TelaExcluirUsuario', { idusuarios: idusuarios });
  };

  const handleProcurarInstrutor = () => {
    navigation.navigate('TelaListaInstrutor', { idusuarios: idusuarios });
  };

  const handleProcurarAcademia = () => {
    navigation.navigate('TelaListaAcademia', { idusuarios: idusuarios });
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.nome}</Text>
      <Button title="Alterar" onPress={handleAlterar} />
      <Button title="Excluir" onPress={handleExcluir} />
      <Button title="Procurar Instrutor" onPress={handleProcurarInstrutor} />
      <Button title="Procurar Academia" onPress={handleProcurarAcademia} />
    </View>
  );


  return (
    <View style={styles.container}>
    <Text style={styles.title}> Seja Bem Vindo!</Text>
      <FlatList
        data={usuarios}
        renderItem={renderItem}
        keyExtractor={(item) => item.idusuarios.toString()}
      />
      <Button title="sair" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 10,
  },
});
