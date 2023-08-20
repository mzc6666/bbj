/*
 * @Description: 首页页面导航
 * @Version:
 * @Autor: Ban
 * @Date: 2022-07-05 19:42:27
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-15 22:43:17
 * @LastEditors: makka-pakka
 * @LastEditTime: 2022-07-29 14:36:41
 */

import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { initStackNavigation } from '../navigation';
import { Text, StyleSheet, View, Pressable } from 'react-native';

import {
  HOME_SCREEN,
  HOME_SCREEN_RECORD_BABY_EVENT,
  HOME_SCREEN_ADD_GROWTH_RECORD,
  HOME_SCREEN_FAMILY,
  HOME_SCREEN_GROUTH_CURVE,
  HOME_SCREEN_VACCINATION,
  HOME_SCREEN_VACCINATION_DETAILS,
  HOME_SCREEN_FAMILY_INVITE,
  HOME_SCREEN_ALBUM,
  HOME_SCREEN_GROWTH_DIARY,
  HOME_SCREEN_ADD_BABY,
} from '../navigationNames';

import HomeRecordBabyEvents from '@/screens/Home/HomeRecordBabyEvents/HomeRecordBabyEvents';
import HomeGrowthCurve from '@/screens/Home/HomeGrowthCurve/HomeGrowthCurve';
import HomeVaccination from '@/screens/Home/HomeVaccination/HomeVaccination';
import VaccinationDetails from '@/screens/Home/HomeVaccinationDetails/VaccinationDetails';
import AddGrowthRecord from '@/screens/Home/HomeAddGrowthRecord/AddGrowthRecord';
import { Button } from '@rneui/base';
import HomeFamily from '@/screens/Home/HomeFamily/HomeFamily';
import HomeFamilyInvite from '@/screens/Home/HomeFamily/HomeFamilyInvite/HomeFamilyInvite';
import HomeAlbum from '@/screens/Home/HomeAlbum/HomeAlbum';
import HomeGrowthDiary from '@/screens/Home/HomeGrowthDiary/HomeGrowthDiary';
import HomeAddBaby from '@/screens/Home/HomeAddBaby/HomeAddBaby';

/**
 * @description: 首页相关导航
 * @param {Stack} Stack 堆栈导航器实例
 * @return {*}
 * @author: Ban
 */

function HomeScreenNavigation(Stack: any) {
  return (
    <>
      {initStackNavigation(Stack, HOME_SCREEN_GROUTH_CURVE, HomeGrowthCurve)}
      {initStackNavigation(
        Stack,
        HOME_SCREEN_RECORD_BABY_EVENT,
        HomeRecordBabyEvents,
      )}
      {initStackNavigation(Stack, HOME_SCREEN_FAMILY, HomeFamily)}
      {initStackNavigation(Stack, HOME_SCREEN_FAMILY_INVITE, HomeFamilyInvite)}
      {initStackNavigation(Stack, HOME_SCREEN_VACCINATION, HomeVaccination)}
      {initStackNavigation(
        Stack,
        HOME_SCREEN_VACCINATION_DETAILS,
        VaccinationDetails,
      )}
      {initStackNavigation(
        Stack,
        HOME_SCREEN_ADD_GROWTH_RECORD,
        AddGrowthRecord,
      )}
      {initStackNavigation(Stack, HOME_SCREEN_ALBUM, HomeAlbum)}
      {initStackNavigation(Stack, HOME_SCREEN_GROWTH_DIARY, HomeGrowthDiary)}
      {initStackNavigation(Stack, HOME_SCREEN_ADD_BABY, HomeAddBaby)}
    </>
  );
}

export { HomeScreenNavigation };
