/*
 * @Description: 消息
 * @Version:
 * @Autor: Ban
 * @Date: 2022-08-18 16:14:56
 * @LastEditors: Ban
 * @LastEditTime: 2023-04-14 20:57:28
 */
import { createSlice } from '@reduxjs/toolkit';

interface SenderInfo {
  userId: number;
  username: string;
  cover: string;
}

interface MessageDetail {
  sender: SenderInfo;
  receiver: SenderInfo;
  content: string;
  time: string;
  type: 'official' | 'friend';
}

export const messageSlice = createSlice({
  name: 'message',
  initialState: {
    lookId: -1, // 当前正在查看的消息的好友ID
    friends: {},
    official: {}, //
  },
  reducers: {
    setLookId(state, action) {
      // 通过action的id更新未读
      state.lookId = action.payload;
      const friendMessages: any = state.friends;
      const officialMessages: any = state.official;
      if (friendMessages[action.payload]) {
        friendMessages[action.payload].unRead = 0;
      } else if (officialMessages[action.payload]) {
        officialMessages[action.payload].unRead = 0;
      }
    },
    resetUserId(state) {
      state.lookId = -1;
    },
    messageArrived(
      state,
      action: { payload: { userId: number; data: MessageDetail } },
    ) {
      const records: any =
        action.payload.data.type == 'official' ? state.official : state.friends;
      const payload = action.payload;
      const friendInfo =
        payload.userId == payload.data.sender.userId
          ? payload.data.receiver
          : payload.data.sender;
      console.log('friendInfo: ', friendInfo);
      // console.log('records: ', records);
      if (records[friendInfo.userId]) {
        records[friendInfo.userId].unRead =
          friendInfo.userId === state.lookId
            ? 0
            : records[friendInfo.userId].unRead + 1;
        records[friendInfo.userId].messages.push(payload.data);
      } else {
        records[friendInfo.userId] = {
          info: {
            ...friendInfo,
          },
          unRead: state.lookId === friendInfo.userId ? 0 : 1,
          messages: [payload.data],
        };
        console.log(records[friendInfo.userId]);
      }
    },
  },
});

export const handleMessageArrived =
  (data: MessageDetail) => (dispatch: any, getState: any) => {
    const userId = getState().user.userInfo.id;
    console.log('arrived data: ', data);
    dispatch(
      messageArrived({
        userId,
        data,
      }),
    );
  };

export const { setLookId, resetUserId, messageArrived } = messageSlice.actions;

export const selectOfficialMessage = (state: any) => state.message.official;
export const selectFriendsMessage = (state: any) => state.message.friends;
export const selectRecords = (state: any) => state.message.records;
export const selectCurrentChattingInfo = (state: any) => {
  let friendRecords = state.message.friends;
  let officialRecords = state.message.official;
  if (friendRecords[state.message.lookId]) {
    return friendRecords[state.message.lookId];
  } else {
    return officialRecords[state.message.lookId];
  }
};

export const selectLookId = (state: any) => state.message.lookId;

export default messageSlice.reducer;
