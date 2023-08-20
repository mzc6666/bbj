import React from 'react';
import { View, Text, StyleSheet, RefreshControl } from 'react-native';

interface Props {
  refreshing: boolean;
  setRefreshing: () => {};
  onRefresh: () => {};
}

/**
 * @description:这一组件可以用在 ScrollView 或 FlatList 内部，为其添加下拉刷新的功能。当 ScrollView 处于竖直方向的起点位置（scrollY: 0），此时下拉会触发一个onRefresh事件。
 * @param {Props} props
 * @return {*}
 * @author: Ban
 */

const Refresh = ({ refreshing, setRefreshing, onRefresh }: Props) => {
  return (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

const styles = StyleSheet.create({});

export default Refresh;
