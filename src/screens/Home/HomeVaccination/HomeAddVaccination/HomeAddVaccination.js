/*
 * @Description: 添加疫苗
 * @Version:
 * @Autor: Ban
 * @Date: 2022-08-07 15:04:18
 * @LastEditors: Ban
 * @LastEditTime: 2022-08-07 15:04:22
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { defaultScreenHOC } from '@/utils/hoc';

/**
 * @description:
 * @return {*}
 * @author: Ban
 */

const HomeAddVaccination = props => {
  return (
    <View>
      <Text>HomeAddVaccination</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

// export default HomeAddVaccination;
export default defaultScreenHOC(HomeAddVaccination);
