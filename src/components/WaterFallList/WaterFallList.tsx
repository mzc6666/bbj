/*
 * @Description: 商城首页
 * @Version:
 * @Autor: Ban
 * @Date: 2022-07-01 20:58:57
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-21 22:34:07
 */
import React, {
  useState,
  useEffect,
  useRef,
  ReactNode,
  Component,
} from 'react';
import {
  View,
  Text,
  Button,
  Modal,
  PermissionsAndroid,
  StatusBar,
  FlatList,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import { getShopRecommend } from '@/network/api/mall';
import { useAsyncState } from '@/utils/hooks';
import { DEVICE_WIDTH } from '@/config/modules/global';

interface Props {
  data: any[];
  renderItem(item: any): JSX.Element;
  img: string;
}

/**
 * @description: 瀑布流组件
 * @param {object} data 数据 `必填`
 * @param {function} renderItem 每一个item的渲染函数`(item, index) => {}`
 * @param {string} img 图片对应的item属性 `例如item.img`
 * @return {*}
 * @author: Ban
 */

const WaterFallList = ({ data, renderItem, img }: Props) => {
  const [recommendData, setRecommendData] = useState<any>([[], []]); // 保存瀑布流列表数据
  const [recommendDataHeight1, setRecommendDataHeight1] = useState(0); // 瀑布流列表1高度
  const [recommendDataHeight2, setRecommendDataHeight2] = useState(0); // 瀑布流列表2高度
  const [data1, setData1] = useState<any>([]); // 处理后的数据
  const isComputedOffsetHeight = useRef<boolean>(false); // 是否计算除图片以外的其他元素的高度
  const [offsetHeight, setOffsetHeight] = useState(0); // 除图片以外的其他元素的高度
  const [location, setLocation] = useState(null);

  // 加工数据
  useEffect(() => {
    let t: any = [],
      flag = 0; // flag作为图片获取宽高结束并且将数据更新的标记
    if (img && data)
      data.forEach((value: any) => {
        Image.getSize(value[img], (width, height) => {
          value.imgHeight = height;
          ++flag;
          t.push(value);
          if (flag == data.length) setData1(t);
        });
        setRecommendDataHeight1(0);
        setRecommendDataHeight2(0);
        isComputedOffsetHeight.current = false;
      });
  }, [data, img]);

  // 获取数据之后计算瀑布流布局;
  useEffect(() => {
    let height1 = recommendDataHeight1,
      height2 = recommendDataHeight2,
      t1: any = [],
      t2: any = [],
      state = 1; // state 记录当前插入所在的列，当下一次插入和这次插入所在列相同时，置偏移量为0
    for (let i = 0; i < data.length; i++) {
      // 数据放在短列后面
      if (height1 <= height2) {
        // 第一列
        data1[i]['offsetY'] = height2 - height1;
        t1.push(data1[i]);
        height1 += data1[i]['imgHeight'];
      } else {
        // 第二列
        data1[i]['offsetY'] = height1 - height2;
        t2.push(data1[i]);
        height2 += data1[i]['imgHeight'];
      }
    }
    setRecommendData([[...t1], [...t2]]);
    setRecommendDataHeight1(height1);
    setRecommendDataHeight2(height2);
  }, [data1, data.length, recommendDataHeight1, recommendDataHeight2]);

  if (!data || !renderItem) return null;

  return (
    <View
      style={{
        flexDirection: 'column',
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View>{recommendData[0].map(renderItem)}</View>
        <View>{recommendData[1].map(renderItem)}</View>
      </View>
    </View>
  );
};

export default WaterFallList;
