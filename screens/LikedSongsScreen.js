import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { ScrollView, Pressable, TextInput, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";

const LikedSongsScreen = () => {
  const navigation = useNavigation();
  const [input, setInput] = useState("");

  return (
    <LinearGradient colors={["#614385", "#516395"]} style={{ flex: 1 }}>
      <SafeAreaView>
        <ScrollView stlye={{ flex: 1, marginTop: 50 }}>
          <Pressable
            style={{ marginHorizontal: 10 }}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrowleft" size={24} color="white" />
          </Pressable>

          <View
            style={{
              marginHorizontal: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 9,
            }}
          >
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                backgroundColor: "#42275a",
                padding: 9,
                flex: 1,
                borderRadius: 3,
                height: 38,
              }}
            >
              <AntDesign name="search1" size={20} color="white" />
              <TextInput
                value={input}
                onChangeText={(text) => setInput(text)}
                placeholder="Find in Liked Songs"
                placeholderTextColor={"white"}
                style={{ fontWeight: "500", color: "white" }}
              />
            </Pressable>

            <Pressable
              style={{
                marginHorizontal: 10,
                backgroundColor: "#42275a",
                padding: 10,
                borderRadius: 3,
                height: 38,
              }}
            >
              <Text style={{ color: "white" }}>Sort</Text>
            </Pressable>
          </View>
          <View style={{ marginTop: 50, marginHorizontal: 10, gap: 5 }}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
              Liked Songs
            </Text>
            <Text style={{ color: "white", fontWeight: 400, fontSize: 15 }}>
              430 Songs
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 10,
            }}
          >
            <Pressable
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: "green",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="arrowdown" size={24} color={"white"} />
            </Pressable>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Pressable
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  backgroundColor: "green",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Entypo name="controller-play" size={24} color="white" />
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LikedSongsScreen;
