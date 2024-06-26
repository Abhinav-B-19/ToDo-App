import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Image, TouchableOpacity } from "react-native";

const ActionBarImage = () => {
  const navigation = useNavigation();

  const handleImagePress = () => {
    console.log("Image tapped");
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={handleImagePress}>
        <Image
          source={{
            uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/logosmalltransparen.png",
          }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 40 / 2,
            marginLeft: 15,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ActionBarImage;
