import React from 'react'; 
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

export default function TelaAcademia({ navigation, route }) {
  const { item } = route.params;
  
  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={{
        latitude: item.latitude,
        longitude: item.longitude,
        latitudeDelta: 0.922,
        longitudeDelta: 0.421,
      }} >
      <Marker coordinate={{
        latitude:item.latitude,
        longitude:item.longitude,
      }}
     
      description={item.nome}
      />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
