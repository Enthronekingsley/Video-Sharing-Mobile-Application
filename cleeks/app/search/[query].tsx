import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import useApprite from '@/lib/useAppwrite';
import { searchPosts } from '@/lib/appwrite';
import VideoCard from '@/components/VideoCard';
import SearchInput from '@/components/SearchInput';
import EmptyState from '@/components/EmptyState';

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useApprite(() => searchPosts(query));

  useEffect(() => {
    refetch()
  }, [query])

  return (
    <SafeAreaView className='h-full bg-primary'>
      <FlatList 
        data={posts}
        keyExtractor={(item: any) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className='px-4 my-6'>
            <Text className='text-sm text-gray-100 font-pmedium'>Search Results</Text>

            <Text className='text-2xl text-white font-psemibold'>{query}</Text>

            <View className='mt-6 mb-8'>
              <SearchInput initialQuery={query} />
            </View>
          </View>
        )}

        ListEmptyComponent={() => (
          <EmptyState 
            title='No Videos Found'
            subtitle='No video found for this search query'
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Search