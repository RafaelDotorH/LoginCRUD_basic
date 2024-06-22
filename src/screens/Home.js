import * as React from "react";
import * as RN from "react-native";
import { useNavigation } from "@react-navigation/native";
import { database } from "../config/fb";
import {
  QuerySnapshot,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import Product from "../components/Product";
import { FontSizeOutlined } from "@ant-design/icons";

export default function Home() {
  const navigation = useNavigation();
  const [products, setProducts] = React.useState([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <RN.Button title="Añadir" onPress={() => navigation.navigate("Add")} />
      ),
    });
  });

  React.useEffect(() => {
    const collectionRef = collection(database, "videojuegos");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setProducts(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          emoji: doc.data().emoji,
          name: doc.data().name,
          categoria: doc.data().categoria,
          price: doc.data().price,
          isSold: doc.data().isSold,
          createdAt: doc.data().createdAt, // Corregido el nombre del campo
        }))
      );
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <RN.ImageBackground
        source={require("../../assets/fondoProduct.jpg")} // Reemplaza con la ruta correcta de tu imagen
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }} // Estilos para que la imagen ocupe toda la pantalla
      >
        <RN.Text
          style={{
            fontSize: 30,
            textAlign: "center",
            color: "#fff",
          }}
        >
          Products
        </RN.Text>
        <RN.ScrollView style={{width: 350}}>
          {products.map((product) => (
            <Product key={product.id} {...product} /> // Pasa las propiedades del producto
          ))}
        </RN.ScrollView>
      </RN.ImageBackground>
    </>
  );
}
