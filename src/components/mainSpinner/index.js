import React, {memo} from 'react';
import * as Native from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {spin} from '../../utils/spinninganimation';
import {Easing} from 'react-native-reanimated';
import {MotiView} from 'moti';
import { spinReserve } from '../../utils/spinningWorld';

const _color = '#f0b95f';
const _size = 100;

const Index = props => {
  return (
    <Native.View
      style={tw.style(``, {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      })}>
      <Native.Animated.Image
        style={{
          position: 'absolute',
          transform: [{rotate: spinReserve({duration: 20})}],
          width: Native.Dimensions.get('screen').width - 40,
          height: Native.Dimensions.get('screen').width,
          resizeMode: 'contain',
        }}
        source={require('../../assets/dots.png')}
      />
      <Native.View style={[styles.dot, styles.center]}>
        {[...Array(3).keys()].map(i => {
          return (
            <MotiView
              from={{opacity: 0.6, scale: 1}}
              animate={{opacity: 0, scale: 4}}
              transition={{
                type: 'timing',
                duration: 2500,
                easing: Easing.out(Easing.ease),
                delay: i * 950,
                repeatReserve: true,
                loop: true,
              }}
              key={i}
              style={[Native.StyleSheet.absoluteFillObject, styles.dot]}
            />
          );
        })}
        <Native.Image source={require('../../assets/logohackathon.png')} style={{ width: 85, height: 85 }}/>
      </Native.View>
    </Native.View>
  );
};

const styles = Native.StyleSheet.create({
  dot: {
    width: _size,
    height: _size,
    borderRadius: _size,
    backgroundColor: _color,
  },
  center: {alignItems: "center", justifyContent: "center"}
});

export default React.memo(Index, (prev, next) => true);
