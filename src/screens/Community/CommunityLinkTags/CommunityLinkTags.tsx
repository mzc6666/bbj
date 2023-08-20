/*
 * @Description:添加标签
 * @Version:
 * @Autor: makka-pakka
 * @Date: 2022-07-07 22:04:02
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-09 21:16:09
 */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Animated,
} from 'react-native';
import Search from '@/components/Search';
import colors from '@/assets/color';
import { articleTag } from '@/network/api/community';
import Tag from '@/components/Tag';
import TitleHeader from '@/components/TitleHeader';
import { defaultComponentHOC, defaultScreenHOC } from '@/utils/hoc';
import { useNavigationAnimate, useAsyncState } from '@/utils/hooks';
import ActionDialog from '@/components/ActionDialog/ActionDialog';
import Input from '@/components/Input';

interface Props {
  close: () => void;
  data: Array<any>;
  limit?: number;
  confirm: (data: any) => void;
}

/**
 * @description: 添加标签
 * @param {function} close 关闭回调
 * @param {array} data 绑定的数据，用来标记已选中的标签
 * @param {number} limit 限制选中标签的数量 `默认为0无限制`
 * @return {ReactNode} 添加标签组件
 * @author: Ban
 */

const CommunityLinkTags = ({
  close,
  data = [],
  limit = 0,
  confirm = () => {},
}: Props) => {
  const [dataArr, setDataArr] = useAsyncState([]); //标签绑定数组
  const [showDialog, setShowDialog] = useAsyncState(false);
  const [inputValue, setInputValue] = useAsyncState('');
  const [selectTags, setSelectTags] = useAsyncState(new Set());

  // 获取标签
  useEffect(() => {
    articleTag()
      .then(res => {
        let arr = [...dataArr];
        res.data.forEach((data: any) => {
          arr.push({ ...data, isSelect: false });
        });
        setDataArr(arr);
      })
      .catch(e => {
        console.log(e);
      });
  });

  return (
    <View>
      <TitleHeader
        title="添加标签"
        headerLeftPress={() => {
          close();
        }}
        headerRightPress={() => {
          confirm(Array.from(selectTags));
          close();
        }}
      />
      <ScrollView>
        <View style={StyleSheet.flatten([styles.viewSearch])}>
          <Search></Search>
        </View>
        <View style={styles.viewContent}>
          <Text style={styles.viewContentText}>标签列表</Text>
          <View style={styles.viewContentLine}></View>
          <View style={styles.viewContentTags}>
            {dataArr.map((item: any, index: any) => {
              return (
                <Tag
                  title={item.name}
                  key={item.name}
                  isSelect={item.isSelect}
                  style={{
                    marginRight: 12,
                    marginBottom: 9,
                  }}
                  onPress={() => {
                    console.log(item);

                    if (item.isSelect) {
                      selectTags.delete(item);
                    } else {
                      selectTags.add(item);
                    }
                    dataArr[index].isSelect = !dataArr[index].isSelect;
                    setDataArr([...dataArr]);
                  }}
                />
              );
            })}
            <Tag
              title="+"
              style={{
                marginRight: 12,
                marginBottom: 9,
              }}
              onPress={() => {
                setShowDialog(true);
              }}
            />
            <ActionDialog
              isShow={showDialog}
              cancel={() => {
                setShowDialog(false);
              }}
              comfirm={() => {
                const newTag = {
                  name: inputValue,
                  isSelect: true,
                };
                setDataArr(dataArr.concat([newTag]));
                selectTags.add(newTag);
                setShowDialog(false);
              }}>
              <Text>输入标签</Text>
              <Input
                value={[inputValue, setInputValue]}
                onChangeText={(text: string) => {
                  setInputValue(text);
                }}
              />
            </ActionDialog>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  viewSearch: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 5,
    paddingBottom: 11,
  },
  viewContent: {
    backgroundColor: 'white',
    marginTop: 15,
    paddingBottom: 10,
    paddingTop: 6,
  },
  viewContentText: {
    color: colors.font[300],
    paddingBottom: 6,
    paddingLeft: 20,
  },
  viewContentLine: {
    height: 1,
    backgroundColor: colors.gray[100],
  },
  viewContentTags: {
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default defaultScreenHOC(CommunityLinkTags);
