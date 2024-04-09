import { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, Alert } from 'react-native';

export function TelaContratar({navigation, route}) {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
 
  useEffect(() => {
    async function fetchList() {
      setRefreshing(true);
      fetch('https://cmov-johnatan.glitch.me//instrutor',{
        headers: {
          'Content-Type': 'application/json',
          'authorization' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvZHJpZ29tYXJxdWVzQGdtYWlsLmNvbSIsInNlbmhhIjoiODg4OCIsImlhdCI6MTY5NjI4MDkzNX0.bCFWhsFu5BrSYDdDMCXvKlEUx3iE-8lBt4vzXJ21U7Q',
        }
      })
      .then(res => res.json())
      .then(resJson => {
        setData(resJson);
        setRefreshing(false);
      })
      .catch(e => console.log(e));
    }
    fetchList();
  }, []);

  console.log(data);

  const renderItemComponent = ({ item }) => (
    <View style={styles.listItem}>
      <View style={{ alignItems: "center", flex: 1 }}>
        <Text style={{ fontWeight: "bold" }}>{item.nome}</Text>
        <Text>{item.idinstrutor}</Text>
      </View>
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
    <Text style={styles.title}> Seja Bem Vindo!</Text>
      <Text style={styles.title}>Instrutores com os respectivos ids</Text>
      <FlatList
        data={data}
        renderItem={renderItemComponent}
        keyExtractor={item => item.idinstrutor.toString()}
        ItemSeparatorComponent={ItemSeparator}
        refreshing={refreshing}
        onRefresh={handleRefresh}  
      />
      
      <Button title="Sair" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    marginTop: 60
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
    borderRadius: 5
  }
});
