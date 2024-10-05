import React from "react";
import { FlatList, Pressable, Text, Image, View } from "react-native";
import { useGetTopArtist } from "../hooks/useGetTopArtist";

export const TopArtistRow = () => {
  const getTopArist = useGetTopArtist();
  const renderTopArtist = ({ item }) => {
    return (
      <Pressable
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
          marginHorizontal: 10,
          gap: 10,
        }}
      >
        <Image
          source={{ uri: item.images[0].url }}
          style={{ height: 150, width: 150, borderRadius: 10 }}
        />
        <View style={{ gap: 8 }}>
          <Text
            style={{
              fontSize: 16,
              color: "white",
              fontWeight: "bold",
            }}
          >
            {item.name}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={getTopArist}
      renderItem={renderTopArtist}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      numColumns={1}
    />
  );
};
