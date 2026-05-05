import { useEffect, useMemo, useRef } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { onboardingColors } from './onboarding-theme';

const ROW_HEIGHT = 44;
const VISIBLE_ROWS = 5;
const PICKER_HEIGHT = ROW_HEIGHT * VISIBLE_ROWS;
const CENTER_PADDING = ROW_HEIGHT * Math.floor(VISIBLE_ROWS / 2);

type OnboardingNumberPickerProps = {
  value: number;
  unit: string;
  min: number;
  max: number;
  onChange: (value: number) => void;
};

export function OnboardingNumberPicker({
  value,
  unit,
  min,
  max,
  onChange,
}: OnboardingNumberPickerProps) {
  const listRef = useRef<FlatList<number>>(null);
  const values = useMemo(
    () => Array.from({ length: max - min + 1 }, (_, index) => min + index),
    [max, min]
  );
  const selectedIndex = Math.min(values.length - 1, Math.max(0, value - min));

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      listRef.current?.scrollToIndex({
        index: selectedIndex,
        animated: false,
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [selectedIndex]);

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const nextIndex = Math.min(
      values.length - 1,
      Math.max(0, Math.round(event.nativeEvent.contentOffset.y / ROW_HEIGHT))
    );
    const nextValue = values[nextIndex];

    if (nextValue !== value) {
      onChange(nextValue);
    }
  };

  return (
    <View style={styles.card}>
      <View pointerEvents="none" style={styles.selectionHighlight} />
      <FlatList
        ref={listRef}
        data={values}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => {
          const selected = item === value;

          return (
            <View style={styles.valueRow}>
              <Text style={[styles.valueText, selected && styles.valueTextSelected]}>{item}</Text>
              {selected ? <Text style={styles.unit}>{unit}</Text> : null}
            </View>
          );
        }}
        getItemLayout={(_, index) => ({
          length: ROW_HEIGHT,
          offset: ROW_HEIGHT * index,
          index,
        })}
        initialScrollIndex={selectedIndex}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        onScrollToIndexFailed={({ index }) => {
          requestAnimationFrame(() => {
            listRef.current?.scrollToIndex({ index, animated: false });
          });
        }}
        snapToInterval={ROW_HEIGHT}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 228,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: onboardingColors.card,
    overflow: 'hidden',
  },
  selectionHighlight: {
    position: 'absolute',
    left: 16,
    right: 16,
    top: 92,
    height: ROW_HEIGHT,
    borderRadius: 12,
    backgroundColor: onboardingColors.background,
  },
  list: {
    height: PICKER_HEIGHT,
    alignSelf: 'stretch',
    zIndex: 1,
  },
  listContent: {
    paddingVertical: CENTER_PADDING,
  },
  valueRow: {
    height: ROW_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueText: {
    color: onboardingColors.mutedText,
    fontSize: 17,
    fontWeight: '500',
    lineHeight: ROW_HEIGHT,
    letterSpacing: 0,
    textAlign: 'center',
  },
  unit: {
    position: 'absolute',
    right: 32,
    color: onboardingColors.primaryText,
    fontSize: 15,
    lineHeight: ROW_HEIGHT,
    letterSpacing: 0,
  },
  valueTextSelected: {
    color: onboardingColors.primaryText,
    fontSize: 20,
    fontWeight: '600',
  },
});
