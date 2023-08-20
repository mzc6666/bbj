/*
 * @description:
 * @Version:
 * @Autor: Xu
 * @Date: 2022-10-02 14:12:31
 * @LastEditors: Xu
 * @LastEditTime: 2022-10-02 15:33:20
 */
import React from 'react';
import { defaultComponentHOC } from '@/utils/hoc';
import TitleHeader from '@/components/TitleHeader';

/**
 * @description: 收到的赞
 * @return {*}
 * @author: Xu
 */

const MessageReceivedPraise = ({ navigation }) => {
  return (
    <>
      <TitleHeader
        title="收到的赞"
        navigation={navigation}
        headerLeftPress={() => {
          navigation.goBack();
        }}
        headerRight={() => <></>}
      />
    </>
  );
};

export default defaultComponentHOC(MessageReceivedPraise);
