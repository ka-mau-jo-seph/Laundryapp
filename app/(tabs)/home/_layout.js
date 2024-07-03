import { Stack } from "expo-router";

export default function Layout(){
  return (
    <>
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="index"/>
      <Stack.Screen name="address"/>
      <Stack.Screen name="add"/>
      <Stack.Screen name="profile"/>
      <Stack.Screen name="payment"/>
    </Stack>
    </>
  )
}