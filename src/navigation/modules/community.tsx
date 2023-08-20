/*
 * @Description: 社区页面导航
 * @Version:
 * @Autor: Ban
 * @Date: 2022-07-09 22:02:43
 * @LastEditors: Xu
 * @LastEditTime: 2023-03-07 19:49:30
 */

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { initStackNavigation } from '../navigation';
import { Text, Button, View } from 'react-native';

import {
  COMMUNITY_SCREEN,
  COMMUNITY_SCREEN_LINK_TAGS,
  COMMUNITY_SCREEN_LINK_ARTICLE,
  COMMUNITY_SCREEN_LINK_MEMBER,
  COMMUNITY_SCREEN_SEARCH,
  COMMUNITY_SCREEN_ARTICLE_DETIALS,
  COMMUNITY_PUBLISH_ARTICLES,
} from '../navigationNames';

import { HomeBottomNavigation } from '../bottom';
import Community from '@/screens/Community/Community';
import CommunityScreenLinkTags from '@/screens/Community/CommunityLinkTags/CommunityLinkTags';
import ArticleLink from '@/screens/Community/CommunityLinkArticle/CommunityLinkArticle';
import CommunityLinkMember from '@/screens/Community/CommunityLinkMember/CommunityLinkMember';
import CommunitySearch from '@/screens/Community/CommunitySearch/CommunitySearch';
import CommunityArticleDetails from '@/screens/Community/CommunityArticleDetails/CommunityArticleDetails';
import CommunityPublishArticles from '@/screens/Community/CommunityPublishArticle/CommunityPublishArticles';

/**
 * @description: 首页相关导航
 * @param {Stack} Stack 堆栈导航器实例
 * @return {*}
 * @author: Ban
 */

export const CommunityScreenNavigation = (Stack: any) => {
  return (
    <>
      {initStackNavigation(
        Stack,
        COMMUNITY_SCREEN_LINK_TAGS,
        CommunityScreenLinkTags,
      )}
      {initStackNavigation(Stack, COMMUNITY_SCREEN_LINK_ARTICLE, ArticleLink)}
      {initStackNavigation(
        Stack,
        COMMUNITY_SCREEN_LINK_MEMBER,
        CommunityLinkMember,
      )}
      {initStackNavigation(Stack, COMMUNITY_SCREEN_SEARCH, CommunitySearch)}
      {initStackNavigation(
        Stack,
        COMMUNITY_SCREEN_ARTICLE_DETIALS,
        CommunityArticleDetails,
      )}
      {initStackNavigation(
        Stack,
        COMMUNITY_PUBLISH_ARTICLES,
        CommunityPublishArticles,
      )}
    </>
  );
};
