/*
 * @Description:
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-16 15:38:30
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-12 19:34:25
 */
import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import SearchInput from '@/components/SearchInput';
import { DEVICE_WIDTH } from '@/config/modules/global';
import colors from '@/assets/color';
import { useAsyncState } from '@/utils/hooks';
import { getCommunityUsers } from '@/network/api/community';
import { NavigationHelpers } from '@react-navigation/native';
import { Avatar } from '@/plugins/elementUI';
import Fuse from 'fuse.js';

interface Props {
  navigation: NavigationHelpers<any>;
}

/**
 * @description: 喜欢我的 screen
 * @param {*} navigation 导航器对象
 * @param {*} route 路由对象
 * @return {*}
 * @author: mzc
 */

const MeLikeFans = ({ navigation }: Props) => {
  const [inputValue, setInputValue] = useAsyncState('');
  const [userData, setUserData] = useAsyncState([]);
  const [searchData, setSearchData] = useAsyncState([]);
  const [isSearch, setIsSearch] = useAsyncState(false);

  useEffect(() => {
    getCommunityUsers(1)
      .then(res => {
        setUserData([...res.data]);
      })
      .catch(err => {
        console.log(err);
      });
  });

  const onSubmitingEditing = () => {
    if (!inputValue) {
      setIsSearch(false);
      return;
    }
    const fuse = new Fuse(userData, { keys: ['name'] });
    setSearchData([...fuse.search(inputValue)]);
    setIsSearch(true);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.gray[100] }}>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 8,
        }}>
        <SearchInput
          onSubmitingEditing={onSubmitingEditing}
          value={inputValue}
          onChangeText={text => {
            setInputValue(text);
          }}
          style={{
            backgroundColor: colors['gray']['0'],
            marginBottom: 10,
          }}
        />

        {(isSearch ? searchData : userData).map((i: any, index: number) => {
          if (isSearch) i = i.item;

          return (
            <View
              key={i.id}
              style={{
                marginVertical: 10,
                paddingVertical: 10,
                flexDirection: 'row',
                backgroundColor: colors.gray[0],
                alignItems: 'center',
                borderRadius: 8,
              }}>
              <Avatar
                containerStyle={{
                  marginLeft: 10,
                  marginRight: 20,
                }}
                source={{
                  uri: i.avatar,
                }}
                rounded
                size={64}
              />
              <Text
                style={{
                  color: colors.font[300],
                  fontSize: colors.fontSize[500],
                }}>
                {i.name}
              </Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default MeLikeFans;
