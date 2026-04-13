export const COLORS = {
  primary: '#FF6B35',       // Saffron
  primaryLight: '#FF8C5A',
  primaryDark: '#E55A2B',
  secondary: '#2D6A4F',     // Deep Green
  secondaryLight: '#40916C',
  accent: '#FFB347',        // Golden
  background: '#F8F9FA',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  text: '#1A1A2E',
  textSecondary: '#6C757D',
  textLight: '#ADB5BD',
  border: '#E9ECEF',
  error: '#DC3545',
  warning: '#FFC107',
  success: '#28A745',
  info: '#17A2B8',
  heart: '#E74C3C',
  temp: '#3498DB',
  spo2: '#2ECC71',
  stress: '#E67E22',
  vata: '#7B68EE',          // Medium Slate Blue
  pitta: '#FF6347',         // Tomato Red
  kapha: '#32CD32',         // Lime Green
  gradient: {
    primary: ['#FF6B35', '#FF8C5A'],
    saffron: ['#FF6B35', '#FFB347'],
    green: ['#2D6A4F', '#40916C'],
    health: ['#28A745', '#20C997'],
    danger: ['#DC3545', '#E74C3C'],
    blue: ['#17A2B8', '#3498DB'],
  },
  bmi: {
    underweight: '#3498DB',
    normal: '#28A745',
    overweight: '#FF8C00',
    obese: '#DC3545',
  },
};

export const FONTS = {
  regular: { fontSize: 14, color: COLORS.text },
  medium: { fontSize: 16, fontWeight: '500', color: COLORS.text },
  bold: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  title: { fontSize: 24, fontWeight: '700', color: COLORS.text },
  subtitle: { fontSize: 18, fontWeight: '600', color: COLORS.text },
  caption: { fontSize: 12, color: COLORS.textSecondary },
  small: { fontSize: 11, color: COLORS.textLight },
};

export const SIZES = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  borderRadius: 12,
  borderRadiusLg: 20,
  borderRadiusFull: 50,
  cardPadding: 16,
  screenPadding: 20,
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};
