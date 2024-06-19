import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { auth, db } from "../../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "expo-router";

const add = () => {
  const [name, setName] = useState("");
  const [hostel, setHostel] = useState("");
  const [landmark, setLandmark] = useState("");
  const [contact, setContactNO] = useState("");
  const userUid = auth?.currentUser.uid;
  const router = useRouter();
  const addAddress = async () => {
    try {
      const addressCollectionRef = collection(
        db,
        "users",
        userUid,
        "userAddresses"
      );


      const addresssDocRef = await addDoc(addressCollectionRef, {
        name: name,
        hostel: hostel,
        landmark: landmark,
        contact: contact,
      });

      console.log("address added ", addresssDocRef.id);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          Add  new Address
        </Text>

       

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Full name</Text>

          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="enter your name"
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
           Hostel
          </Text>

          <TextInput
            value={hostel}
            onChangeText={(text) => setHostel(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder=""
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Landmark</Text>

          <TextInput
            value={landmark}
            onChangeText={(text) => setLandmark(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="eg near Kabiruini"
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Contact NO:</Text>

          <TextInput
            value={contact}
            onChangeText={(text) => setContactNO(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter Contact NO"
          />
        </View>

        <Pressable
        
          onPress={addAddress}
          style={{
            backgroundColor: "#0066b2",
            padding: 19,
            borderRadius: 6,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Pressable
          //onPress={() => router.push("/home/add")}
          >
          <Text style={{color:"#fff"}}>Add Address</Text>
          </Pressable>
         
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default add;

const styles = StyleSheet.create({});