import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { stripBaseUrl } from "expo-router/build/fork/getStateFromPath";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";

const index = () => {
  const router = useRouter();
  const cart = useSelector((state) => state.cart.cart)
  console.log(cart)

  return (
    <View>
      <View
        style={{
          padding: 10,
          backgroundColor: "#0066b2",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "500", color: "white" }}>
          Basket Total
        </Text>
        <View>
          <Text style={{ color: "white", fontSize: 17 }}>Kes 0</Text>
          <Text style={{ color: "white", fontSize: 17 }}> For 0 Items</Text>
        </View>
      </View>
      <View
        style={{
          padding: 10,
          borderRadius: 7,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          marginTop: 20,
          marginHorizontal: 10,
          height: 200,
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "600" }}>
          Your Basket is Empty
        </Text>
      </View>
      <Pressable
      onPress={() => router.push("/basket/select")}
        style={{
          marginTop: 15,
          alignItems: "center",
          justifyContent: "center",
          padding: 15,
          width: 200,
          marginRight:"auto",
          marginLeft:"auto",
          borderRadius:4,
          backgroundColor:"#006692"
        }}
      >
        <Text style={{textAlign:"center", color:"white"}}>Request for Service</Text>
      </Pressable>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
