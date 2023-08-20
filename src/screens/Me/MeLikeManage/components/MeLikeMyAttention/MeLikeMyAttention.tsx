/*
 * @Description: 我的关注
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-16 15:40:15
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-12 19:35:53
 */
import React, { useEffect } from 'react';
import { StyleSheet, Pressable, View, Text, ScrollView } from 'react-native';
import SearchInput from '@/components/SearchInput';
import colors from '@/assets/color';
import { useAsyncState } from '@/utils/hooks';
import { getCommunityUsers } from '@/network/api/community';
import { Avatar } from '@/plugins/elementUI';
import Fuse from 'fuse.js';

/**
 * @description: 我的关注 screen
 * @author: mzc
 */

const MeLikeMyAttention = () => {
  const [inputValue, setInputValue] = useAsyncState('');
  const [userData, setUserData] = useAsyncState([]);
  const [searchData, setSearchData] = useAsyncState([]);
  const [isSearch, setIsSearch] = useAsyncState(false);

  useEffect(() => {
    getCommunityUsers(2)
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

        {userData.map((i: any, index: number) => {
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

export default MeLikeMyAttention;
