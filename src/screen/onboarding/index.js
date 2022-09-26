import React, {Fragment, useEffect, useState, useContext} from 'react';
import * as Native from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Onboarding from '../../components/Onboarding';

const Index = props => {

  return (
    <Native.View style={tw.style(`bg-white`, {flex: 1})}>
      <Onboarding props={props}/>
    </Native.View>
  );
};

export default Index;
