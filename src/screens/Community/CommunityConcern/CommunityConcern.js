/*
 * @Description: 社区-关注页面
 * @Version:
 * @Autor: makka-pakka
 * @Date: 2022-08-09 19:06:58
 * @LastEditors: Xu
 * @LastEditTime: 2023-03-07 19:03:42
 */
import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { defaultComponentHOC, defaultScreenHOC } from '@/utils/hoc';
import IconPark from '@/components/IconPark';
import { EditTwo, Like } from '@icon-park/svg';
import colors from '@/assets/color';
// import { ScreenHeight, ScreenWidth } from '@rneui/base';
import { articleSearch } from '@/network/api/community';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@/config/modules/global';
import { WaterFallList } from '@/components/WaterFallList';
import { ScreenHeight } from '@rneui/base';
import {
  COMMUNITY_PUBLISH_ARTICLES,
  COMMUNITY_SCREEN_ARTICLE_DETIALS,
} from '@/navigation/navigationNames';

const CommunityConcern = ({ navigation }) => {
  // 搜索文章（查看）
  const [SearchArticles, setSearchArticles] = useState([]);

  // 获取数据
  useEffect(() => {
    articleSearch(6)
      .then(res => {
        setSearchArticles(res.article);
        console.log(res.article);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  return (
    <View
      style={{
        marginTop: 10,
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT,
      }}>
      <ScrollView>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <WaterFallList
              data={SearchArticles}
              img="img"
              renderItem={item => {
                // var imgHeight;
                // var str = item.img;
                // let regH = /\d{3}$/;
                // imgHeight = Number(regH[Symbol.match](str));
                return (
                  <Pressable
                    key={item.id}
                    onPress={() => {
                      navigation.navigate(COMMUNITY_SCREEN_ARTICLE_DETIALS, {
                        id: item.id,
                      });
                    }}
                    style={{
                      width: DEVICE_WIDTH / 2 - 10,
                      marginLeft: 5,
                      marginRight: 5,
                      backgroundColor: colors.gray[0],
                      marginBottom: 15,
                      flex: 1,
                    }}>
                    <Image
                      resizeMode="cover"
                      source={{ uri: item.img }}
                      style={{
                        width: DEVICE_WIDTH / 2 - 10,
                        height: item.imgHeight,
                        // imgHeight
                      }}
                    />
                    <View
                      style={{
                        marginLeft: 5,
                        marginRight: 5,
                        marginBottom: 5,
                      }}>
                      {/* <Text>{item.title}</Text> */}
                      <Text
                        style={{
                          fontSize: colors.fontSize[300],
                          color: '#000000',
                        }}>
                        {item.title}
                      </Text>
                      <View
                        style={{
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                        }}>
                        <View style={{ flexDirection: 'row' }}>
                          <Image
                            source={{ uri: item.avatar }}
                            style={{ width: 16, height: 16, borderRadius: 999 }}
                          />
                          <Text
                            style={{
                              fontSize: colors.fontSize[100],
                              color: colors.font[200],
                              marginLeft: 5,
                              marginTop: 0.5,
                            }}>
                            {item.author}
                          </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                          <Text
                            style={{
                              fontSize: colors.fontSize[100],
                              color: colors.font[200],
                              marginRight: 5,
                            }}>
                            {item.likeCount}
                          </Text>
                          {item.isLike ? (
                            <IconPark
                              iconPark={Like({
                                theme: 'filled',
                                fill: [colors.rose[400]],
                              })}
                              size={16}
                            />
                          ) : (
                            <IconPark
                              iconPark={Like({
                                theme: 'filled',
                                fill: [colors.gray[200]],
                              })}
                              size={16}
                            />
                          )}
                        </View>
                      </View>
                    </View>
                  </Pressable>
                );
              }}
            />
          </View>
        </View>
        <View
          style={{
            height: (1 / 6) * DEVICE_HEIGHT,
            width: DEVICE_WIDTH,
          }}></View>
      </ScrollView>
      <View
        style={{
          top: DEVICE_HEIGHT * (3 / 4),
          right: DEVICE_WIDTH * (1 / 9),
          position: 'absolute',
        }}>
        <TouchableOpacity
          style={styles.edit}
          onPress={() => {
            navigation.navigate(COMMUNITY_PUBLISH_ARTICLES);
          }}>
          <View style={{ marginTop: 6 }}>
            <IconPark
              iconPark={EditTwo({
                theme: 'filled',
                fill: ['#ffffff'],
              })}
              size={28}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  edit: {
    width: 42,
    height: 42,
    backgroundColor: colors.rose[400],
    alignItems: 'center',
    borderRadius: 999,
  },
});

export default CommunityConcern;
