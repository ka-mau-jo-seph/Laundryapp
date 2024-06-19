import { StyleSheet, Text, View, ScrollView, Animated ,Pressable} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { Octicons, Ionicons, MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";

const Index = () => {
  const userUid = auth?.currentUser.uid;
  const [orders, setOrders] = useState([]);
  const [animationComplete, setAnimationComplete] = useState(false);
  const fadeAnimations = useState(Array(7).fill(0).map(() => new Animated.Value(0)))[0];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollectionRef = collection(db, "users", userUid, "orders");
        const ordersQuery = query(ordersCollectionRef);
        const querySnapshot = await getDocs(ordersQuery);
        const fetchedOrders = [];
        querySnapshot.forEach((doc) => {
          fetchedOrders.push({ id: doc.id, ...doc.data() });
        });
        setOrders(fetchedOrders);
      } catch (error) {
        console.log("error", error);
      }
    };

    // Animation effect
    Animated.stagger(200, fadeAnimations.map(anim =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      })
    )).start(() => setAnimationComplete(true));

    fetchOrders();
  }, [userUid, fadeAnimations]);

  const animatedStyles = fadeAnimations.map((anim, index) => ({
    opacity: anim,
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
    <ScrollView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={styles.headerContainer}>
        <Animated.View style={[styles.logoContainer, animationComplete && animatedStyles[0]]}>
          <Text style={styles.logo}>M-DHOBI</Text>
        </Animated.View>
        {/* <Octicons name="three-bars" size={24} color="white" /> */}
      </View>

      <View style={styles.ordersHeader}>
        <View style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </View>
        <Text style={styles.ordersTitle}>My Orders</Text>
      </View>

      <View>
        {orders?.map((item, index) => (
          <Pressable
            style={styles.orderCard}
            key={index}
          >
            <View style={styles.orderHeader}>
              <View>
                <Text style={styles.orderHeaderText}>Order Detail</Text>
                <Text style={styles.orderId}>{item?.id}</Text>
              </View>
              <View>
                <Text style={styles.orderHeaderText}>Payment</Text>
                <Text style={styles.paymentType}>Cash on delivery</Text>
              </View>
            </View>

            <View style={styles.orderBody}>
              <View>
                <Text style={styles.address}>{item?.address.houseNo} {item?.address.landmark}</Text>
                <View style={styles.infoSection}>
                  <Text style={styles.infoTitle}>PICK UP</Text>
                  <Text style={styles.infoText}>{item?.pickuptime}</Text>
                </View>
                <View style={styles.infoSection}>
                  <Text style={styles.infoTitle}>DELIVERY</Text>
                  <Text style={styles.infoText}>{item?.deliveryTime}</Text>
                </View>
              </View>

              <View style={styles.iconsContainer}>
                <View style={styles.iconWrapper}>
                  <MaterialCommunityIcons name="note-outline" size={24} color="black" />
                </View>
                <Text style={styles.iconLabel}>Order Summary</Text>
                <View style={styles.iconWrapper}>
                  <FontAwesome name="folder-open-o" size={24} color="black" />
                </View>
                <Text style={styles.iconLabel}>Feedback</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0066b2",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  logoContainer: {
    backgroundColor: "#0066b2",
    //justifyContent: "center",
    //alignItems: "center",
    width: "90%",
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
  ordersHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginLeft: 12,
  },
  backButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#C0C0C0",
    justifyContent: "center",
    alignItems: "center",
  },
  ordersTitle: {
    marginLeft: 12,
    fontSize: 18,
    fontWeight: "bold",
  },
  orderCard: {
    marginVertical: 12,
    backgroundColor: "white",
    borderRadius: 7,
    borderBottomWidth:1.5,
    borderBottomColor:"#0066b2",
  },
  orderHeader: {
    backgroundColor: "#0066b2",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  orderHeaderText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
  orderId: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
    marginTop: 3,
  },
  paymentType: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
    marginTop: 4,
  },
  orderBody: {
    backgroundColor: "white",
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  address: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "500",
    color: "gray",
    width: 200,
  },
  infoSection: {
    marginTop: 10,
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: "600",
  },
  infoText: {
    fontSize: 15,
    marginTop: 4,
  },
  iconsContainer: {
    alignItems: "center",
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F0F8FF",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  iconLabel: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "500",
  },
});

export default Index;
