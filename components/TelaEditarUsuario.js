import { Text, View, TextInput, Button } from 'react-native';
import { useState, useEffect } from 'react';

export function TelaEditarUsuario({ navigation, route }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaConfirma, setSenhaConfirma] = useState('');
  const [academia_id, setAcademia] = useState('');
  const [instrutor_idinstrutor, setInstrutor] = useState(null);

  const idusuarios = route.params.idusuarios;

  useEffect(() => {
    async function fetchList() {
      const response = await fetch(`https://cmov-johnatan.glitch.me//usuarios/${idusuarios}`);
      const json = await response.json();
      setNome(json[0].nome);
      setEmail(json[0].email);
      setSenha(json[0].senha);
      setSenhaConfirma(json[0].senhaConfirma);
      setAcademia(json[0].academia_id);
      setInstrutor(json[0].instrutor_idinstrutor);
    }
    fetchList();
  }, [idusuarios]);

  function Editar() {
    if (senha === senhaConfirma) {
      const userObj = {
        nome,
        email,
        senha,
        academia_id,
        instrutor_idinstrutor,
      };
      const jsonBody = JSON.stringify(userObj);

      fetch(`https://cmov-johnatan.glitch.me//usuarios/${idusuarios}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: jsonBody,
      })
        .then((response) => response.json())
        .then((json) => {
          navigation.navigate('TelaUsuario', { idusuarios });
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
        <Text style={{ fontWeight: 'bold' }}>Editar Usuário</Text>
      </View>

<Text style={{ marginTop: 8, marginBottom: 1 }}>Nome do Usuário:</Text>
<TextInput
  placeholder="Nome"
  value={nome}
  onChangeText={(event) => setNome(event)}
/>

<Text style={{ marginTop: 8, marginBottom: 1 }}>Endereço de Email:</Text>
<TextInput
  placeholder="Email"
  value={email}
  onChangeText={(event) => setEmail(event)}
/>

<Text style={{ marginTop: 8, marginBottom: 1 }}>Nova Senha:</Text>
<TextInput
  placeholder="Senha"
  value={senha}
  onChangeText={(event) => setSenha(event)}
/>

<Text style={{ marginTop: 8, marginBottom: 1 }}>Confirmar Nova Senha:</Text>
<TextInput
  placeholder="Confirmar Senha"
  value={senhaConfirma}
  onChangeText={(event) => setSenhaConfirma(event)}
/>

<Text style={{ marginTop: 8, marginBottom: 1 }}>ID da Academia:</Text>
<TextInput
  placeholder="Academia"
  value={academia_id}
  onChangeText={(event) => setAcademia(event)}
/>

<Text style={{ marginTop: 8, marginBottom: 1 }}>ID do Instrutor:</Text>
<TextInput
  placeholder="Instrutor"
  value={instrutor_idinstrutor}
  onChangeText={(event) => setInstrutor(event)}
/>

      <Button title="Alterar" color="black" onPress={Editar} />
    </View>
  );
}
