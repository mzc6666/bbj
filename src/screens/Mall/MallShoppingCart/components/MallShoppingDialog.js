/*
 * @description: 购物车商品Dialog组加
 * @Version:
 * @Autor: 许志兴
 * @Date: 2022-12-25 15:41:34
 * @LastEditors: Xu
 * @LastEditTime: 2023-01-04 23:28:36
 */
import React, { useCallback, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Dialog from '@/components/Dialog/Dialog';

/**
 * @description: 购物车商品Dialog组件
 * @param {*} data[] 商品详情
 * @param {Boolean} store 是否有库存
 * @param {Boolean} discount 是否有优惠券
 * @param {Number} value 优惠券价格（前提是有优惠券）
 * @param {Boolean} isShow 是否显示弹窗
 * @param {Function} onBackPress 返回函数
 * @param {Object} style 样式
 * @returns
 */

const MallShoppingDialog = ({
  // 购物车商品状态
  image_URL,
  title,
  price,
  option,
  count,
  // 购买权限
  store,
  // 优惠券
  discount,
  value,
  // 弹窗状态
  isShow,
  onBackPress = () => {},
  style,
}) => {
  // 商品到手价
  const [current_price, set_current_price] = useState(price);
  if (discount) {
    set_current_price(price - value);
  }
  // 获取并更新弹窗显示状态
  const [display, set_display] = useState(isShow);
  return (
    <Pressable>
      {/* 调用组件Dialog */}
      <Dialog
        isShow={display}
        position="bottom">
        <View style={styles.whole}>
          <View>
            {/* 商品简介 */}
            <View>
              <Image
                source={image_URL}
                style={styles.img}
              />
              <Text>{title}</Text>
              {discount ? <Text>到手价 ¥{current_price}</Text> : <></>}
            </View>
            {/* 商品选项 */}
            <View>
              <Text>选项</Text>
              <TouchableOpacity>
                <Text>{option}</Text>
              </TouchableOpacity>
            </View>
            {/* 商品数量 */}
            <View>
              <Text>数量</Text>
              <Text>{count}</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity>
              {store ? <Text>确定</Text> : <Text>售罄</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </Dialog>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  whole: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
  },
  img: {},
});

export default MallShoppingDialog;
