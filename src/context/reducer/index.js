import React from 'react';

export default function appReducer(state, action) {
  const type = action.type.split('_')[0];
  const model = action.type.split('_')[1];
  switch (type) {
    case 'request': {
      state[`is${model}`] = true;
      // state[`res${model}`] = [];
      return {...state};
    }

    case 'error': {
      state[action.type] = action.error;
      state[`err_${model}`] = false;
      return {...state};
    }

    case 'response': {
      // if (model === 'category' && action.response.data) {
      //   action.response.data.map(item => {
      //     let res = CATEGORYS.find(x => x.id === item.enum);
      //     if (res) {
      //       item.icon = res.icon;
      //       item.name = res.name;
      //       item.desc = res.desc;
      //     }
      //   });
      // }
      state[`res${model}`] = action.response.value;
      state[`is${model}`] = false;
      return {...state};
    }
    case 'login': {
      return {
        ...state,
        islogin: action.response ? true : false,
        _auth: action.response,
      };
    }
    case 'update': {
      return {
        ...state,
        update: action.response,
      };
    }
    case 'phoneno': {
      return {
        ...state,
        phoneno: action.response,
      };
    }
    case 'username': {
      return {
        ...state,
        username: action.response,
      };
    }
    default:
      return state;
  }
}
