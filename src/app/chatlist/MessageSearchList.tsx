import React from 'react';
import { Text } from 'react-native';
import {FlatList, StyleSheet, View} from 'react-native';

import MessageSearchItem from "./MessageSearchItem";
import {IChannelListPreview} from "../../hook/usePaginatedSearchedMessages";

const styles = StyleSheet.create({
  contentContainer: {flexGrow: 1},
  date: {
    fontSize: 12,
    marginLeft: 2,
    textAlign: 'right',
  },
  detailsText: {fontSize: 12},
  flex: {flex: 1},
  indicatorContainer: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  itemContainer: {
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  message: {
    flexShrink: 1,
    fontSize: 12,
  },
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 8,
  },
  title: {fontSize: 14, fontWeight: '700'},
  titleContainer: {
    maxWidth: 80 - 16 - 40,
  },
});

type MessageSearchListProps = {
  EmptySearchIndicator: React.ComponentType;
  loading: boolean;
  loadMore: () => void;
  messages: IChannelListPreview[];
  refreshing: boolean;
  refreshList: () => void;
  empty: boolean;
};

export const MessageSearchList: React.FC<MessageSearchListProps> = ({
    EmptySearchIndicator,
    loading,
    loadMore,
    messages,
    refreshing,
    refreshList,
    empty
}) => {


  if (loading && !refreshing && (!messages || messages.length === 0) && !empty) {
    return (
      <View
        style={[
          styles.indicatorContainer,
        ]}>
        <Text>loading...</Text>
      </View>
    );
  }
  if (!messages && !refreshing) {
    return null;
  }

  return (
    <>
      <FlatList
        contentContainerStyle={[
          styles.contentContainer,
        ]}
        // TODO: Remove the following filter once we have two way scroll functionality on threads.
        data={messages}
        ListEmptyComponent={EmptySearchIndicator}
        keyboardDismissMode="on-drag"
        onEndReached={loadMore}
        onRefresh={refreshList}
        refreshing={refreshing}
        renderItem={({item}) => (
          <MessageSearchItem item={item} />
        )}
        style={styles.flex}
      />
    </>
  );
};
