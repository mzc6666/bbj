/*
 * @description:
 * @Version:
 * @Autor: Xu
 * @Date: 2022-10-02 14:13:45
 * @LastEditors: Xu
 * @LastEditTime: 2022-10-02 15:45:31
 */
import TitleHeader from '@/components/TitleHeader';
import { defaultComponentHOC } from '@/utils/hoc';
import React from 'react';

/**
 * @description: 评论和@
 * @return {*}
 * @author: Xu
 */

const MessageCommentsAndEit = ({ navigation }) => {
  return (
    <>
      <TitleHeader
        title="收到的评论和@"
        navigation={navigation}
        headerLeftPress={() => {
          navigation.goBack();
        }}
        headerRight={() => <></>}
      />
    </>
  );
};

export default defaultComponentHOC(MessageCommentsAndEit);
