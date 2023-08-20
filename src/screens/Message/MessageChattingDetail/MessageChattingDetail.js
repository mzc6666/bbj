import React, { useEffect, useRef, useState } from 'react';
import { Text, StyleSheet, View, Image, TextInput } from 'react-native';
import TitleHeader from '@/components/TitleHeader';
import { defaultComponentHOC } from '@/utils/hoc';
import { selectUserInfo } from '@/store/modules/user';
import {
  resetUserId,
  selectCurrentChattingInfo,
} from '@/store/modules/message';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '@/components/Button';
import colors from '@/assets/color';
import { sendMessageToFriend } from '@/network/api/message';

const MessageChattingDetail = ({ navigation }) => {
  const dispatch = useDispatch();

  const userId = useSelector(selectUserInfo).id; // 用户ID
  const records = useSelector(selectCurrentChattingInfo); // 当前聊天记录信息

  console.log('records: ', records);
  const [value, setValue] = useState(''); // 输入内容
  const [focus, setFocus] = useState(false); // 获得焦点
  const [renderCount, setRenderCount] = useState(1);
  const scrollViewRef = useRef(null);
  useEffect(() => {
    scrollViewRef.current.scrollToEnd({
      animated: renderCount == 1 ? false : true,
    });
    setRenderCount(renderCount + 1);
  }, [records, focus]);

  useEffect(() => {
    if (renderCount == 1) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
    return () => {
      dispatch(resetUserId());
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <TitleHeader
        title={records.info.username}
        headerLeftPress={() => {
          navigation.goBack();
        }}
        headerRight={() => {}}
      />
      <ScrollView
        ref={scrollViewRef}
        style={{ flex: 1, backgroundColor: '#FFF' }}>
        {records.messages.map((item, index) => {
          return (
            <View
              key={index}
              style={[
                {
                  flexDirection:
                    userId == item.sender.userId ? 'row-reverse' : 'row',
                },
                styles.messageItem,
              ]}>
              <Image
                style={[
                  {
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    marginLeft: userId === item.sender.userId ? 10 : 0,
                    marginRight: userId === item.sender.userId ? 0 : 10,
                  },
                ]}
                source={{ uri: item.sender.cover }}
              />
              <View style={styles.messageBox}>
                <Text>{item.content}</Text>
              </View>
            </View>
          );
        })}
        {JSON.stringify()}
      </ScrollView>
      <View style={styles.inputBox}>
        <TextInput
          value={value}
          onChangeText={setValue}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholder="请输入内容...."
          style={styles.input}
        />
        {/* onFocus={() => {
            scrollViewRef.current.scrollToEnd({ animated: true });
          }} */}
        <Button
          title="发送"
          style={styles.submitButton}
          textStyle={{ lineHeight: 18 }}
          onPress={() => {
            sendMessageToFriend(Number(records.info.userId), value);
            setValue('');
          }}></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageItem: {
    // backgroundColor: '#FFF',
    paddingHorizontal: 20,
    marginVertical: 16,
  },
  image: {
    marginRight: 10,
  },
  messageBox: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  inputBox: {
    flexDirection: 'row',
    padding: 9,
    backgroundColor: '#FFF',
  },
  input: {
    // backgroundColor: 'red',
    flex: 1,
    fontSize: colors['fontSize']['300'],
    lineHeight: 18,
  },
  submitButton: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
});

export default defaultComponentHOC(MessageChattingDetail);
