import { Animated, Easing } from 'react-native';

export const spinReserve = ({duration = 15}) => {
  const spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: duration * 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start(() => {
    spinValue.setValue(0);
  });
  return spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '0deg'],
  });
};