/*
 * @description:
 * @Version:
 * @Autor: Xu
 * @Date: 2023-03-07 19:44:47
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-20 19:15:06
 */
import colors from '@/assets/color';
import IconPark from '@/components/IconPark';
import SearchInput from '@/components/SearchInput';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@/config/modules/global';
import { defaultComponentHOC } from '@/utils/hoc';
import { Left, Delete, Refresh, TestTube, Like } from '@icon-park/svg';
import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import ActionDialog from '@/components/ActionDialog/ActionDialog';
import { articleSearch, getHotArticle } from '@/network/api/community';
import { useAsyncState } from '@/utils/hooks';
import { useDispatch, useSelector } from 'react-redux';
import {
  addSearchHistoryState,
  clearSearchHistoryState,
  selectSearchHistoryOfCommunity,
} from '@/store/modules/community';
import { WaterFallList } from '@/components/WaterFallList';

const CommunitySearch = ({ navigation }) => {
  const [searchArticle, setSearchArticle] = useState([]); // 文章数据
  const [searchData, setSearchData] = useAsyncState(''); // 搜索栏数据
  const [hotArticle, setHotArticle] = useAsyncState([]); // 热搜

  const [dialog, setDialog] = useState(false); // 弹窗状态

  const searchHistory = useSelector(selectSearchHistoryOfCommunity); // store中的搜索历史
  const dispatch = useDispatch();

  const [isSearched, setIsSearched] = useAsyncState(false); // 是否搜索到文章
  const [searchedArticles, setSearchedArticles] = useState([]); // 搜索到的文章

  // useEffect(() => {
  //   articleSearch()
  //     .then(res => {
  //       setSearchArticle(res.articles);
  //       console.log(res.articles);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }, []);

  // useEffect(() => {
  //   getHotArticle()
  //     .then(res => {
  //       setHotArticle(res.data);
  //       console.log(res.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }, []);

  // 搜索
  const search = data => {
    articleSearch(7, data)
      .then(res => {
        // console.log(res);
        setSearchedArticles(res.article);
        console.log(searchedArticles);
      })
      .catch(error => {
        console.log(error);
      });
    if (isSearched);
    else setIsSearched(!isSearched);
  };

  // 热搜
  const hotSearch = () => {
    getHotArticle()
      .then(res => {
        setHotArticle([...res.data]);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <View
      style={{
        height: DEVICE_HEIGHT,
        backgroundColor: colors.gray[0],
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => {
            if (isSearched) {
              setIsSearched(false);
            } else {
              navigation.goBack();
            }
          }}>
          <IconPark
            style={{ marginLeft: 10, marginRight: 10 }}
            iconPark={Left({
              theme: 'filled',
              fill: colors.font[200],
            })}
            size={24}
          />
        </TouchableOpacity>
        <SearchInput
          value={searchData}
          onChangeText={text => {
            setSearchData(text);
            setIsSearched(false);
          }}
          placeholder="搜一搜"
          inputStyle={{
            color: colors.font[300],
          }}
          style={{
            flex: 1,
            backgroundColor: colors.gray[200],
            marginTop: 8,
            marginBottom: 8,
          }}
        />
        <Text
          style={{ marginLeft: 15, marginRight: 10 }}
          onPress={() => {
            if (searchData != '') {
              setSearchData(searchData);
              dispatch(addSearchHistoryState(searchData));
            }
            setSearchData('');
            // setIsSearched(!isSearched);
            search(searchData);
          }}>
          搜索
        </Text>
      </View>
      {/* 根据key值判断是否搜索到文章，从而实现页面的切换 */}
      {isSearched ? (
        <>
          {/* <ScrollView style={{ padding: 10 }}>
            {searchedArticles.map((item, index) => {
              return (
                <>
                  <View
                    style={{
                      marginTop: 5,
                      backgroundColor: colors.gray[200],
                      borderRadius: 16,
                      height: 40,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{ paddingLeft: 10 }}
                      numberOfLines={1}>
                      {item.title}
                    </Text>
                  </View>
                </>
              );
            })}
            <View style={{ height: 40 }}></View>
          </ScrollView> */}
          <ScrollView
            style={{
              flexDirection: 'column',
              backgroundColor: colors.gray[100],
              marginTop: 4,
            }}>
            <View style={{ flexDirection: 'row' }}>
              <View>
                <WaterFallList
                  data={searchedArticles}
                  img="img"
                  renderItem={item => {
                    var imgHeight;
                    var str = item.img;
                    let regH = /\d{3}$/;
                    imgHeight = Number(regH[Symbol.match](str));
                    return (
                      <Pressable
                        key={item.id}
                        onPress={() => {
                          navigation.navigate(
                            COMMUNITY_SCREEN_ARTICLE_DETIALS,
                            {
                              id: item.id,
                            },
                          );
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
                            height: imgHeight,
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
                                style={{
                                  width: 16,
                                  height: 16,
                                  borderRadius: 999,
                                }}
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
            <View style={{ height: (1 / 10) * DEVICE_HEIGHT }}></View>
          </ScrollView>
        </>
      ) : (
        <>
          {/* 历史记录 */}
          <ActionDialog
            isShow={dialog}
            cancel={() => {
              setDialog(false);
            }}
            comfirm={() => {
              setDialog(false);
              dispatch(clearSearchHistoryState());
            }}
            onBackPress={() => {
              setDialog(false);
            }}>
            <Text>是否删除历史记录？</Text>
          </ActionDialog>
          <View style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text>历史记录</Text>
              <TouchableOpacity
                onPress={() => {
                  setDialog(true);
                }}>
                <IconPark
                  iconPark={Delete({
                    theme: 'outline',
                    fill: colors.font[200],
                  })}
                  size={18}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
                marginTop: 15,
              }}>
              {/* searchList */}
              {searchHistory.map((item, index) => {
                return (
                  <View key={index}>
                    <Text
                      style={{
                        paddingTop: 3,
                        paddingBottom: 3,
                        paddingLeft: 12,
                        paddingRight: 12,
                        borderWidth: 1,
                        borderColor: colors.gray[200],
                        borderRadius: 16,
                        marginBottom: 10,
                        marginRight: 9,
                      }}
                      onPress={() => {
                        search({ item });
                      }}>
                      {item}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
          <View>
            {/* 猜你想搜 */}
            <View style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text>猜你想搜</Text>
                <TouchableOpacity
                  onPress={hotSearch}
                  style={{ flexDirection: 'row' }}>
                  <IconPark
                    iconPark={Refresh({
                      theme: 'outline',
                      fill: colors.font[200],
                    })}
                    size={colors.fontSize[400]}
                  />
                  <Text style={{ color: colors.font[200], marginLeft: 5 }}>
                    换一换
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  marginTop: 15,
                }}>
                {hotArticle.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={item.name}
                      onPress={() => {
                        search(item.name);
                      }}
                      style={{ marginBottom: 10 }}>
                      <Text
                        style={{
                          width: DEVICE_WIDTH / 2 - 10,
                          color: colors.font[300],
                        }}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default defaultComponentHOC(CommunitySearch, { fillStatusBar: true });
