import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export function TelaMensalidade({ navigation, route }) {
  const [valor, setValor] = useState(85);
  const [dataPagamento, setDataPagamento] = useState('');
  const [dataPagamentoAnterior, setDataPagamentoAnterior] = useState('');

  useEffect(() => {
    const dataAtual = new Date();
    const formattedData = `${dataAtual.getDate()}/${dataAtual.getMonth() + 1}/${dataAtual.getFullYear()}`;
    setDataPagamento(formattedData);
  }, []);

  const realizarPagamento = () => {
    if (dataPagamento === dataPagamentoAnterior) {
      Alert.alert('Pagamento já foi feito!', 'Você já realizou o pagamento para esta data.');
      return;
    }

    const pagamentoObj = {
      valor: valor,
      dataPagamento: dataPagamento,
      usuarios_idusuarios: route.params.idusuarios,
    };

    const jsonBody = JSON.stringify(pagamentoObj);

    fetch('https://cmov-johnatan.glitch.me//mensalidade', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: jsonBody,
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.menssagem) {
          console.log('Erro ao realizar pagamento:', json.menssagem);
        } else {
          console.log('Pagamento realizado com sucesso!');
          setDataPagamentoAnterior(dataPagamento);
          navigation.goBack();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pagamento da Mensalidade</Text>
      <TextInput
        style={styles.input}
        placeholder="Valor"
        keyboardType="numeric"
        value={valor.toString()}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Pagamento (dd/mm/aaaa)"
        value={dataPagamento}
        onChangeText={setDataPagamento}
      />
      <Button title="Pagar" onPress={realizarPagamento} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
});
