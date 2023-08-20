/*
 * @Description: 我的-文章管理
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-16 14:57:54
 * @LastEditors: mzc
 * @LastEditTime: 2022-08-16 17:04:08
 */
import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MeArticleManageMyArticles from './components/MeArticleManageMyArticles/MeArticleManageMyArticles';
import MeArticleManageMyLikes from './components/MeArticleManageMyLikes/MeArticleManageMyLikes';

const Tab = createMaterialTopTabNavigator();

const MeArticleManage = ({ navigation, route }) => {
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name="aaa"
          options={{
            title: ' 我的',
          }}
          component={MeArticleManageMyArticles}
        />
        <Tab.Screen
          name="bbb"
          options={{
            title: '喜欢',
          }}
          component={MeArticleManageMyLikes}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({});

export default MeArticleManage;
