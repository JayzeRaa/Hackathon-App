 import React, { Fragment } from 'react';
 import * as Native from 'react-native';
 import Modal from "react-native-modal";
 import tw from 'tailwind-react-native-classnames';
 import { Display } from '../..';
import { color } from '../../utils/colors';
 
 export type Props = {
   onOk?: Function,
   titleText: string,
   footerText: string,
   isVisible: boolean,
   onCancel?: () => void,
   onPressFooter?: Function,
   isFooterLoading?: boolean;
   onBackdropPress?: Function;
   keyboardVerticalOffset: number | 0,
   isKeyboardAvoidingView?: boolean;
   Footer: React.ReactNode | undefined,
   BodyComponent: React.ReactNode | undefined,
   TitleComponent: React.ReactNode | undefined,
   bodyContainerStyle: Native.StyleProp<Native.ViewStyle> | undefined,
   modalContainerStyle: Native.StyleProp<Native.ViewStyle> | undefined,
 };
 
 const Index: React.FC<Props> = ({
   Footer,
   onCancel,
   titleText,
   isVisible,
   footerText,
   onPressFooter,
   BodyComponent,
   TitleComponent,
   isFooterLoading,
   onBackdropPress,
   bodyContainerStyle,
   modalContainerStyle,
   keyboardVerticalOffset,
   isKeyboardAvoidingView
 }) => {
 
   const DefaultFooter = () => {
     return (
       <Native.TouchableOpacity
         onPress={onPressFooter}
         style={tw.style(`mx-4 mb-3 rounded flex-row justify-center`, {
           backgroundColor: color.primary,
         })}
       >
         {isFooterLoading && <Native.ActivityIndicator color="#fff" />}
         <Native.Text
           style={tw`text-center font-bold opacity-70 text-base py-2`}
         >{footerText}</Native.Text>
       </Native.TouchableOpacity>
     )
   };
 
   const DefaultTitle = () => {
     return (
       <Native.View style={tw.style(`p-4`, styles.border)}>
         <Native.Text style={tw.style(`text-center text-black`)}>{titleText}</Native.Text>
       </Native.View>
     )
   }
 
   if (!isVisible) {
     return <Fragment />
   }
 
   return (
     <Modal
       isVisible={isVisible}
       style={[styles.modalContainerStyle, modalContainerStyle]}
       onBackButtonPress={onCancel}
       onBackdropPress={() => onBackdropPress !== undefined ? onBackdropPress() : onCancel()}
       // onBackdropPress={onCancel}
       propagateSwipe
     >
 
       {isKeyboardAvoidingView ? (
         <Native.KeyboardAvoidingView
           behavior={"position"}
           keyboardVerticalOffset={Native.Platform.OS === "ios" && keyboardVerticalOffset}
         >
           <Native.View style={[styles.bodyContainerStyle, bodyContainerStyle]}>
             {/* <Native.KeyboardAvoidingView behavior="position"> */}
             {/* title */}
             {titleText && <DefaultTitle />}
             {TitleComponent && <Native.View style={tw.style(`p-4`, styles.border)} children={TitleComponent} />}
 
             {/* body */}
             <Native.ScrollView style={tw``} children={BodyComponent} />
 
             {/* footer */}
             {footerText && <DefaultFooter />}
             {Footer && <Native.View style={styles.footer} children={Footer} />}
             {/* </Native.KeyboardAvoidingView> */}
           </Native.View>
         </Native.KeyboardAvoidingView>
       ) : (
         <Native.View style={[styles.bodyContainerStyle, bodyContainerStyle]}>
           {/* <Native.KeyboardAvoidingView behavior="position"> */}
           {/* title */}
           {titleText && <DefaultTitle />}
           {TitleComponent && <Native.View style={tw.style(`p-4`, styles.border)} children={TitleComponent} />}
 
           {/* body */}
           <Native.ScrollView style={tw``} children={BodyComponent} />
 
           {/* footer */}
           {footerText && <DefaultFooter />}
           {Footer && <Native.View style={styles.footer} children={Footer} />}
           {/* </Native.KeyboardAvoidingView> */}
         </Native.View>
       )}
 
     </Modal>
   );
 };
 
 const styles = Native.StyleSheet.create({
   modalContainerStyle: {
    height: "100%",
     width: "100%",
     margin: 0,
     position: "absolute",
     bottom: 0,
     justifyContent: "flex-end",
     alignContent: "flex-end",
   },
 
   bodyContainerStyle: {
     borderTopLeftRadius: 16,
     borderTopRightRadius: 16,
     backgroundColor: "#fff",
   },
 
   border: {
     borderBottomWidth: 1,
     borderBottomColor: '#f4f4f4'
   },
 
   footer: {
     borderTopWidth: 1,
     borderTopColor: '#f4f4f4',
     marginBottom: Native.Platform.OS === "ios" ? 16 : 0,
     paddingTop: 8
   }
 })
 
 
 export default Index;