import { Pressable, TextInput, Text, View, Alert } from "react-native";
import React, { useState } from "react";

const ProceedToPayment = ({ totalAmount }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  
  const handlePayment = () => {
    if (!phoneNumber) {
      Alert.alert("Invalid Input", "Please enter a valid phone number.");
      return;
    }

    // Payment processing logic goes here
    Alert.alert("Payment Processing", `Phone Number: ${phoneNumber}, Amount: ${totalAmount}`);
  };

  return (
    <View style={{ padding: 10 }}>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
          borderRadius: 5,
        }}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <Pressable
        onPress={handlePayment}
        style={{
          backgroundColor: "#0066b2",
          padding: 10,
          borderRadius: 5,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "500" }}>Proceed to Payment</Text>
      </Pressable>
    </View>
  );
};

export default ProceedToPayment;
