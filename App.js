import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

export default function App() {
  const [qtd, setQtd] = useState(0);
  const terminarOrden = useRef(null);

  useEffect(() => {
    async function getStorage() {
      const productStorage = await AsyncStorage.getItem("quantities");

      if (productStorage) {
        setQtd(Number(productStorage));
      }
    }
    getStorage();
  }, []);

  useEffect(() => {
    async function saveStorage() {
      await AsyncStorage.setItem("quantities", qtd);
    }
    saveStorage();
  }, [qtd]);

  function focaOrden() {
    terminarOrden.current.focus();
  }

  return (
    <View style={styles.container}>
      <View style={styles.cartao}>
        <Image
          style={styles.imagem}
          source={{
            uri:
              "https://images9.kabum.com.br/produtos/fotos/sync_mirakl/132279/Pipoqueira-Philco-Retr-PPI02-220V_1618601007_gg.jpg",
          }}
        />

        <View style={styles.prodInfo}>
          <Text style={{ fontWeight: "bold" }}>
            Pipoqueira Philco Retrô PPI02 220V
          </Text>
          <Text>
            Quantidade: <Text style={{ fontWeight: "bold" }}>{qtd}</Text>
          </Text>

          <View style={styles.adicionarProd}>
            <TouchableHighlight
              style={styles.rmvBtn}
              onPress={() => setQtd(qtd - 1)}
            >
              <Text
                style={{
                  color: "#ffff",
                  fontWeight: "bold",
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                -
              </Text>
            </TouchableHighlight>

            <TextInput
              style={styles.entradaTexto}
              placeholder="0"
              value={qtd}
              editable={false}
            />

            <TouchableHighlight
              style={styles.addBtn}
              onPress={() => setQtd(qtd + 1)}
            >
              <Text
                style={{
                  color: "#ffff",
                  fontWeight: "bold",
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                +
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>

      <View style={styles.ordenBtn}>
        <TouchableHighlight style={styles.finishiHim} onPress={focaOrden}>
          <Text
            style={{
              fontSize: 12,
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            FINISH HIM
          </Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.ordenBtns} ref={terminarOrden}>
          <Text
            style={{
              fontSize: 12,
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            REALIZAR PEDIDO
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    margin: 40,
  },
  cartao: {
    flexDirection: "row",
    width: 270,
    height: 150,
    borderRadius: 8,
    borderWidth: 2,
  },
  imagem: {
    width: 100,
    height: 100,
    borderRadius: 4,
    marginTop: 20,
  },
  prodInfo: {
    flexDirection: "column",
    width: 150,
    margin: 15,
  },
  adicionarProd: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
  entradaTexto: {
    borderRadius: 4,
    borderWidth: 1,
    width: 60,
    height: 30,
    padding: 5,
  },
  addBtn: {
    backgroundColor: "#F652A0",
    width: 30,
    marginLeft: 10,
    borderRadius: 15,
  },
  rmvBtn: {
    backgroundColor: "#5DF15D",
    width: 30,
    marginRight: 10,
    borderRadius: 15,
  },
  finishiHim: {
    justifyContent: "center",
    backgroundColor: "#F652A0",
    width: 150,
    height: 30,
    borderRadius: 4,
    borderColor: "#000000",
    borderWidth: 1,
  },
  ordenBtn: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
  },
  ordenBtns: {
    justifyContent: "center",
    backgroundColor: "#F652A0",
    width: 150,
    height: 30,
    borderRadius: 8,
    marginTop: 400,
    alignItems: "center",
  },
});
