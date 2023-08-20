/*
 * @Description: 社区-推荐页面
 * @Version:
 * @Autor: makka-pakka
 * @Date: 2022-08-09 19:04:35
 * @LastEditors: Xu
 * @LastEditTime: 2023-03-22 12:08:24
 */
import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { defaultComponentHOC } from '@/utils/hoc';
import IconPark from '@/components/IconPark';
import { Down, EditTwo, Like } from '@icon-park/svg';
import colors from '@/assets/color';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@/config/modules/global';
import { articleSearch } from '@/network/api/community';
import { WaterFallList } from '@/components/WaterFallList';
import {
  COMMUNITY_PUBLISH_ARTICLES,
  COMMUNITY_SCREEN_ARTICLE_DETIALS,
} from '@/navigation/navigationNames';
import { NavigationHelpers } from '@react-navigation/native';
import { useAsyncState } from '@/utils/hooks';

const CommunityRecommend = ({
  navigation,
}: {
  navigation: NavigationHelpers<any>;
}) => {
  // 标题栏数据
  const Titles = [
    {
      id: 0,
      title: '推荐',
    },
    {
      id: 1,
      title: '成长',
    },
    {
      id: 2,
      title: '育儿',
    },
    {
      id: 3,
      title: '一岁',
    },
    {
      id: 4,
      title: '两岁',
    },
    {
      id: 5,
      title: '三岁',
    },
  ];

  const [States, setStates] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
  ]);

  // 搜索文章（查看）
  const [SearchArticles, setSearchArticles] = useAsyncState([]);

  // 获取数据
  useEffect(() => {
    articleSearch(5)
      .then(res => {
        console.log(res);
        setSearchArticles(res.article);
      })
      .catch(e => {
        console.log(e);
      });
  });

  return (
    <View style={{ width: DEVICE_WIDTH, flex: 1 }}>
      <View
        style={{
          marginLeft: 15,
          marginRight: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 6.5,
          }}>
          {Titles.map(item => {
            return (
              <View key={item.id}>
                <TouchableOpacity
                  onPress={() => {
                    for (let i = 0; i < 6; i++) {
                      States[i] = false;
                    }
                    States[item.id] = true;
                    let newStates = States;
                    setStates(
                      Object.assign({}, States, {
                        States: newStates,
                      }),
                    );
                  }}>
                  <Text
                    style={
                      States[item.id]
                        ? { color: '#000000' }
                        : { color: colors.font[200] }
                    }>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
          <TouchableOpacity>
            <IconPark
              iconPark={Down({
                theme: 'outline',
                fill: [colors.font[200]],
              })}
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={{
          flexDirection: 'column',
          backgroundColor: colors.gray[100],
          marginTop: 4,
        }}>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <WaterFallList
              data={SearchArticles}
              img="img"
              renderItem={(item: any) => {
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
                      marginBottom: 10,
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
                          marginTop: 2,
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
        <View style={{ height: (1 / 6) * DEVICE_HEIGHT }}></View>
      </ScrollView>
      <View
        style={{
          bottom: 250,
          // top: 100,
          right: 30,
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

export default CommunityRecommend;
