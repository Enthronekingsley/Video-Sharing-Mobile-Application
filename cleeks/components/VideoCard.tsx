import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import { icons } from "@/constants";
import { ResizeMode, Video } from "expo-av";
import { useVideoPlayer, VideoView } from "expo-video";

const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  },
}: any) => {
  const [play, setPlay] = useState(false);
  const videoRef = useRef(null);

  const videoSource = "https://player.vimeo.com/video/949620200?h=d60220d68d";

  const player = useVideoPlayer(video, (player: any) => {
    player.loop = true;
    player.play();
  });

  // console.log("Video: ", video);

  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row items-start gap-3">
        <View className="flex flex-row items-center justify-center flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-sm text-white font-psemibold"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image
            source={icons.menu as any}
            className="w-5 h-5"
            resizeMode="contain"
          />
        </View>
      </View>

      {play ? (
        <Video
          ref={videoRef}
          source={{ uri: video }}
          className="w-full mt-3 h-60 rounded-xl"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls={true}
          isLooping
          shouldPlay={true}
          onPlaybackStatusUpdate={(status) => {
            if (status) {
              setPlay(false);
            }
          }}
        />
      ) : (
        // <VideoView
        //   player={player}
        //   className="w-full mt-3 h-60 rounded-xl"
        //   allowsFullscreen
        //   allowsPictureInPicture
        // />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="relative items-center justify-center w-full mt-3 h-60 rounded-xl"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full mt-3 rounded-xl"
            resizeMode="cover"
          />
          <Image
            source={icons.play as any}
            className="absolute w-12 h-12"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
