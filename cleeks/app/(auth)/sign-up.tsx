import { View, Text, SafeAreaView, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import images from '@/constants/images'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  })

  const submit = async () => {
    if(!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill in all the fields")
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username)

      setUser(result);
      setIsLoggedIn(true);
      
      router.replace("/home")
      
    } catch (error: any) {
      Alert.alert("Error", error.message)
    } finally {
      setIsSubmitting(false) 
    }
  }

  return (
    <SafeAreaView className='h-full bg-primary'>
      <ScrollView>
        <View className='justify-center w-full min-h-[95vh] px-4 my-6'>
        <View className='items-center justify-center'>
          <Image 
            source={images.cleeksIconBlue as any}
            resizeMode='contain' 
            className='w-[100px] h-[80px]'
          />
          <Text className='mt-5 text-2xl text-white text-semibold font-psemibold'>Signup to Cleeks</Text>
          </View>

        <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e: any) => setForm({...form, username: e})}
            otherStyles='mt-10'
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: any) => setForm({...form, email: e})}
            otherStyles='mt-7'
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: any) => setForm({...form, password: e})}
            otherStyles='mt-7'
          />

          <CustomButton 
            title="Sign Up"
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />

          <View className='flex-row justify-center gap-2 pt-5'>
            <Text className='text-lg text-gray-100 font-pregular'>Have an account already?</Text>
            <Link href="/sign-in" className='text-lg font-psemibold text-secondary'>Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp