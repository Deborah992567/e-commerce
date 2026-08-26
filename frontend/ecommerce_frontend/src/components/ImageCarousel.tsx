import React, {useState, useRef, useCallback} from 'react';
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleSheet,
} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

interface ImageCarouselProps {
  images: string[];
  height?: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({images, height = 300}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const contentOffset = event.nativeEvent.contentOffset.x;
      const index = Math.round(contentOffset / SCREEN_WIDTH);
      setActiveIndex(index);
    },
    [],
  );

  return (
    <View style={[styles.container, {height}]}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        snapToInterval={SCREEN_WIDTH}
        decelerationRate="fast">
        {images.map((uri, index) => (
          <Image
            key={index}
            source={{uri}}
            style={[styles.image, {width: SCREEN_WIDTH, height}]}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      <View style={styles.dotsContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A1A2E',
  },
  image: {
    backgroundColor: '#2D2D38',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 12,
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    backgroundColor: '#FF5722',
  },
  inactiveDot: {
    backgroundColor: '#2D2D38',
  },
});

export default ImageCarousel;
