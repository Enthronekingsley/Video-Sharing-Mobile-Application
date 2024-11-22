import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { router, usePathname } from 'expo-router'
import { icons } from '@/constants';

const SearchInput = ({ initialQuery } : any) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || '')

  return (
    <View className='flex-row items-center w-full h-16 px-4 space-x-4 border-2 border-black-200 bg-black-100 rounded-2xl focus:border-secondary'>
      <TextInput 
        className='text-base mt-0.5 text-white flex-1 font-pregular'
        value={query}
        placeholder='Search for a video topic'
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if(!query) {
            return Alert.alert("Missing query", "Please input something to search results across database")
          }
          if(pathname.startsWith("/search")) router.setParams({ query })
            else router.push(`/search/${query}`)
        }}
      >
        <Image 
          source={icons.search as any}
          className='w-5 h-5'
          resizeMode='contain'
        />
      </TouchableOpacity>
    </View>
  )
}

export default SearchInput