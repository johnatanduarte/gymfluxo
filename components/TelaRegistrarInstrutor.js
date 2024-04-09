import React from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';

export function TelaRegistrarInstrutor({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaConfirma, setSenhaConfirma] = useState('');

  function Registrar() {
    if (senha === senhaConfirma) {
      console.log('ok');
      var userObj = { nome: nome, email: email, senha: senha };
      var jsonBody = JSON.stringify(userObj);
      console.log(jsonBody);
      fetch('https://cmov-johnatan.glitch.me//instrutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: jsonBody,
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          navigation.navigate('TelaLogin', { idinstrutor: json.idinstrutor }); // Navegue para TelaLogin após o cadastro bem-sucedido
        })
        .catch((err) => {
          console.log(err);
          alert('Erro no cadastro'); // Trate erros de cadastro
        });
    } else {
      alert('Senhas diferentes!');
    }
  }

  return (
    <View>
      <Text>Registrar instrutor</Text>

      <TextInput
        placeholder="nome"
        style={styles.input}
        onChangeText={(event) => setNome(event)}
      />

      <TextInput
        placeholder="email"
        style={styles.input}
        onChangeText={(event) => setEmail(event)}
      />

      <TextInput
        placeholder="senha"
        style={styles.input}
        onChangeText={(event) => setSenha(event)}
      />

      <TextInput
        placeholder="confirmar senha"
        style={styles.input}
        onChangeText={(event) => setSenhaConfirma(event)}
      />

      <Button title="Cadastrar" color="black" onPress={Registrar} />
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
  },
});
