import React from "react";
import { StyleSheet, View, TouchableOpacity, Text, StatusBar, Animated } from "react-native";

// declare const global: {HermesInternal: null | {}};

const App = () => {
  const [valNum, setValNum] = React.useState(1);
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  const onPress = () => {
    Animated.timing(animatedValue, {
      toValue: valNum,
      duration: 1000,
      useNativeDriver: false
    }).start(() => {
      setValNum(valNum === 1 ? 0 : 1);
    });

  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Circle onPress={onPress} animatedValue={animatedValue} />
    </View>
  );
};

const Circle: React.FC<{ onPress: () => void, animatedValue: object }> = ({ onPress, animatedValue }) => {

  const bgAnim = animatedValue.interpolate({
    inputRange: [0, 0.001, 0.5, 0.501, 1],
    outputRange: ["gold", "gold", "gold", "#222", "#222"]
  });

  const bgAnimCircle = animatedValue.interpolate({
    inputRange: [0, 0.001, 0.5, 0.501, 1],
    outputRange: ["#222", "#222", "#222", "gold", "gold"]
  });

  return (
    <Animated.View style={[
      StyleSheet.absoluteFillObject,
      styles.circleContainer,
      {
        backgroundColor: bgAnim
      }
    ]}>
      <Animated.View style={[styles.circle, {
        backgroundColor: bgAnimCircle,
        transform: [
          {
            perspective: 400
          },
          {
            rotateY: animatedValue.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: ["0deg", "-90deg", "-180deg"]
            })
          },
          {
            scale: animatedValue.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [1, 8, 1]
            })
          },
          {
            translateX: animatedValue.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: ["0%", "50%", "0%"]
            })
          }
        ]
      }]}>
        <TouchableOpacity onPress={onPress}>
          <Animated.View style={[styles.circle, {
            backgroundColor: bgAnimCircle
          }]}>
            <Text style={{ color: "#fff", fontSize: 28 }}>></Text>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start"
  },

  circleContainer: {
    backgroundColor: "gold",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 8,
    paddingBottom: 100
  },

  circle: {
    width: 80,
    height: 80,
    borderRadius: 100,
    backgroundColor: "#444",
    justifyContent: "center",
    alignItems: "center",
    // shadowColor: "#92BDFF",
    // shadowOpacity: 0.5,
    // shadowOffset: {
    //   width: 0,
    //   height: 0
    // },
    // shadowRadius: 16
  }
});

export default App;
