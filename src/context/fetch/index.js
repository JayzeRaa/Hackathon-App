import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native"

export function request({ url, method, body, isfiles, accesstoken }) {
  let Authorization = "Bearer " + accesstoken;

    if (isfiles) {
      return fetch(url, {
        method: "POST",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: Authorization,
        }),
        body,
      })
        .then((res) => ({ ...res, success: res.ok || res.success }))
        .catch((err) => {
          return {
            success: false,
            message: `Хүсэлт илгээхэд алдаа гарлаа`,
            body: body,
            method: method,
          };
        });
    }

    return fetch(url, {
      method,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json, text/plain, */*",
        "Access-Control-Allow-Headers": "*",
        Authorization: Authorization,
        "user-agent": JSON.stringify({ ...Platform, isMobileApp: true }),
      },
      credentials: "include",
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.status === 401) {

          return {
            ...res,
            success: true,
            response: [],
          };
        }

        return res.json();
      })
      .catch((err) => {
        return {
          success: false,
          message: `Хүсэлт илгээхэд алдаа гарлаа`,
        };
      });
};

async function refreshToken() {
  // const navigation = useNavigation();

  AsyncStorage.getItem("access_token").then((access_token) => {
    if (access_token) {
      return AsyncStorage.getItem("refreshtoken").then((refreshtoken) => {
        request({
          url: `login/refreshtoken`,
          model: "refreshtoken",
          method: "POST",
          body: {
            token: access_token,
            refreshtoken: refreshtoken,
          },
        }).then((res) => {
          if (res && res.success) {
            AsyncStorage.setItem("refreshtoken", res.data.refreshToken);
            AsyncStorage.setItem("access_token", res.data.token);
          }
        });
      });
    }
    return navigation.navigate("Login");
  });
};

function fetchRequest({
  url,
  body,
  clear,
  model,
  props,
  isaggr,
  ismore,
  method,
  isfiles,
  iserrclear,
  accesstoken,
  dispatchEvent,
  ismoreelastic,
}) {
  try {
    dispatchEvent({ type: model.request, clear });
    return request({ url, method, body, props, isfiles, accesstoken }).then(
      (res) => {
        res.success &&
          dispatchEvent({
            clear,
            ismore,
            isaggr,
            ismoreelastic,
            response: res,
            type: model.response,
            iserrclear: iserrclear,
          });
        !res.success &&
          dispatchEvent({ type: model.error, response: res, iserrclear });
        !res.success && console.log(url, method, body, res);

        return res;
      }
    );
  } catch (error) {
    return error;
  }
};

export { fetchRequest };
