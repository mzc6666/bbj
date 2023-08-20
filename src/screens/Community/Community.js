/*
 * @Description:社区页面
 * @Version:
 * @Autor: makka-pakka
 * @Date: 2022-08-09 14:36:22
 * @LastEditors: Xu
 * @LastEditTime: 2023-03-07 19:58:18
 */
import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '@/assets/color';
import { defaultComponentHOC, defaultScreenHOC } from '@/utils/hoc';
import CommunityGrowUp from './CommunityGrowUp/CommunityGrowUp';
import CommunityConcern from './CommunityConcern/CommunityConcern';
import CommunityRecommend from './CommunityRecommend/CommunityRecommend';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@/config/modules/global';
import IconPark from '@/components/IconPark';
import { Search } from '@icon-park/svg';
import TitleHeader from '@/components/TitleHeader';
import Button from '@/components/Button';
import { COMMUNITY_SCREEN_SEARCH } from '@/navigation/navigationNames';

const Community = ({ props, navigation }) => {
  const [index, setIndex] = useState(2);
  const Tab = createMaterialTopTabNavigator();

  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialLayout={(DEVICE_WIDTH, DEVICE_HEIGHT)}
        sceneContainerStyle={styles.container}
        initialRouteName="推荐"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#fff',
            height: (50 / 844) * DEVICE_HEIGHT,
          },
          tabBarItemStyle: {
            width: (75 / 390) * DEVICE_WIDTH,
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.auxiliary[100],
            width: (22 / 390) * DEVICE_WIDTH,
          },
          tabBarContentContainerStyle: {
            justifyContent: 'center',
          },
          tabBarIndicatorContainerStyle: {
            left: (109 / 390) * DEVICE_WIDTH,
          },
          swipeEnabled: false,
        }}>
        <Tab.Screen
          name="成长"
          listeners={{
            tabPress: index => {
              setIndex(1);
            },
            swipeEnd: index => {
              setIndex(1);
            },
          }}
          component={CommunityGrowUp}
          options={{
            tabBarPressColor: 'transparent',
            tabBarLabelStyle: index == 1 ? styles.activeTab : styles.defaultTab,
          }}
        />
        <Tab.Screen
          name="推荐"
          listeners={{
            tabPress: index => {
              setIndex(2);
            },
            swipeEnd: index => {
              setIndex(2);
            },
          }}
          component={CommunityRecommend}
          options={{
            tabBarPressColor: 'transparent',
            tabBarLabelStyle: index == 2 ? styles.activeTab : styles.defaultTab,
          }}
        />
        <Tab.Screen
          name="关注"
          listeners={{
            tabPress: index => {
              setIndex(3);
            },
            swipeEnd: index => {
              setIndex(3);
            },
          }}
          component={CommunityConcern}
          options={{
            tabBarPressColor: 'transparent',
            tabBarLabelStyle: index == 3 ? styles.activeTab : styles.defaultTab,
          }}
        />
      </Tab.Navigator>
      <TouchableOpacity
        style={styles.search}
        onPress={() => {
          // console.log('nihao');
          navigation.navigate(COMMUNITY_SCREEN_SEARCH);
        }}>
        <IconPark
          iconPark={Search({
            theme: 'outline',
            fill: [colors.font[200]],
          })}
          size={colors.fontSize[600]}
        />
        {/* style={styles.search} */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    backgroundColor: '#fff',
  },
  search: {
    position: 'absolute',
    left: (350 / 390) * DEVICE_WIDTH,
    marginTop: (18 / 844) * DEVICE_HEIGHT,
  },
  defaultTab: {
    color: colors.font[200],
    fontSize: colors.fontSize[400],
  },
  activeTab: {
    color: colors.font[300],
    fontSize: colors.fontSize[500],
  },
});

export default defaultComponentHOC(Community);
