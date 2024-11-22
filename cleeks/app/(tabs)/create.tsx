import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, { useState } from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import { Video, ResizeMode } from "expo-av";
import { icons } from '@/constants';
import CustomButton from "@/components/CustomButton";

const Create = () => {
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: ''
  })

  const submit = () => {

  }

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView className='px-4 my-6'>
        <Text className={`text-2xl text-white font-psemibold`}>
          Upload Video
        </Text>

        <FormField
          handleChangeText={(e: any) => setForm({...form, title: e })}
          keyboardType=""
          otherStyles={`mt-10`}
          placeholder="Give your video a catchy title"
          title={`Video Title`}
          value={form.title}
        />

        <View className="space-y-2 mt-7">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
              />
            ) : (
              <View className="items-center justify-center w-full h-40 px-4 bg-black rounded-2xl">
                <View className="items-center justify-center border border-dashed w-14 h-14 border-secondary-100">
                  <Image
                    source={icons.upload as any}
                    resizeMode='contain'
                    className='w-1/2 h-1/2'
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="space-y-2 mt-7">
          <Text className="text-base text-gray-100 font-pmedium">Thumbnail Image</Text>

          <TouchableOpacity>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="flex-row items-center justify-center w-full h-16 px-4 space-x-2 bg-black border-2 rounded-2xl border-black-200">
                  <Image
                    source={icons.upload as any}
                    resizeMode='contain'
                    className='w-5 h-5'
                  />
                  <Text className='text-sm text-gray-100 font-pmedium'>Choose a file</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          handleChangeText={(e: any) => setForm({...form, prompt: e })}
          keyboardType=""
          otherStyles={`mt-7`}
          placeholder="The prompt you used to create this video"
          title={`AI Prompt`}
          value={form.prompt}
        />

        <CustomButton
          containerStyles="mt-7"
          handlePress={submit}
          isLoading={uploading}
          textStyles={``}
          title={`Submit & Publish`}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create

const styles = StyleSheet.create({})