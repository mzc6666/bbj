/*
 * @Description: 链接文章卡片组件
 * @Version:
 * @Autor: Austral
 * @Date: 2022-07-18 16:46:49
 * @LastEditors: Austral
 * @LastEditTime: 2022-08-02 16:58:20
 */
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React from 'react';
import colors from '@/assets/color';

/**
 * @description: 链接文章组件
 * @param {String} title文章标题
 * @param {Boolean} isSelect 是否选择
 * @param {String} img文章图片
 * @param {String} content文章内容
 * @param {Function} onPress
 * @return {*}
 * @author: Austral
 */
export default ArticleCard = ({
  title,
  isSelect,
  image,
  content,
  onPress = () => {},
}) => {
  return (
    <Pressable
      activeOpacity={1}
      style={styles.viewbox}
      onPress={onPress}>
      <View style={styles.left}>
        <Text
          style={
            isSelect
              ? { fontFamily: 'iconfont', color: '#fb7185' }
              : { fontFamily: 'iconfont' }
          }>
          {isSelect ? '\uec44' : '\ue72f'}
        </Text>
      </View>
      <Image
        style={styles.middle}
        source={{ uri: image }}
      />
      <View style={styles.right}>
        <Text
          style={styles.texttitle}
          numberOfLines={1}>
          {title}
        </Text>
        <Text
          style={styles.textcontain}
          numberOfLines={3}>
          {content}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  viewbox: {
    backgroundColor: '#fff',
    width: '100%',
    height: 100,
    flexDirection: 'row',
  },
  left: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middle: {
    flex: 1,
    borderRadius: 8,
    height: 80,
    marginTop: 14,
  },
  right: {
    flex: 1.7,
    backgroudColor: '#fff',
    flexDirection: 'column',
    marginTop: 14,
    marginLeft: 10,
  },
  texttitle: {
    color: '#000',
    fontSize: 14,
    fontWeight: '400',
  },
  textcontain: {
    color: colors.font[100],
    fontSize: 10,
    lineHeight: 18,
    fontWeight: '400',
  },
});
