/*
 * @Description: hooks
 * @Version:
 * @Autor: Ban
 * @Date: 2022-08-01 18:54:03
 * @LastEditors: Ban
 * @LastEditTime: 2023-04-14 21:06:05
 */
import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useContext,
} from 'react';
import { Animated, Easing, BackHandler, ToastAndroid } from 'react-native';
import { DEVICE_WIDTH } from '@/config/modules/global';
import { ToastContext } from './context';
import { SOCKET_EVENT_TYPE, Socket, instance } from '@/network/socket';

/**
 * @description: 设置模块化组件HOOK
 * @param {function} goBack 后退操作事件
 * @return {*}
 * @author: Ban
 */
export const useNavigationAnimate = (goBack: any) => {
  const offsetAnim = useRef(new Animated.Value(DEVICE_WIDTH)).current; // 组件从右至左插入动画偏移值

  const offsetIn = () => {
    Animated.timing(offsetAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  };

  useEffect(() => {
    offsetIn();
  });

  // 为系统的后退操作注册事件侦听器
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        goBack?.();
        return true;
      },
    );
    return () => {
      backHandler.remove();
    };
  });

  return offsetAnim;
};

/**
 * @description: 同步更新stateHOOK
 * @param {any} initialValue 初始值
 * @return {array} [state, setAsyncState]
 * @author: Ban
 */
export const useAsyncState = (initialValue?: any) => {
  const unmountedRef = useRef(false); // 组件是否被卸载
  useEffect(() => {
    return () => {
      unmountedRef.current = true;
    };
  }, []);
  const [state, setState] = useState(initialValue);
  // const setAsyncState = useCallback(value => {
  //   if (!unmountedRef.current) setState(value);
  // }, []);
  const setAsyncState = (value: any) => {
    if (!unmountedRef.current) setState(value);
  };
  return [state, setAsyncState];
};

/**
 * @description: Toast HOOK
 * @param {*} value
 * @return {*}
 * @author: Ban
 */
export const useToast = (
  message = 'toast',
  duration = ToastAndroid.SHORT,
  gravity = ToastAndroid.BOTTOM,
  xOffset = 0,
  yOffset = 0,
) => {
  // const toastStatus = useState(false);
  // const toastContext = useContext(ToastContext);

  return ToastAndroid.showWithGravityAndOffset(
    message,
    duration,
    gravity,
    xOffset,
    yOffset,
  );
};

/**
 * @description: useInitToast
 * @return {*}
 * @author: Ban
 */
export const useInitToast = () => {
  const [toastData, setToastData] = useState({});

  const toastApi = {
    showToast: (value: any = { status: true }) => {
      let text = value.text || '提示';
      let position = value.position || 'bottom';
      setToastData({
        status: value.status,
        text,
        position,
      });
      console.log('showToast');
    },
  };
  return {
    toastData,
    toastApi,
  };
};

/**
 * @description: socket实例化
 * @return {*}
 * @author: mzc
 */
export const useSocketRegister = (
  id: number,
  username: string,
  cover: string,
) => {
  useEffect(() => {
    const ws = new Socket(id, username, cover);
    /** 测试使用(导购客服) */
    setTimeout(() => {
      const socket = new WebSocket(
        'ws://49.234.98.161:8000?id=0&username=mzc&cover=https://www.baidu.com',
      );
    }, 2000);
    return () => {
      ws.socket.close();
    };
  });
};

/**
 * @description: 注册socket监听事件
 * @param {Array<{ eventName: string; callback: Function }>} 事件配置
 * @return {*}
 * @author: mzc
 */
export const useSocketHook = (
  options: Array<{ eventName: string; callback: Function }>,
) => {
  useEffect(() => {
    options.forEach(({ eventName, callback }) => {
      instance?.addListener(eventName, callback);
    });
  });
};
