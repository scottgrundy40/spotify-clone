import {
  Text,
  ScrollView,
  View,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useGetUserProfile } from "../hooks/useGetUserProfile";
import { useGetRecentlyPlayedSongs } from "../hooks/useGetRecentlyPlayedSongs";
import { TopArtistRow } from "../components/TopArtistRow";
import { RecentlyPlayedRow } from "../components/RecentlyPlayedRow";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const getRecentlyPlayedSongs = useGetRecentlyPlayedSongs();
  const slicedRecentlyPlayedData = getRecentlyPlayedSongs.slice(0, 4);
  const getUserProfile = useGetUserProfile();
  const navigation = useNavigation();

  const greetingMessage = () => {
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
      return "Good Morning, Scott";
    } else if (currentTime < 18) {
      return "Good Afternoon, Scott";
    } else {
      return "Good Evening, Scott";
    }
  };

  const welcomeMessage = greetingMessage();

  const renderItem = ({ item }) => {
    return (
      <Pressable
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 10,
          marginVertical: 8,
          backgroundColor: "#282828",
          borderRadius: 4,
          elevation: 3,
        }}
      >
        <Image
          style={{ width: 55, height: 55 }}
          source={{ uri: item.track.album.images[0].url }}
        />
        <View
          style={{ flex: 1, marginHorizontal: 8, justifyContent: "center" }}
        >
          <Text
            style={{ fontWeight: "bold", fontSize: 13, color: "white" }}
            numberOfLines={2}
          >
            {item.track?.name}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <ScrollView style={{ marginTop: 50 }}>
        {/* Header */}
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                resizeMode: "cover",
              }}
              source={{ uri: getUserProfile?.images?.[0].url }}
            />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
              }}
            >
              {welcomeMessage}
            </Text>
          </View>
          <MaterialCommunityIcons
            name="lightning-bolt-outline"
            size={24}
            color="white"
          />
        </View>
        {/* Buttons */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "left",
            justifyContent: "left",
            marginHorizontal: 10,
            marginTop: 10,
            gap: 15,
          }}
        >
          <Pressable
            style={{
              backgroundColor: "#282828",
              padding: 10,
              borderRadius: 30,
            }}
          >
            <Text style={{ color: "white" }}>Music</Text>
          </Pressable>
          <Pressable
            style={{
              backgroundColor: "#282828",
              padding: 10,
              borderRadius: 30,
            }}
          >
            <Text style={{ color: "white" }}>Podcasts</Text>
          </Pressable>
          <Pressable
            style={{
              backgroundColor: "#282828",
              padding: 10,
              borderRadius: 30,
            }}
          >
            <Text style={{ color: "white" }}>Shows</Text>
          </Pressable>
        </View>
        {/* Album block */}
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Pressable
            style={{
              marginBottom: 10,
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginHorizontal: 10,
              marginVertical: 8,
              backgroundColor: "#202020",
              borderRadius: 4,
              elevation: 3,
            }}
          >
            <LinearGradient colors={["#33006f", "#FFFFFF"]}>
              <Pressable
                style={{
                  width: 55,
                  height: 55,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => navigation.navigate("Liked")}
              >
                <AntDesign name="heart" size={24} color="white" />
              </Pressable>
            </LinearGradient>
            <Text style={{ color: "white", fontSize: 13, fontWeight: "bold" }}>
              Liked Songs
            </Text>
          </Pressable>

          <View style={{ height: 10 }} />
          <View
            style={{
              marginBottom: 10,
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginHorizontal: 10,
              marginVertical: 8,
              backgroundColor: "#202020",
              borderRadius: 4,
              elevation: 3,
            }}
          >
            <Image
              style={{ width: 55, height: 55 }}
              source={{
                uri: "https://d1rgjmn2wmqeif.cloudfront.net/r/456471-4.png",
              }}
            />
            <View>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 13 }}
              >
                Oasis
              </Text>
            </View>
          </View>
        </View>
        {/* Recently played songs */}
        <FlatList
          data={slicedRecentlyPlayedData}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
        {/* Top artists */}
        <View style={{ marginTop: 20, gap: 25 }}>
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 20,
              marginLeft: 10,
            }}
          >
            Your Top Artists
          </Text>
          <TopArtistRow />
        </View>
        {/* Recently Played */}
        <View style={{ marginTop: 25, gap: 25 }}>
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 20,
              marginLeft: 10,
            }}
          >
            Recently Played
          </Text>
          <RecentlyPlayedRow />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default HomeScreen;
