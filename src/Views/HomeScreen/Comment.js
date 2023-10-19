import React from 'react';
import {StyleSheet, Text, Vibration, View} from 'react-native';
import {} from '@gorhom/bottom-sheet';
import {HEIGHT_SCREEN, WIDTH_SCREEN} from '../FontScreen';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  damping,
} from 'react-native-reanimated';
export default function Comment() {
  const translationY = useSharedValue(0);

  const context=useSharedValue({y:0});

  const gesture = Gesture.Pan().onStart(()=>{
    context.value={y:translationY.value};
  }).onUpdate(event => {
    translationY.value = event.translationY+context.value.y;
  });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
        transform: [{translateY:translationY.value}]};
  });


  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
        <Text style={{color: 'red'}}>{HEIGHT_SCREEN}</Text>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: 500,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: 500 / 1.5,
    borderRadius: 25,
  },
});
