import { View, Text, Image, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { Redirect, router } from 'expo-router'
import { images } from '@/constants'
import { StatusBar } from 'expo-status-bar'
import { useGlobalContext } from '@/context/GlobalProvider'
import CustomButton from '@/components/CustomButton'

const Home = () => {

  const { isLoading, isLoggedIn } = useGlobalContext();

  if(!isLoading && isLoggedIn) return <Redirect href="/home" />



  return (
    <SafeAreaView className='h-full bg-primary'>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className='items-center justify-center w-full min-h-[80vh] px-4'>
            <Image 
              source={images.cleeksLogo as any} 
              className='w-[167px] h-[89px]'
              resizeMode='contain'
            />

          <CustomButton 
            title='Continue with Email'
            handlePress={() => router.push("/sign-in")}
            containerStyles='w-full mt-7'
          />
        </View>
        
      </ScrollView>
      <View className='min-h-[10vh] items-center justify-center mb-5'>
            <Image 
              source={images.enthronestackLogo as any}
              className='w-[167px] h-[89px]'
              resizeMode='contain'
            />
        </View>

      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>
  )
}

export default Home