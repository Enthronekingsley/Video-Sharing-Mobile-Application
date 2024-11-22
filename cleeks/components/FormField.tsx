import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants';

type Props = {
    title: string;
    value: any
    handleChangeText: any;
    otherStyles: string;
    keyboardType?: string;
    placeholder?: string
}

const FormField = ({ title, value, handleChangeText, otherStyles, keyboardType, placeholder } : Props) => {
    const [showPassword, setshowPassword] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>

      <View className='flex-row items-center w-full h-16 px-4 border-2 border-black-200 bg-black-100 rounded-2xl focus:border-secondary'>
        <TextInput 
            className='flex-1 text-base text-white font-psemibold'
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7b7b8b"
            onChangeText={handleChangeText}
            secureTextEntry={title === "Password" && !showPassword }
        />

        {title === "Password" && (
            <TouchableOpacity
              onPress={() => setshowPassword(!showPassword)}
            >
                <Image 
                    source={!showPassword ? icons.eye : icons.eyeHide as any}
                    className='w-6 h-6'
                    resizeMode='contain'
                />
            </TouchableOpacity>
        )}

      </View>
    </View>
  )
}

export default FormField