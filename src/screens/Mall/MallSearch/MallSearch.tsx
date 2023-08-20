import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { defaultComponentHOC } from '@/utils/hoc';
import SearchInput from '@/components/SearchInput';
import {
  DEVICE_HEIGHT,
  DEVICE_STATUS_BAR_HEIGHT,
  DEVICE_WIDTH,
} from '@/config/modules/global';
import colors from '@/assets/color';
import IconPark from '@/components/IconPark';
import { Left, Delete, Refresh } from '@icon-park/svg';
import { useAsyncState } from '@/utils/hooks';
import { NavigationHelpers } from '@react-navigation/native';
import {
  selectSearchHistory,
  addSearchHistoryState,
  clearSearchHistoryState,
} from '@/store/modules/mall';
import { useDispatch, useSelector } from 'react-redux';
import { getShopSearchHot } from '@/network/api/mall';
import ActionDialog from '@/components/ActionDialog/ActionDialog';

interface Props {
  navigation: NavigationHelpers<any>;
}

/**
 * @description:
 * @return {*}
 * @author: Ban
 */

const MallSearch = ({ navigation }: Props) => {
  const [searchData, setSearchData] = useAsyncState('');
  const inputRef = useRef<any>(); // Input ref
  const [searchHot, setSearchHot] = useAsyncState([]);
  const [dialog, setDialog] = useAsyncState(false);

  const searchHistory = useSelector(selectSearchHistory);
  const dispatch = useDispatch();

  useEffect(() => {
    hotSearch();
  });

  // 获取热门搜索（猜你想搜）
  const hotSearch = () => {
    getShopSearchHot()
      .then(res => {
        // console.log(res.data);
        setSearchHot([...res.data]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // 搜索
  const search = (keyword: string = searchData) => {
    // keyword = keyword || searchData;
    inputRef.current.blur();
    if (keyword == '') return;
    dispatch(addSearchHistoryState(keyword));
    setSearchData('');
  };

  return (
    <View
      style={{
        height: DEVICE_HEIGHT,
        backgroundColor: colors.gray[0],
      }}>
      {/* 搜索栏 */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <IconPark
            style={{
              marginLeft: 10,
              marginRight: 10,
            }}
            iconPark={Left({
              theme: 'filled',
              fill: colors.font[200],
            })}
            size={24}
          />
        </TouchableOpacity>
        <SearchInput
          ref={inputRef}
          value={searchData}
          onChangeText={text => {
            setSearchData(text);
          }}
          placeholder="搜索"
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
          onPress={() => {
            search();
          }}
          style={{
            marginLeft: 15,
            marginRight: 10,
          }}>
          搜索
        </Text>
      </View>
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
        <Text>是否删除历史记录</Text>
      </ActionDialog>
      <View
        style={{
          marginTop: 10,
          marginLeft: 10,
          marginRight: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.mainText}>历史记录</Text>
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
          {searchHistory.map((item: any, index: number) => {
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
                  }}>
                  {item}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
      {/* 推荐 */}
      <View
        style={{
          marginTop: 10,
          marginLeft: 10,
          marginRight: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.mainText}>猜你想搜</Text>
          <TouchableOpacity
            onPress={hotSearch}
            style={{
              flexDirection: 'row',
            }}>
            <IconPark
              iconPark={Refresh({
                theme: 'outline',
                fill: colors.font[200],
              })}
              size={colors.fontSize[400]}
            />
            <Text
              style={{
                color: colors.font[200],
                marginLeft: 5,
              }}>
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
          {searchHot.map((item: any) => {
            return (
              <TouchableOpacity
                key={item.name}
                onPress={() => {
                  search(item.name);
                }}
                style={{
                  marginBottom: 10,
                }}>
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
  );
};

const styles = StyleSheet.create({
  mainText: {
    color: colors.font[300],
    fontSize: colors.fontSize[300],
    fontWeight: '600',
  },
});

export default defaultComponentHOC(MallSearch, {
  fillStatusBar: true,
});
