import * as React from "react";
import * as RN from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Alert } from "react-native"; // Asegúrate de importar Alert de react-native
import { auth, database } from "../config/fb";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigation = useNavigation();

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Cuenta creada");
        const user = userCredential.user;
        console.log(user);
        Alert.alert("Cuenta Creada")
        // Aquí puedes agregar lógica adicional después de crear la cuenta (e.g., navegar a otra pantalla)
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Error al crear la cuenta", error.message); // Mostrar alerta de error
      });
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("¡Inicio de sesión exitoso!");
        const user = userCredential.user;
        console.log(user);
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Error al iniciar sesión", error.message); // Mostrar alerta de error
      });
  };

  return (
    <RN.View
      style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
    >
      <RN.ImageBackground
        source={require("../../assets/login.png")} // Reemplaza con la ruta correcta de tu imagen
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }} // Estilos para que la imagen ocupe toda la pantalla
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.3)"]} // Degradado negro transparente
          style={RN.StyleSheet.absoluteFillObject} // Para que el degradado cubra toda la imagen
        />
        <RN.View style={styles.content}>
          <RN.Text style={styles.title}>Bienvenido</RN.Text>

          <RN.View style={styles.inputContainer}>
            <Ionicons
              name="person-outline"
              size={24}
              color="white"
              style={styles.icon}
            />
            <RN.TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
            />
          </RN.View>

          <RN.View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={24}
              color="white"
              style={styles.icon}
            />
            <RN.TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </RN.View>

          <RN.TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <RN.Text style={styles.buttonText}>Iniciar Sesión</RN.Text>
          </RN.TouchableOpacity>

          <RN.TouchableOpacity
            style={styles.button}
            onPress={handleCreateAccount}
          >
            <RN.Text style={styles.buttonText}>Registrar</RN.Text>
          </RN.TouchableOpacity>
        </RN.View>
      </RN.ImageBackground>
    </RN.View>
  );
}

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 50,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.3)",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: "white",
  },
  button: {
    marginTop: 15,
    backgroundColor: "#2980b9",
    padding: 15,
    borderRadius: 5,
    minWidth: 200,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  registerText: {
    color: "white",
    marginTop: 20,
    textAlign: "center",
  },
});
