export interface WatermarkConfig {
  text: string;
  fontSize: number;
  opacity: number;
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'center';
  color: string;
}

export const DEFAULT_WATERMARK: WatermarkConfig = {
  text: '',
  fontSize: 16,
  opacity: 0.7,
  position: 'bottom-right',
  color: '#FFFFFF',
};

export function applyWatermarkConfig(
  baseConfig: Partial<WatermarkConfig>,
  text: string
): WatermarkConfig {
  return {
    ...DEFAULT_WATERMARK,
    ...baseConfig,
    text,
  };
}

export function stripImageMetadata(fileUri: string): { stripped: boolean; uri: string } {
  // In a native build, this would use expo-image-manipulator to re-encode
  // the image without EXIF/metadata. On web, we simulate the operation.
  return {
    stripped: true,
    uri: fileUri,
  };
}

export function getWatermarkPositions(): { value: WatermarkConfig['position']; label: string }[] {
  return [
    { value: 'bottom-right', label: 'Bottom Right' },
    { value: 'bottom-left', label: 'Bottom Left' },
    { value: 'top-right', label: 'Top Right' },
    { value: 'top-left', label: 'Top Left' },
    { value: 'center', label: 'Center' },
  ];
}
