import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';

export function TelaInstrutor({ route, navigation }) {
  const { idinstrutor } = route.params || {};
  const [instrutores, setInstrutores] = useState([]);

  useEffect(() => {
    // Buscar os detalhes do instrutor logado com base no idinstrutor
    fetch(`https://cmov-johnatan.glitch.me/instrutor/${idinstrutor}`)
      .then((response) => {
        console.log('Status da resposta:', response.status);
        return response.json();
      })
      .then((json) => {
        console.log('Resposta da API:', json);
        if (json.length > 0) {
          setInstrutores(json); // Armazenar o instrutor logado no estado
        } else {
          console.log('Nenhum instrutor encontrado');
        }
      })
      .catch((err) => {
        console.log('Erro na busca:', err);
      });
  }, [idinstrutor]);

  const handleAlterar = () => {
    navigation.navigate('TelaEditarInstrutor', { idinstrutor: idinstrutor });
  };

  const handleExcluir = () => {
    navigation.navigate('TelaExcluirInstrutor', { idinstrutor: idinstrutor });
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.nome}</Text>
      <Button title="Alterar" onPress={handleAlterar} />
      <Button title="Excluir" onPress={handleExcluir} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={instrutores}
        renderItem={renderItem}
        keyExtractor={(item) => item.idinstrutor.toString()}
      />
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
