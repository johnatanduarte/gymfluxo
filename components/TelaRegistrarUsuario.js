import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';

export function TelaRegistrarUsuario({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaConfirma, setSenhaConfirma] = useState('');
  const [academia_id, setAcademia] = useState('');
  const [instrutor_idinstrutor, setInstrutor] = useState(null);

  function Registrar() {
    if (senha === senhaConfirma) {
      console.log('ok');
      var userObj = {
        nome: nome,
        email: email,
        senha: senha,
        academia_id: academia_id,
        instrutor_idinstrutor: instrutor_idinstrutor,
      };
      var jsonBody = JSON.stringify(userObj);
      console.log(jsonBody);
      fetch('https://cmov-johnatan.glitch.me//usuarios', {
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
          navigation.navigate('TelaLogin');
        })
        .catch((err) => {
          console.log(err);
          alert('Erro no cadastro');
        });
    } else {
      alert('Senhas diferentes!');
    }
  }

  return (
    <View>
      <Text>Registrar usuario</Text>

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

      <TextInput
        placeholder="academia 'coloque o numero da academia escolhida'"
        style={styles.input}
        onChangeText={(event) => setAcademia(event)}
      />

      <TextInput
        placeholder="instrutor"
        style={styles.input}
        onChangeText={(event) => setInstrutor(event)}
      />

      <Button title="Cadastrar" color="black" onPress={Registrar} />
      <Button title="Ver Academias" onPress={() => navigation.navigate('TelaListaAcademia')}/>
      <Button title="Voltar" onPress={() => navigation.goBack()} />
      <Text style={{ marginTop: 8, marginBottom: 1 }}>Clique em ver academias e escolha a melhor para voce! :</Text>
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
