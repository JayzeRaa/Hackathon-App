import React, {createContext, useReducer} from 'react';
import {useNavigation} from '@react-navigation/native';
// import {getData, removeData} from '../../utils/functions';
/* import * as Context from "../"; */
import appReducer from '../reducer';
import {fetchRequest} from '../fetch';
import Toast from 'react-native-toast-message';
import {removeData} from '../../utils/functions';

const initialState = {
  islogin: false,
  _auth: {},
  notification: false,
  update: null,
  phoneno: '',
  username: '',
  resorderdetail: {},
};

const models = {};

const service = `http://10.150.10.15:3000/`;
// const service = `${URL}/`;
export const GlobalContext = createContext(initialState);

export const GlobalProvider = props => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const addmodel = ({model}) => {
    models[model] = {
      request: `request_${model}`,
      response: `response_${model}`,
      error: `error_${model}`,
    };
  };
  const navigation = useNavigation();
  const request = async ({url, model, body, method = 'GET', isfile, type}) => {
    try {
      if (isfile && body) {
        let formData = new FormData();
        Object.keys(body).map(keyname => {
          if (!keyname.includes('prev'))
            formData.append(keyname, body[keyname]);

          return null;
        });
        body = formData;
      }

      if (model) {
        addmodel({model: model});
      }

      const res = await fetchRequest({
        url: `${service}${url}`,
        method,
        body,
        model: model ? models[model] : null,
        dispatchEvent: dispatch,
        isfile: isfile,
        type: type,
      });
      if (res.status === 401) {
        removeData({key: 'token'});
        removeData({key: 'auth'});
        setlogin(null);
        // navigation.navigate('Root', {screen: 'Home'});
      }
      if (model && !res.success) {
        Toast.show({
          type: 'error',
          text1: res.message,
          topOffset: 10,
        });
      }
      /* notification: notification, */
      return res;
    } catch (error) {
      console.log('%c 🍬 error: ', error);
    }
  };

  const setlogin = login => dispatch({type: 'login', response: login});
  const setUpdate = update => dispatch({type: 'update', response: update});
  const setPhoneno = phoneno => dispatch({type: 'phoneno', response: phoneno});
  const setUsername = username => dispatch({ type: 'username', response: username});

  return (
    <React.Fragment>
      <GlobalContext.Provider
        value={{
          ...state,
          request: request,
          setlogin: setlogin,
          setUpdate: setUpdate,
          setPhoneno: setPhoneno,
          setUsername: setUsername,
        }}>
        {props.children}
      </GlobalContext.Provider>
    </React.Fragment>
  );
};
