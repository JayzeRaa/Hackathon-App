import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

const Index = ({
  height,
  scrollHeight,
  customRef,
  setIsFocused,
  title,
  values,
  onSelect,
  isAction,
  selected,
  isButton,
  renderModal,
  onclose,
  isregno,
  dname,
  code
}) => {
  useEffect(() => {
    /* if (scrollRef.current) {
      if (selectedValue.index && isFocused) {
        scrollRef.current.scrollTo({
          y: 40 * selectedValue.index,
          animated: true,
        });
      } else {
        scrollRef.current.scrollTo({y: 0, animated: true});
      }
    } */
  }, []);

  return (
    <RBSheet
      ref={customRef}
      closeOnDragDown={true}
      closeOnPressMask={true}
      onClose={() => { onclose && onclose(); setIsFocused && setIsFocused(false) }}
      onOpen={() => setIsFocused && setIsFocused(true)}
      height={height ? height : 450}
      animationType="fade"
      customStyles={BOTTOM_MODAL_STYLE}>
      <View style={{padding: 20, flex: 1, justifyContent: 'space-between'}}>
          {renderModal()}
      </View>
    </RBSheet>
  );
};

const BOTTOM_MODAL_STYLE = {
  wrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  draggableIcon: {
    backgroundColor: 'rgba(136, 138, 153, 0.3)',
    width: 60,
  },
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
};

const style = StyleSheet.create({
  modalTitle: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 15,
  },
});

export default Index;
