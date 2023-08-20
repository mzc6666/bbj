/*
 * @Description: 消息页面导航
 * @Version:
 * @Autor: Ban
 * @Date: 2022-07-05 19:42:27
 * @LastEditors: Xu
 * @LastEditTime: 2022-10-02 15:41:55
 */

import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import {
  MESSAGE_SCREEN,
  MESSAGE_SCREEN_CHATTING_LIST,
  MESSAGE_SCREEN_COMMENTSANDEIT,
  MESSAGE_SCREEN_CONCERNS,
  MESSAGE_SCREEN_RECEIVEDPRAISE,
} from '../navigationNames';

import { HomeBottomNavigation } from '../bottom';
import { initStackNavigation } from '../navigation';
import Concern from '@/screens/Message/MessageNewConcern/MessageNewConcern';
import MessageNewConcern from '@/screens/Message/MessageNewConcern/MessageNewConcern';
import MessageReceivedPraise from '@/screens/Message/MessageReceivedPraise/MessageReceivedPraise';
import MessageCommentsAndEit from '@/screens/Message/MessageCommentsAndEit/MessageCommentsAndEit';
import MessageChattingDetail from '@/screens/Message/MessageChattingDetail/MessageChattingDetail';

/**
 * @description: 消息页面相关导航
 * @param {Stack} Stack 堆栈导航器实例
 * @return {*}
 * @author: Ban
 */

const MessageScreenNavigation = (Stack: any) => {
  return (
    <>
      {initStackNavigation(Stack, MESSAGE_SCREEN_CONCERNS, MessageNewConcern)}
      {initStackNavigation(
        Stack,
        MESSAGE_SCREEN_RECEIVEDPRAISE,
        MessageReceivedPraise,
      )}
      {initStackNavigation(
        Stack,
        MESSAGE_SCREEN_COMMENTSANDEIT,
        MessageCommentsAndEit,
      )}
      {initStackNavigation(
        Stack,
        MESSAGE_SCREEN_CHATTING_LIST,
        MessageChattingDetail,
      )}
    </>
  );
};

export { MessageScreenNavigation };
