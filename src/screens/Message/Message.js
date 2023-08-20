/*
 * @Description: 消息页面
 * @Version:
 * @Autor: Ban
 * @Date: 2022-07-01 20:58:57
 * @LastEditors: mzc
 * @LastEditTime: 2023-04-14 15:24:28
 */
import {
  MESSAGE_SCREEN_CHATTING_LIST,
  MESSAGE_SCREEN_COMMENTSANDEIT,
  MESSAGE_SCREEN_CONCERNS,
  MESSAGE_SCREEN_RECEIVEDPRAISE,
} from '@/navigation/navigationNames';
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  Button,
  DevSettings,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { defaultComponentHOC } from '@/utils/hoc';
import Toast from '@/components/Toast';
import { useToast } from '@/utils/hooks';
import { persistor } from '@/store/configureStore';
import MessageNewConcern from './MessageNewConcern/MessageNewConcern';
import { Camera, Comment, Like, People, TicketsTwo } from '@icon-park/svg';
import IconPark from '@/components/IconPark';
import colors from '@/assets/color';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeGrouthRecord from '../Home/HomeGrowthCurve/HomeGrouthRecord/HomeGrouthRecord';
import TitleHeader from '@/components/TitleHeader';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@/config/modules/global';
import { TouchableOpacity } from 'react-native-gesture-handler';
import navigation from '@/navigation';
import MessageReceivedPraise from './MessageReceivedPraise/MessageReceivedPraise';
import {
  selectFriendsMessage,
  selectOfficialMessage,
  setLookId,
} from '@/store/modules/message';
import { useDispatch, useSelector } from 'react-redux';
// /**
//  * @description: 消息页面
//  * @return {*}
//  * @author: Ban
//  */

// const Message = ({}) => {
//   const Tab = createMaterialTopTabNavigator();
//   const status = useState(false);
//   const { showToast } = useToast();
//   const [isNewConcern, setIsNewConcern] = useState(false);

//   if (isNewConcern) {
//     return (
//       <MessageNewConcern
//         close={() => {
//           setIsNewConcern(false);
//         }}
//       />
//     );
//   }

//   return (
//     <View>
//       <Text>Message</Text>
//       <Button
//         title="go to new concerns"
//         onPress={() => {
//           setIsNewConcern(true);
//         }}
//       />
//       <Button
//         title="show Toast"
//         onPress={() => {
//           // status[1](true);
//           showToast();
//         }}
//       />
//       <Button
//         title="click to clear all storage state"
//         onPress={() => {
//           persistor.purge().then(res => {
//             console.log(res);
//             DevSettings.reload();
//           });
//         }}
//       />
//       <Text>asdjkf</Text>

//       <Text>1213</Text>
//       <Tab.Navigator>
//         <Tab.Screen
//           name="test"
//           component={() => {
//             console.log('test');
//             return <Text>test</Text>;
//           }}
//         />
//         <Tab.Screen
//           name="frok"
//           component={() => {
//             console.log('fork');
//             return <Text>fork</Text>;
//           }}
//         />
//       </Tab.Navigator>
//     </View>
//   );
// };

// export default defaultComponentHOC(Message);

/**
 * @description: 消息界面
 * @return {*}
 * @author: Xu
 */

const Message = ({ navigation }) => {
  const officialMessages = useSelector(selectOfficialMessage);
  const friendMessages = useSelector(selectFriendsMessage);
  const dispatch = useDispatch();
  // console.log('officialMessages: ', JSON.stringify({ officialMessages }));
  // console.log('friendMessages: ', JSON.stringify({ friendMessages }));
  // 格式化时间
  const formatTime = timeStr => {
    const time = new Date(timeStr);
    const now = new Date();
    if (
      time.getMonth() === now.getMonth() &&
      time.getFullYear() === now.getFullYear() &&
      time.getDate() === now.getDate()
    ) {
      return `${
        time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
      }:${
        time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
      }`;
    } else {
      return `${time.getMonth()}月 ${time.getDate()} 日`;
    }
  };
  const handleLookChattingDetail = id => {
    dispatch(setLookId(Number(id)));
    navigation.navigate(MESSAGE_SCREEN_CHATTING_LIST);
  };
  return (
    <>
      {/* 顶部标题栏 */}
      <TitleHeader
        title="消息"
        navigation={navigation}
        headerLeft={() => <></>}
        headerRight={() => <></>}
      />
      <ScrollView style={{ flex: 1, backgroundColor: '#FFF' }}>
        <Text style={{ paddingLeft: 20, fontSize: colors['fontSize']['200'] }}>
          前线客服
        </Text>
        {/* 消息界面栏 */}
        <View>
          {Object.keys(officialMessages).map(key => {
            return (
              <TouchableOpacity
                key={key}
                style={styles.messageItem}
                onPress={() => {
                  handleLookChattingDetail(key);
                }}>
                <Image
                  style={{ width: 44, height: 44, borderRadius: 22 }}
                  source={{ uri: officialMessages[key].info.cover }}
                />
                <View style={{ flex: 1, paddingLeft: 12 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.username}>
                      {officialMessages[key].info.username}
                    </Text>
                    <Text style={styles.time}>
                      {formatTime(officialMessages[key].messages.at(-1).time)}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.content}>
                      {officialMessages[key].messages.at(-1).content}
                    </Text>
                    <Text
                      style={[
                        {
                          display: officialMessages[key].unRead
                            ? 'flex'
                            : 'none',
                        },
                        styles.unRead,
                      ]}>
                      {officialMessages[key].unRead}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
          {/* <Text>{JSON.stringify(records)}</Text> */}
        </View>

        <Text style={{ paddingLeft: 20, fontSize: colors['fontSize']['200'] }}>
          好友私信
        </Text>
        {/* 好友私信 */}
        <View>
          {Object.keys(friendMessages).map(key => {
            return (
              <TouchableOpacity
                key={key}
                style={styles.messageItem}
                onPress={() => {
                  handleLookChattingDetail(key);
                }}>
                <Image
                  style={{ width: 44, height: 44, borderRadius: 22 }}
                  source={{ uri: friendMessages[key].info.cover }}
                />
                <View style={{ flex: 1, paddingLeft: 12 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.username}>
                      {friendMessages[key].info.username}
                    </Text>
                    <Text style={styles.time}>
                      {formatTime(friendMessages[key].messages.at(-1).time)}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.content}>
                      {friendMessages[key].messages.at(-1).content}
                    </Text>
                    <Text
                      style={[
                        {
                          display: friendMessages[key].unRead ? 'flex' : 'none',
                        },
                        styles.unRead,
                      ]}>
                      {friendMessages[key].unRead}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  shift: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    padding: 12,
  },
  like: {
    height: 60,
    width: 60,
    backgroundColor: colors.rose[200],
    borderRadius: 16,
    alignItems: 'center',
    paddingTop: 12,
  },
  people: {
    height: 60,
    width: 60,
    backgroundColor: colors.auxiliary[300],
    borderRadius: 16,
    opacity: 0.56,
    alignItems: 'center',
    paddingTop: 12,
  },
  comment: {
    height: 60,
    width: 60,
    backgroundColor: colors.auxiliary[200],
    borderRadius: 16,
    opacity: 0.56,
    alignItems: 'center',
    paddingTop: 12,
  },
  messageItem: {
    paddingVertical: 13,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignContent: 'center',
    backgroundColor: '#FFF',
  },
  username: {
    fontSize: colors['fontSize']['300'],
    color: '#000',
    paddingBottom: 4,
  },
  content: {
    fontSize: colors['fontSize']['200'],
    color: colors['gray']['500'],
  },
  time: {
    fontSize: colors['fontSize']['200'],
    color: colors['gray']['500'],
  },
  unRead: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
    borderRadius: 10,
    fontSize: colors['fontSize']['100'],
    lineHeight: 20,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFF',
    fontWeight: 600,
  },
});

export default defaultComponentHOC(Message);
