/*
 * @Description: 发布文章-链接文章
 * @Version:
 * @Autor: Austral
 * @Date: 2022-07-12 12:59:26
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-20 19:16:19
 */
import React, { useState, useRef } from 'react';
import ArticleCard from './components/CommunityArticleCard';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TextInput,
  Pressable,
} from 'react-native';
import colors from '@/assets/color';
import TitleHeader from '@/components/TitleHeader';
import LinearProgress from '@/components/LinearProgress';
import { articleSearch } from '@/network/api/community';
import { defaultComponentHOC } from '@/utils/hoc';

/**
 * @description:
 * @param {Object} inputRef 输入框ref对象
 * @param {String} inputValue 搜索框的输入值
 * @param {String} data 文章渲染数据
 * @param {*} progressStatus 进度条状态
 * @param {*} navigation
 * @return {*}
 * @author: Austral
 */

const ArticleLink = ({ props, navigation }) => {
  const inputRef = useRef();
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState([]);
  const [progressStatus, setProgressStatus] = useState('unload');

  /**
   * @description: 上拉加载更多
   * @param {String} inputValue 输入框的值
   * @param {Boolean} isSelect 是否选择
   * @return {*}
   * @author: Austral
   */

  const freshEvent = inputValue => {
    setProgressStatus('loading');
    articleSearch(4, inputValue)
      .then(res => {
        res.article.forEach(item => {
          item.isSelect = false;
        });
        console.log(res.article);
        setData([...data, ...res.article]);
        setProgressStatus('done');
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <>
      <TitleHeader
        title="文章"
        navigation={navigation}
      />
      <Pressable
        onPress={() => {
          inputRef.current.blur();
        }}>
        <View style={styles.search}>
          <View style={styles.searchbox}>
            <View style={styles.view}>
              <Text
                style={{
                  fontFamily: 'iconfont',
                  fontSize: 20,
                }}>
                {'\ue651'}
              </Text>
              <TextInput
                value={inputValue}
                ref={inputRef}
                onChangeText={text => {
                  setInputValue(text);
                  if (text) {
                    setProgressStatus('loading');
                    articleSearch(4, text)
                      .then(res => {
                        let arrary = [...data];
                        res.article.forEach(data => {
                          arrary.push({ ...data, isSelect: false });
                        });
                        setData(arrary);
                        setProgressStatus('done');
                        //console.log(arrary);
                      })
                      .catch(e => {
                        console.log(e);
                      });
                  } else {
                    setData([]); //搜索框无值则清空数据
                  }
                }}
                ref={inputRef}
                placeholder="搜索"
                style={{
                  marginLeft: 10,
                  flex: 1,
                }}></TextInput>
            </View>
          </View>
        </View>
        <Text style={styles.title}>文章列表</Text>
        <LinearProgress status={progressStatus} />
        {data.length != 0 ? (
          <FlatList
            styles={{ backgroudColor: '#fff' }}
            data={data}
            onEndReached={freshEvent}
            //refreshing={freshing}
            onEndReachedThreshold={0.1}
            renderItem={({ item, index }) => {
              return (
                <ArticleCard
                  title={item.title}
                  content={item.content}
                  image={item.img}
                  isSelect={item.isSelect}
                  onPress={() => {
                    let arr = [...data];
                    console.log(data);
                    arr[index].isSelect = !arr[index].isSelect;
                    setData(arr);
                  }}
                />
              );
            }}
            keyExtractor={item => {
              return item.title;
            }}></FlatList>
        ) : (
          <View
            style={{
              alignItems: 'center',
              marginTop: 100,
            }}>
            <Text
              style={{
                fontSize: 12,
                color: colors.font[200],
              }}>
              文章列表为空
            </Text>
          </View>
        )}
      </Pressable>
    </>
  );
};
const styles = StyleSheet.create({
  search: {
    width: '100%',
    display: 'flex',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  searchbox: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: 40,
  },
  view: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.gray[100],
    height: 34,
    borderRadius: 16,
    paddingLeft: 15,
    paddingRight: 15,
  },
  title: {
    marginTop: 15,
    backgroundColor: '#fff',
    height: 30,
    fontSize: 12,
    color: '#000',
    fontWeight: '400',
    paddingLeft: 20,
    paddingTop: 6,
  },
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
    color: colors.font[200],
    fontSize: 10,
    lineHeight: 18,
    fontWeight: '400',
  },
});
export default defaultComponentHOC(ArticleLink);
