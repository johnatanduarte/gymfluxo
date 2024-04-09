import { Text, View, TextInput, Button, StyleSheet, Alert } from 'react-native';

import { useState } from 'react';

import { setToken } from './routes/Autentica'

export function TelaLogin({navigation}) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function Logar() {
    console.log('ok');
    var loginObj = { email: email, senha: senha };
    var jsonBody = JSON.stringify(loginObj);
    console.log(jsonBody);
    fetch('https://cmov-johnatan.glitch.me//login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: jsonBody,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json); const token = json.token;
        if (token) {
          setToken(token);
          if (json.usuarios && json.usuarios.academia_id) {
            console.log("Navegar para TelaMenu");
            navigation.navigate('TelaMenu', { idusuarios: json.usuarios.idusuarios });
          } else {
            console.log("Navegar para TelaMenuInstrutor");
            navigation.navigate('TelaMenuInstrutor');
          }
        } else {
          console.log("Continuar na tela login");
          Alert.alert('Erro', 'Não cadastrado ou email ou senha errada!');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <View>
      <Text style={styles.title}>GymFluxo</Text>
      <Text>Login</Text>

      <TextInput
        placeholder="email"
        style={styles.input}
        onChangeText={(event) => setEmail(event)}
      />

      <TextInput
        secureTextEntry={true}
        placeholder="senha"
        style={styles.input}
        onChangeText={(event) => setSenha(event)}
      />

      <Button title="Entrar" color="black" onPress={Logar} />
      <Button title="Registrar - usuario" color="blue" onPress={() => navigation.navigate('TelaRegistrarUsuario')} />
      <Button title="Registrar - instrutor" color="blue" onPress={() => navigation.navigate('TelaRegistrarInstrutor')} />
      <Button title="Registrar - academia" color="blue" onPress={() => navigation.navigate('TelaRegistrarAcademia')} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
  },
});
