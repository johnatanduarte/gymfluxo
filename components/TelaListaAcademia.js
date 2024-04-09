import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button } from 'react-native';

export function TelaListaAcademia({ navigation }) {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    async function fetchList() {
      setRefreshing(true);
      fetch('https://cmov-johnatan.glitch.me//academia', {})
        .then(res => res.json())
        .then(resJson => {
          setData(resJson);
          setRefreshing(false);
        })
        .catch(e => console.log(e));
    }
    fetchList();
  }, []);

  const renderItemComponent = ({ item }) => (
    <View style={styles.listItem}>
      <View style={{ alignItems: "center", flex: 1 }}>
        <Text style={{ fontWeight: "bold" }}>{item.nome}</Text>
        <Text>{item.idacademia}</Text>
      </View>
      <TouchableOpacity
        style={{
          height: 50,
          width: "40%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "blue",
        }}
        onPress={() =>
          navigation.navigate('TelaAcademia', { item })
        }
      >
        <Text style={{ color: "white" }}>Ver Mapa</Text>
      </TouchableOpacity>
    </View>
  );

  const ItemSeparator = () => (
    <View style={{
      height: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      marginLeft: 5,
      marginRight: 5,
    }} />
  );

  const handleRefresh = () => {
    setRefreshing(false);
    fetchList();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>academias com os respectivos ids</Text>
      <FlatList
        data={data}
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: "#FFF",
    width: "80%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5,
  },
});
