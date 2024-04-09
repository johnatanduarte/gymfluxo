import { Text, View, TextInput, Button } from 'react-native';
import { useState, useEffect } from 'react';

export function TelaEditarAcademia({ navigation, route }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaConfirma, setSenhaConfirma] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const idacademia = route.params.idacademia;

  useEffect(() => {
    async function fetchList() {
      const response = await fetch(`https://cmov-johnatan.glitch.me//academia/${idacademia}`);
      const json = await response.json();
      setNome(json[0].nome);
      setEmail(json[0].email);
      setSenha(json[0].senha);
      setSenhaConfirma(json[0].senhaConfirma);
      setLatitude(json[0].latitude);
      setLongitude(json[0].longitude);
    }
    fetchList();
  }, [idacademia]);

  function Editar() {
    if (senha === senhaConfirma) {
      const userObj = {
        nome,
        email,
        senha,
        latitude,
        longitude,
      };
      const jsonBody = JSON.stringify(userObj);

      fetch(`https://cmov-johnatan.glitch.me//academia/${idacademia}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: jsonBody,
      })
        .then((response) => response.json())
        .then((json) => {
          navigation.navigate('TelaListaAcademia', { idacademia });
        })
        .catch((err) => {
          alert('Erro na edição');
        });
    } else {
      alert('Senhas diferentes!');
    }
  }

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button title="Voltar" onPress={() => navigation.goBack()} />
        <Text style={{ fontWeight: 'bold' }}>Editar academia</Text>
      </View>

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={(event) => setNome(event)}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(event) => setEmail(event)}
      />

      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={(event) => setSenha(event)}
      />

      <TextInput
        placeholder="Confirmar Senha"
        value={senhaConfirma}
        onChangeText={(event) => setSenhaConfirma(event)}
      />

      <TextInput
        placeholder="Latitude"
        value={latitude}
        onChangeText={(event) => setLatitude(event)}
      />

      <TextInput
        placeholder="Longitude"
        value={longitude}
        onChangeText={(event) => setLongitude(event)}
      />

      <Button title="Alterar" color="black" onPress={Editar} />
    </View>
  );
}
