import * as React from "react";
import * as RN from "react-native";
import EmojiPicker from "rn-emoji-keyboard";
import { database } from "../config/fb";
import { doc, updateDoc, getDoc } from "firebase/firestore"; // Importar getDoc
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Edit() {
  const navigation = useNavigation();
  const route = useRoute();
  const productId = route.params?.productId;

  const [product, setProduct] = React.useState({
    emoji: "",
    name: "",
    categoria: "",
    price: "",
  });

  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true); // Estado para controlar la carga

  React.useEffect(() => {
    const fetchProductData = async () => {
      try {
        const docRef = doc(database, "videojuegos", productId);
        const docSnap = await getDoc(docRef); // Usar getDoc

        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          console.log("No se encontró el documento.");
        }
      } catch (error) {
        console.error("Error al obtener el documento:", error);
      } finally {
        setIsLoading(false); // Indicar que la carga ha terminado
      }
    };

    fetchProductData();
  }, [productId]);

  const handlePick = (emojiObject) => {
    setProduct({ ...product, emoji: emojiObject.emoji });
    setIsOpen(false);
  };

  const onSave = async () => {
    try {
      const docRef = doc(database, "videojuegos", productId);
      await updateDoc(docRef, product);
      navigation.goBack();
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      // Manejo de errores (mostrar un mensaje al usuario, etc.)
    }
  };

  return (
    <RN.View style={styles.container}>
      <RN.Text style={styles.title}>Producto</RN.Text>
      <RN.Text style={styles.emoji} onPress={() => setIsOpen(true)}>
        {product.emoji}
      </RN.Text>
      <EmojiPicker
        onEmojiSelected={handlePick}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <RN.TextInput
        onChangeText={(text) => setProduct({ ...product, name: text })}
        placeholder="Nombre del video juego"
        style={styles.inputContainer}
      />
      <RN.TextInput
        onChangeText={(text) => setProduct({ ...product, categoria: text })}
        placeholder="Categoria"
        style={styles.inputContainer}
      />
      <RN.TextInput
        onChangeText={(text) => setProduct({ ...product, price: text })}
        placeholder="$ Precio"
        style={styles.inputContainer}
        keyboardType="number-pad"
      />
      <RN.Button title="Actualizar" onPress={onSave} />
    </RN.View>
  );
}

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
  },
  inputContainer: {
    width: "90%",
    padding: 13,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
  },
  emoji: {
    fontSize: 100,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 10,
    marginVertical: 6,
  },
});
