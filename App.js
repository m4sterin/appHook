import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-community/async-storage'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function AppView() {
  const [nome, setNome] = useState("Caio");
  const [input, setInput] = useState("");

  useEffect(() =>{}, []);

  useEffect(() => {
    async function saveStorage() {
      await AsyncStorage.setItem('nomes', nome);
    }
    saveStorage();
  }, [nome]);

  function alteraNome() {
    setNome(input);
    setInput('');
  }
  

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Digite o seu nome"
        value={input}
        onChangeText={(texto) => setInput(texto)}
      />
      <TouchableOpacity style={styles.btn} onPress={alteraNome}>
        <Text style={styles.btnText}>Alterar nome</Text>
      </TouchableOpacity>
      <Text style={styles.texto}>{nome}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
  texto: {
    fontSize: 30,
  },
  btn: {
    backgroundColor: "red",
    alignItems: "center",
  },
  btnText: {
    color: "#FFF",
  },
});
