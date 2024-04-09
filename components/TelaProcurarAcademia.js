import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, Button } from 'react-native';

export function TelaProcurarAcademia({ navigation, route }) {
  const [academias, setAcademias] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  const { idusuarios } = route.params; // Pegando idusuarios dos parâmetros da rota

  useEffect(() => {
    async function fetchAcademias() {
      setRefreshing(true);
      try {
        const response = await fetch('https://cmov-johnatan.glitch.me//academia', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setAcademias(data);
        setRefreshing(false);
      } catch (error) {
        console.error('Error fetching academia:', error);
        setRefreshing(false);
      }
    }

    fetchAcademias();
  }, [refreshing]);

  const handleContratar = (idacademia, latitude, longitude) => {
    const idusuarios = route.params.idusuarios;

    fetch(`https://cmov-johnatan.glitch.me//usuarios/${idusuarios}`)
      .then(response => response.json())
      .then(userData => {
        userData.academia_id = idacademia;

        fetch(`https://cmov-johnatan.glitch.me//usuarios/${idusuarios}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        })
          .then(response => response.json())
          .then(() => {
            Alert.alert('Contratado com sucesso!');

            navigation.navigate('TelaAcademia', { latitude, longitude });
          })
          .catch(err => {
            console.error('Error updating user:', err);
            Alert.alert('Erro ao contratar');
          });
      })
      .catch(err => {
        console.error('Error fetching user data:', err);
        Alert.alert('Erro ao contratar');
      });
  };

  const renderItemComponent = ({ item }) => (
    <View style={styles.listItem}>
      <View style={{ alignItems: 'center', flex: 1 }}>
        <Text style={{ fontWeight: 'bold' }}>{item.nome}</Text>
        <Text>{item.idacademia}</Text>
      </View>
      <TouchableOpacity
        style={{ height: 50, width: 100, justifyContent: 'center', alignItems: 'center' }}
        //onPress={() =>  handleContratar(item.idacademia, item.latitude, item.longitude)}
        onPress={() =>   navigation.navigate('TelaAcademia', { item })}
      >
        <Text style={{ color: 'blue' }}>Contratar</Text>
      </TouchableOpacity>
    </View>
  );

  const ItemSeparator = () => (
    <View style={{
      height: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      marginLeft: 5,
      marginRight: 5,
    }} />
  );

  const handleRefresh = () => {
    setRefreshing(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={academias}
        renderItem={renderItemComponent}
        keyExtractor={item => item.idacademia.toString()}
        ItemSeparatorComponent={ItemSeparator}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    marginTop: 60,
  },
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: '#FFF',
    width: '80%',
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 5,
  },
});
