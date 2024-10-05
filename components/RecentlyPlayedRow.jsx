import React, { useMemo } from "react";
import { FlatList, Pressable, Text, Image, View } from "react-native";
import { useGetRecentlyPlayedSongs } from "../hooks/useGetRecentlyPlayedSongs";

export const RecentlyPlayedRow = () => {
  const getRecentlyPlayed = useGetRecentlyPlayedSongs();
  const slicedRecentlyPlayedData = getRecentlyPlayed.slice(0, 8);
  console.log(getRecentlyPlayed);

  const renderRecentlyPlayed = ({ item }) => {
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
          source={{ uri: item?.track?.album?.images[0].url }}
          style={{ height: 150, width: 150, borderRadius: 10 }}
        />
        <View style={{ width: 150 }}>
          <Text
            style={{
              fontSize: 16,
              color: "white",
              fontWeight: "bold",
            }}
            numberOfLines={2}
          >
            {item?.track?.name}
          </Text>
        </View>
      </Pressable>
    );
  };
  return (
    <FlatList
      data={slicedRecentlyPlayedData}
      renderItem={renderRecentlyPlayed}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      numColumns={1}
    />
  );
};
