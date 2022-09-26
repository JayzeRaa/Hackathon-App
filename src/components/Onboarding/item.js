import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  useWindowDimensions,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

export default Onboarding = ({item, nextSlide, slides, currentIndex, props}) => {
  const {width} = useWindowDimensions();
  return (
    <View
      style={[
        styles.container,
        {width, height: Dimensions.get('screen').height},
      ]}>
      <Image
        source={item.image}
        style={[
          styles.image,
          {width: width, height: 500, resizeMode: 'contain'},
        ]}
      />
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>

        <TouchableOpacity
          onPress={() => {
            if (currentIndex + 1 === slides.length) {
              props.props.navigation.navigate('Home');
            } else {
              nextSlide();
            }
          }}
          style={{
            alignItems: 'center',
            backgroundColor: '#493d8a',
            padding: 15,
            borderRadius: 10,
            marginTop: 20,
          }}>
          <Text style={{color: 'white'}}>
            {currentIndex + 1 === slides.length ? 'Дуусгах' : 'Дараах'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 50,
  },
  image: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  title: {
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 10,
    color: '#493d8a',
    textAlign: 'center',
  },
  description: {
    fontWeight: '300',
    color: '#62656b',
    fontSize: 15,
    textAlign: 'center',
  },
});
