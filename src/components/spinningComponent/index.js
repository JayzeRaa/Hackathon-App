import React, {memo} from 'react';
import * as Native from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {spin} from '../../utils/spinninganimation';

const Index = props => {
  console.log('props: ', props);

  return (
    <Native.View style={tw`flex-row absolute`}>
      <Native.Animated.View
        style={{
          transform: [{rotate: spin({duration: 20})}],
          width: Native.Dimensions.get('window').width * 0.95,
        }}>
        <Native.TouchableOpacity
          style={{
            backgroundColor: '#7cccf4',
            padding: 8,
            borderRadius: 30,
            width: 50,
            height: 50,
            marginRight: 30,
            borderWidth: 1,
            borderColor: "#f3f3f3"
          }}
          onPress={() => props?.onClickBluetooth()}>
          <Icon name="bluetooth-searching" size={35} color="#fff" />
        </Native.TouchableOpacity>
      </Native.Animated.View>

      <Native.Animated.View
        style={{
          transform: [{rotate: spin({duration: 10})}],
          position: 'absolute',
          marginHorizontal: 85,
          width: Native.Dimensions.get('screen').width * 0.53,
          // backgroundColor: "blue"
        }}>
        <Native.TouchableOpacity
          style={{
            backgroundColor: '#a3d598',
            padding: 8,
            borderRadius: 30,
            width: 50,
            height: 50,
            borderWidth: 1,
            borderColor: "#f3f3f3",
          }}
          onPress={() => props.onClick()}>
          <Icon name="qr-code-scanner" size={33} color="#fff" />
        </Native.TouchableOpacity>
      </Native.Animated.View>

      <Native.Animated.View
        style={{
          transform: [{rotate: spin({duration: 15})}],
          position: 'absolute',
          marginHorizontal: 50,
          width: Native.Dimensions.get('screen').width * 0.75,
          // backgroundColor: "red"
        }}>
        <Native.TouchableOpacity
          style={{
            backgroundColor: '#eb8b8c',
            padding: 8,
            borderRadius: 30,
            width: 50,
            height: 50,
            borderWidth: 1,
            borderColor: "#f3f3f3"
          }}
          onPress={() => props.onClickLocation()}>
          <Icon name="location-on" size={35} color="#fff" />
        </Native.TouchableOpacity>
      </Native.Animated.View>
    </Native.View>
  );
};

export default React.memo(Index, (prev, next) => true);
