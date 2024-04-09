import { Text, View, TextInput, Button, StyleSheet} from 'react-native';

import { useState, useEffect } from 'react';

export function TelaEditarInstrutor({navigation, route}){
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaConfirma, setSenhaConfirma] = useState('');

  const idinstrutor = route.params.idinstrutor;
   useEffect(() => {
 async function fetchList() {
    
    fetch('https://cmov-johnatan.glitch.me//instrutor/'+idinstrutor,{
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        setNome(resJson[0].nome);
        setEmail(resJson[0].email);
        setSenha(resJson[0].senha);
        setSenhaConfirma(resJson[0].senhaConfirma);
        
      })
      .catch(e => console.log(e));

}
     fetchList();
  }, [idinstrutor]);


  function Editar(){
    if(senha == senhaConfirma){
      console.log('ok');
      var userObj = { nome: nome, email: email, senha: senha}; 
      var jsonBody = JSON.stringify(userObj);
      console.log(jsonBody);
      
      fetch('https://cmov-johnatan.glitch.me//instrutor/'+idinstrutor, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        
        body: jsonBody,
      })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        navigation.navigate('TelaMenuInstrutor'); // Navegue para TelaMenu após o cadastro bem-sucedido
      })
      .catch((err) => {
        console.log(err);
        alert('Erro no cadastro'); // Trate erros de cadastro
      });
    } else {
      alert('Senhas diferentes!');
     }
    }

    return(
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button title="Voltar" onPress={() => navigation.goBack()} />
        <Text style={{ fontWeight: 'bold' }}>Editar Instrutor </Text>
      </View>

        <TextInput
        placeholder = "nome"
        value = {nome}
        style={styles.input}
        onChangeText={(event) => setNome(event)}
        />

        <TextInput
        placeholder="email"
        value = {email}
        style={styles.input}
        onChangeText={(event) => setEmail(event)}
        />

        <TextInput
        placeholder="senha"
        value = {senha}
        style={styles.input}
        onChangeText={(event) => setSenha(event)}
        />

        <TextInput
        placeholder="confirmar senha"
        style={styles.input}
        onChangeText={(event) => setSenhaConfirma(event)}
        />

          <Button title="Alterar" color="black" onPress={Editar} />
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



