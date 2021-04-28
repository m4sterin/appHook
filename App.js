import React, { useState, useEffect, useMemo, useRef} from "react";
import AsyncStorage from '@react-native-community/async-storage'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function AppView() {
  const [nome, setNome] = useState("Teste");
  const [input, setInput] = useState("");
  const nomeInput = useRef(null);
  useEffect(() =>{

    async function getStorage() {
      const nomeStorage = await AsyncStorage.getItem('nomes');
      if(nomeStorage !== null) {
        setNome(nomeStorage);
      }
    }

  }, []);

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

  function novoNome() {
    nomeInput.current.focus();
  }
  
  const letrasNome = useMemo(() => {
    return nome.length;
  }, [nome]);


  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Digite o seu nome"
        value={input}
        onChangeText={(texto) => setInput(texto)}
        ref={nomeInput}
      />
      <TouchableOpacity style={styles.btn} onPress={alteraNome}>
        <Text style={styles.btnText}>Alterar nome</Text>
      </TouchableOpacity>
      <Text style={styles.texto}>{nome}</Text>
      <Text style={styles.contador}>O nome tem {letrasNome} letras</Text>
      
      <TouchableOpacity style={styles.btnNovoNome} onPress={novoNome}>
        <Text style={styles.btnText}>Adicionar Nome</Text>
      </TouchableOpacity>
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
  contador: {
    fontSize: 16,
  },
  btnNovoNome: {
    backgroundColor: "#83C300",
    alignItems: "center",
  },
});
