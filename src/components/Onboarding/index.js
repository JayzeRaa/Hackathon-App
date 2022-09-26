import React, { useRef, useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Animated, NativeAppEventEmitter, TouchableOpacity} from 'react-native';

import slides from './slides';
import Item from './item';

export default Onboarding = (props) => {
  var Sound = require('react-native-sound');
  const requireDindin = require('../../assets/dindin.mp3');

  useEffect(() => {
    console.log("haha")
    onSound();
  }, []);

  const onSound = async () => {
    console.log("hahazxc")
      let mySound = new Sound(requireDindin, error => {
        console.log("zxczxc")
        if (error) {
          console.log("err", error);
        } else {
          console.log("play")
          mySound.play();
        }
      });
    };
  const slidesRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const nextSlide = () => {
    // onSound();
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({index: currentIndex + 1});
    } else {
      // storeData({value: true, key: 'isOnboard'});
      // navigation.navigate('HomeNotLogged');
    }
  };

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View style={StyleSheet.container}>
      {/* <Text>ASD</Text> */}
      <FlatList
        data={slides}
        renderItem={({item}) => <Item item={item} nextSlide={nextSlide} props={props} currentIndex={currentIndex} slides={slides} />}
        horizontal
        showsHorizontalScrollIndicator
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX }}}], {
          useNativeDriver: false
        })}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
        indicatorStyle={{ display: "none"}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
