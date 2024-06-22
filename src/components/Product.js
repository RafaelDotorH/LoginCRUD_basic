import * as React from "react";
import * as RN from "react-native";
import { database } from "../config/fb";
import { deleteDoc, doc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function Product({ id, emoji, name, price, categoria, isSold }) {
  const navigation = useNavigation();
  
  const onDelete = async () => {
    try {
      const docRef = doc(database, "videojuegos", id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      // Manejo de errores (mostrar un mensaje al usuario, etc.)
    }
  };

  const onEdit = () => {
    navigation.navigate('Edit', { productId: id });
  };

  return (
    <RN.View style={styles.container}>
      <RN.View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <RN.Text style={styles.price}>{name}</RN.Text>
        <RN.Button title="Eliminar" onPress={onDelete} color="#DC2626" />
      </RN.View>
      <RN.Text style={styles.emoji}>{emoji}</RN.Text>
      <RN.Text style={styles.name}>{name}</RN.Text>
      <RN.Text style={styles.categoria}>{categoria}</RN.Text>
      <RN.Text style={styles.price}>{price}</RN.Text>
      <RN.TouchableOpacity onPress={onEdit} style={styles.button}>
        <RN.Text style={styles.buttonText}>Editar</RN.Text>
      </RN.TouchableOpacity>
    </RN.View>
  );
}

const styles = RN.StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 8,
  },
  emoji: {
    fontSize: 100,
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
  },
  categoria: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  button: {
    backgroundColor: "#0FA5E9",
    padding: 10,
    marginVertical: 6,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});
