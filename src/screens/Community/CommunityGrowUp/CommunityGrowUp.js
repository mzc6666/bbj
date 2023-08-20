/*
 * @Description:社区-成长页面
 * @Version:
 * @Autor: makka-pakka
 * @Date: 2022-08-09 19:04:18
 * @LastEditors: Xu
 * @LastEditTime: 2023-03-22 11:22:35
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import colors from '@/assets/color';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@/config/modules/global';
import IconPark from '@/components/IconPark';
import { HotPot, BookOne, BookOpen, Message } from '@icon-park/svg';
import articles from '@/assets/articles.json';
import { COMMUNITY_SCREEN_ARTICLE_DETIALS } from '@/navigation/navigationNames';

const CommunityGrowUp = ({ navigation }) => {
  const [art, setart] = useState(articles);
  return (
    <>
      <View style={styles.sort}>
        <View style={styles.eat}>
          <IconPark
            iconPark={HotPot({
              theme: 'filled',
              fill: [colors.rose[400]],
            })}
            size={(35 / 390) * DEVICE_WIDTH}
          />
          <Text style={styles.font}>吃什么</Text>
        </View>
        <View style={styles.use}>
          <IconPark
            iconPark={BookOne({
              theme: 'filled',
              fill: colors.auxiliary[100],
            })}
            size={(35 / 390) * DEVICE_WIDTH}
          />
          <Text style={styles.font}>用什么</Text>
        </View>
        <View style={styles.encyclopedias}>
          <IconPark
            iconPark={BookOpen({
              theme: 'filled',
              fill: colors.auxiliary[300],
            })}
            size={(35 / 390) * DEVICE_WIDTH}
          />
          <Text style={styles.font}>百科</Text>
        </View>
        <View style={styles.questionAnswer}>
          <IconPark
            iconPark={Message({
              theme: 'filled',
              fill: colors.auxiliary[200],
            })}
            size={(35 / 390) * DEVICE_WIDTH}
          />
          <Text style={styles.font}>问答</Text>
        </View>
      </View>
      <ScrollView>
        {art.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                width: DEVICE_WIDTH,
                flex: 1,
                borderBottomColor: colors.gray[200],
                borderBottomWidth: 2,
              }}>
              <Pressable
                onPress={() => {
                  navigation.navigate(COMMUNITY_SCREEN_ARTICLE_DETIALS, {
                    id: item.id,
                  });
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    height: 120,
                    marginBottom: 10,
                  }}>
                  <View style={{ padding: 10, paddingLeft: 5 }}>
                    <Image
                      source={{ uri: item.image }}
                      style={{ height: 110, width: 110 }}
                    />
                  </View>
                  <View style={{ width: DEVICE_WIDTH - 130, marginTop: 10 }}>
                    <Text
                      style={styles.title}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {item.title}
                    </Text>
                    <View style={{ height: 90 }}>
                      <Text
                        style={styles.content}
                        numberOfLines={5}
                        ellipsizeMode="tail">
                        {item.content}
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  sort: {
    height: (97 / 844) * DEVICE_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomColor: colors.gray[200],
    borderBottomWidth: 2,
  },
  eat: {
    width: (50 / 390) * DEVICE_WIDTH,
    height: (57 / 844) * DEVICE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  use: {
    width: (50 / 390) * DEVICE_WIDTH,
    height: (57 / 844) * DEVICE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  encyclopedias: {
    width: (50 / 390) * DEVICE_WIDTH,
    height: (57 / 844) * DEVICE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionAnswer: {
    width: (50 / 390) * DEVICE_WIDTH,
    height: (57 / 844) * DEVICE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  font: {
    fontSize: colors.fontSize[300],
    color: colors.font[300],
    marginTop: (5 / 844) * DEVICE_HEIGHT,
  },
  title: {
    fontSize: colors.fontSize[300],
    color: colors.font[300],
  },
  content: {
    fontSize: colors.fontSize[200],
    color: colors.font[300],
    marginTop: 5,
  },
});

export default CommunityGrowUp;
