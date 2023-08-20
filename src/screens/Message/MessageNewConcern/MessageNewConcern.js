/*
 * @Description:新增-关注页面
 * @Version:
 * @Autor: makka-pakka
 * @Date: 2022-07-22 21:31:41
 * @LastEditors: Ban
 * @LastEditTime: 2023-04-14 21:03:34
 */
/**
 * @description:
 * @param {function} close 关闭回调
 * @return {*}
 * @author: makka-pakka
 */
import React, { useState, useEffect, useRef } from 'react';
import { FlatList, Animated, StyleSheet } from 'react-native';
import MessageNewConcernContent from './components/MessageNewConcernContent';
import { concernUser } from '@/network/api/message';
import TitleHeader from '@/components/TitleHeader';
import { useNavigationAnimate, useAsyncState } from '@/utils/hooks';

const MessageNewConcern = ({ close }) => {
  const offset = useNavigationAnimate(() => {
    close();
  }); // 模态化组件

  const [dataArr, setDataArr] = useState([]);
  useEffect(() => {
    concernUser().then(res => {
      let arr = [...dataArr];
      res.data.forEach(data => {
        arr.push({ ...data });
      });
      setDataArr(arr);
    });
  }); //新增关注用户

  const flatref = useRef(); //ref对象

  const renderItem = ({ item }) => {
    return (
      <MessageNewConcernContent
        name={item.name}
        isAttention={item.isAttention}
        time={item.time}
        avatar={item.avatar}
      />
    );
  }; //渲染组件
  /**
   * @description:  关闭
   * @return {*}
   * @author: makka-pakka
   */
  const rightClose = () => {
    close();
  };

  return (
    <Animated.View style={styles.container}>
      <TitleHeader
        title="新增关注"
        headerLeftPress={() => {
          rightClose();
        }}
      />
      <FlatList
        ref={flatref}
        data={dataArr}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </Animated.View>
  );
};
export default MessageNewConcern;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
});
