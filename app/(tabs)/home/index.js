import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, Pressable, Animated, StyleSheet, Dimensions , Image} from "react-native";
import { EvilIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const Index = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [animationComplete, setAnimationComplete] = useState(false);
  const [fadeAnimations] = useState(Array(7).fill(0).map(() => new Animated.Value(0)));

  useEffect(() => {
    // Simulated user email
    const userEmail = "joseph@example.com";

    // Function to extract user's name from email
    const extractNameFromEmail = (email) => {
      const atIndex = email.indexOf("@");
      if (atIndex !== -1) {
        return email.substring(0, atIndex);
      }
      return "";
    };

    // Extract the user's name and update the state
    const name = extractNameFromEmail(userEmail);
    setUserName(name);

    // Determine time of the day and set greeting accordingly
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good morning");
    } else if (hour < 16) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }

    // Animation effect
    Animated.stagger(200, fadeAnimations.map(anim => Animated.timing(anim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }))).start(() => setAnimationComplete(true));
  }, []);

  const animatedStyles = fadeAnimations.map((anim, index) => ({
    opacity: anim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [(index + 1) * 20, 0],
        }),
      },
    ],
  }));

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Animated.View style={[styles.logoContainer, animationComplete && animatedStyles[0]]}>
              <Text style={styles.logo}>M-Dhobi</Text>
            </Animated.View>
            <View style={styles.userInfo}>
              <View>
                <Text style={styles.greeting}>{greeting},</Text>
                <Text style={styles.userName}>{userName}!</Text>
              </View>
              <Pressable onPress={() => router.push("/home/profile")} style={styles.profileButton}>
                <EvilIcons name="user" size={80} color="white" />
              </Pressable>
            </View>
            <Animated.View style={[styles.quickHelp, animationComplete && animatedStyles[1]]}>
              <MaterialCommunityIcons name="information-outline" size={24} color="white" />
              <Text style={styles.quickHelpText}>QUICK HELP</Text>
            </Animated.View>
          </View>
         <View
         style ={{backgroundColor:"white", borderRadius:10,marginTop:30}}
         >
         <View
          style ={{marginTop:30,}}
          >

            <Text style={{color:"black",fontSize:30,fontWeight:"500"}}> Services Offered</Text>
          </View>
          <View
         style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          padding: 16,
          marginTop: '3%',
          alignItems: 'center',
        }} 
        >
          <Pressable
            //onPress={() => setSelectedOption("Wash + Fold")}
            style={{
              backgroundColor: "#1FB0FF",
              width: 80,
              height: 80,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 40,
              //borderWidth: 1,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.8,
              shadowRadius: 10,
              elevation: 5, // This is for Android shadow
            }}
            
          >
            <Image
              style={{ width: 40, height: 40 }}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/7769/7769829.png",
              }}
            />
            <Text style={{ textAlign: "center", fontSize: 12, marginTop: 5 }}>
              Wash + Fold
            </Text>
          </Pressable>
          <Pressable
            //onPress={() => setSelectedOption("Wash + Iron")}
            style={{
              backgroundColor: "#6E9AED",
              width: 80,
              height: 80,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 40,
              //borderWidth: 1,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.8,
              shadowRadius: 10,
              elevation: 5, // This is for Android shadow
            }}
            
          >
            <Image
              style={{ width: 40, height: 40 }}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/802/802826.png",
              }}
            />
            <Text style={{ textAlign: "center", fontSize: 12, marginTop: 5 }}>
              Wash + Iron
            </Text>
          </Pressable>
          <Pressable
            //onPress={() => setSelectedOption("Steam Iron")}
            style={{
              backgroundColor: "#4981E9",
              width: 80,
              height: 80,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 40,
              //borderWidth: 1,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.8,
              shadowRadius: 10,
              elevation: 5, // This is for Android shadow
              
            }}
            
          >
            <Image
              style={{ width: 40, height: 40 }}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/12299/12299913.png",
              }}
            />
            <Text style={{ textAlign: "center", fontSize: 12, marginTop: 5 ,color:"black"}}>
              Steam Iron
            </Text>
          </Pressable>
          </View>
        <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          padding: 16,
          marginTop: '5%',
          alignItems: 'center',
        }} >
          <Pressable
            //onPress={() => setSelectedOption("Dry Clean")}
            style={{
              backgroundColor: "#80A7EF",
              width: 80,
              height: 80,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 40,
              //borderWidth: 1,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.8,
              shadowRadius: 10,
              elevation: 5, // This is for Android shadow
            }}
            
          >
            <Image
              style={{ width: 40, height: 40 }}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/7029/7029276.png",
              }}
            />
            <Text style={{ textAlign: "center", fontSize: 12, marginTop: 5 }}>
              Dry Clean
            </Text>
          </Pressable>
          
          <Pressable
            //onPress={() => setSelectedOption("Dry Clean")}
            style={{
              backgroundColor: "#48BEFF",
              width: 80,
              height: 80,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 40,
              //borderWidth: 1,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.8,
              shadowRadius: 10,
              elevation: 5, // This is for Android shadow
            }}
            
          >
           <Ionicons name="return-up-back" size={24} color="black" />
            <Text style={{ textAlign: "center", fontSize: 12, marginTop: 5 }}>
              Pickup
            </Text>
          </Pressable>
          <Pressable
            //onPress={() => setSelectedOption("Dry Clean")}
            style={{
              backgroundColor: "#0FFA4A",
              width: 80,
              height: 80,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 40,
              //borderWidth: 1,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.8,
              shadowRadius: 10,
              elevation: 5, // This is for Android shadow
            }}
            
          >
            <Ionicons name="return-down-forward-outline" size={24} color="black" />
            <Text style={{ textAlign: "center", fontSize: 12, marginTop: 5 }}>
              Delivery
            </Text>
          </Pressable>
        </View>
         </View>
        
          <ScrollView contentContainerStyle={styles.scrollContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
            
            <Pressable onPress={() => router.push("/home/address")}>

              <Animated.View style={[styles.card, styles.quickOrder, animationComplete && animatedStyles[2]]}>
                <Text style={styles.quickOrderTitle}>QUICK ORDER</Text>
                <Text>Book a Pickup and a delivery Option</Text>
                <Text>We will be at Your doorstep on time </Text>
                <Pressable
                onPress={() => router.push("/home/address")}
                style={styles.bookNowButton}>
                  <Text style={styles.bookNowText}>REQUEST NOW</Text>
                </Pressable>
              </Animated.View>
            </Pressable>
        
            <Animated.View style={[styles.card, styles.clubContainer, animationComplete && animatedStyles[3]]}>
              
              <View style={styles.clubInfo}>
          
                <Text style={styles.clubTitle}>Club <Text style={styles.clubSubtitle}>Ultimate</Text></Text>
                <Text style={styles.clubDescription}>Put your laundry on Cruise Control</Text>
                <Text style={styles.clubDescription}>Subscribe,get the Benefits        <View
                style={{backgroundColor:"#0066b2",paddingHorizontal:5,borderRadius:10}}
         >
         <AntDesign name="arrowright" size={24} color="white" />
         </View></Text>
              </View>
            </Animated.View>
            <Animated.View style={[styles.card, styles.placeOrderContainer, animationComplete && animatedStyles[4]]}>
              <View style={styles.placeOrderInfo}>
                <View style={styles.placeOrderTitleContainer}>
                  <Feather name="smartphone" size={24} color="#034694" />
                  <Text style={styles.placeOrderTitle}>Request Your <Text style={styles.placeOrderSubtitle}>Service</Text></Text>
                </View>
                <Text style={styles.placeOrderDescription}>Select Items from the catalog below</Text>
                <Text style={styles.placeOrderDescription}>and book your order, it's about time</Text>
              </View>
            </Animated.View>
            <Animated.View style={[styles.card, styles.planContainer, animationComplete && animatedStyles[5]]}>
              <View style={styles.planInfo}>
                <Text style={styles.planTitle}>WHAT'S THE PLAN</Text>
                <Text style={styles.planTitle}>FOR THE PLANET</Text>
              </View>
            </Animated.View>
            <Pressable onPress={() => router.push("/basket/select")}>
              <View style={[styles.card, styles.nextAvailableContainer]}>
                <View style={styles.nextAvailableIcon}>
                  <Ionicons name="notifications-outline" size={24} color="black" />
                  <Text>Next Available</Text>
                </View>
                <Text style={styles.nextAvailableText}>Order within 15 minutes to catch this pickup slot</Text>
                <Pressable 
                 onPress={() => router.push("/basket/select")}
                style={styles.addItemsButton}>
                  <Ionicons name="basket-outline" size={24} color="white" />
                  <Text style={styles.addItemsButtonText}>ADD ITEMS</Text>
                </Pressable>
              </View>
            </Pressable>
            
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  content: {
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: "#4296fb",
    width: "100%",
    paddingLeft: 20,
    paddingRight: 30,
    borderBottomStartRadius: 20,
    borderBottomWidth: 0,
    borderBottomEndRadius: 20,
    borderBottomColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8, // Increase shadow opacity for a highly visible shadow
    shadowRadius: 10,   // Increase shadow radius for a more spread out shadow
    elevation: 5,       // Set elevation for Android shadow
  },
  
  logoContainer: {
    marginVertical: 20,
  },
  logo: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 30,
    fontStyle: "italic",
    textTransform: "uppercase",
    letterSpacing: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  profileButton: {
    left: "45%",
  },
  userInfo: {
    flexDirection: "row",
    marginBottom: 40,
    justifyContent: "center",
    alignItems: "center",
    gap: 220,
  },
  greeting: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 3,
  },
  userName: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  quickHelp: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  quickHelpText: {
    fontSize: 14,
    color: "#fff",
    marginLeft: 5,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    backgroundColor: "white",
    paddingTop: 20,
    marginTop:'20%'
  },
  card: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginRight: 20,
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  quickOrderTitle: {
    fontSize: 15,
    color: "#0066b2",
    marginBottom: 5,
  },
  bookNowButton: {
    backgroundColor: "#0066b2",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    marginTop: 10,
  },
  bookNowText: {
    fontSize: 13,
    fontWeight: "400",
    color: 'white',
  },
  clubContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginRight: 20,
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center"
  },
  clubInfo: {
    flex: 1,
  },
  clubTitle: {
    color: "#0066b2",
    fontSize: 15,
    fontWeight: "bold",
  },
  clubSubtitle: {
    color: "#034694",
    fontWeight: "bold",
  },
  clubDescription: {
    fontSize: 12,
    fontWeight: "300",
    marginTop: 5,
  },
  placeOrderContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginRight: 20,
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  placeOrderInfo: {
    flex: 1,
  },
  placeOrderTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  placeOrderTitle: {
    color: "#0066b2",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 5,
  },
  placeOrderSubtitle: {
    color: "#034694",
    fontWeight: "bold",
  },
  placeOrderDescription: {
    fontSize: 12,
    fontWeight: "300",
    marginTop: 5,
  },
  planContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginRight: 20,
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  planInfo: {
    flex: 1,
  },
  planTitle: {
    color: "#0066b2",
    fontSize: 20,
    fontWeight: "bold",
  },
  nextAvailableContainer: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginRight: 20,
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  nextAvailableIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  nextAvailableText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#034694",
    marginTop: 5,
  },
  addItemsButton: {
    flexDirection: "row",
    backgroundColor: "#0066b2",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addItemsButtonText: {
    fontSize: 13,
    fontWeight: "400",
    color: 'white',
    marginLeft: 5,
  },
});
