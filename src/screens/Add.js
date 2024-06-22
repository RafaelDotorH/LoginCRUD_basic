import * as React from "react";
import * as RN from "react-native";
import EmojiPicker from "rn-emoji-keyboard";
import { database } from "../config/fb";
import { collection, addDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function Add() {
    const navigation = useNavigation();
    const [isOpen, setIsOpen]= React.useState(false);
    
    const [newItem , setNewItem ]=React.useState({
        emoji: '🎮',
        name: '',
        categoria: '',
        price: 0,
        isSolid: false,
        createdAt: new Date(),
        
    })

    const handlerPick= (emojiObject)=>{
        setNewItem({
            ...newItem,
            emoji:emojiObject.emoji,
        });
    }
    const onSend = async ()=>{
        await addDoc(collection(database,'videojuegos'), newItem);
        navigation.goBack();
    }
  return (
    <RN.View style={styles.container}>
      <RN.Text style={styles.title}>Producto</RN.Text>
      <RN.Text style={styles.emoji} onPress={()=>setIsOpen(true)}>{newItem.emoji}</RN.Text>
      <EmojiPicker
      onEmojiSelected={handlerPick}
      open={isOpen}
      onClose={()=>setIsOpen(false)}
      />
      <RN.TextInput
      onChangeText={(text)=>setNewItem({...newItem, name: text})}
      placeholder="Nombre del video juego"
      style={styles.inputContainer}
      />
      <RN.TextInput
      onChangeText={(text)=>setNewItem({...newItem, categoria: text})}
      placeholder="Categoria"
      style={styles.inputContainer}
      />
      <RN.TextInput
      onChangeText={(text)=>setNewItem({...newItem, price: text})}
      placeholder="$ Precio"
      style={styles.inputContainer}
      keyboardType="number-pad"
      />
      <RN.Button title="Agregar" onPress={onSend}/>
    </RN.View>
  );
}

const styles = RN.StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
    },
    inputContainer: {
        width: '90%',
        padding: 13,
        marginVertical: 6,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
    },
    emoji: {
        fontSize: 100,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        padding: 10,
        marginVertical: 6,
    }
});
