import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  registrationData: {},
  registrationStep: 0,
  userType: 'patient', // 'patient' or 'family_member'
  prakritiResult: null,
  healthMetrics: null,
  diseaseRisks: null,
  doshaBalance: null,
  alerts: [],
  recommendations: [],
  healthScore: 0,
  familyMembers: [],
  leaderboard: [],
  socialFeed: [],
  chatMessages: [],
  dinacharya: {},
  meals: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: !!action.payload, isLoading: false };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_USER_TYPE':
      return { ...state, userType: action.payload };
    case 'SET_REGISTRATION_DATA':
      return { ...state, registrationData: { ...state.registrationData, ...action.payload } };
    case 'SET_REGISTRATION_STEP':
      return { ...state, registrationStep: action.payload };
    case 'SET_PRAKRITI_RESULT':
      return { ...state, prakritiResult: action.payload };
    case 'SET_HEALTH_METRICS':
      return { ...state, healthMetrics: action.payload };
    case 'SET_DISEASE_RISKS':
      return { ...state, diseaseRisks: action.payload };
    case 'SET_DOSHA_BALANCE':
      return { ...state, doshaBalance: action.payload };
    case 'SET_ALERTS':
      return { ...state, alerts: action.payload };
    case 'SET_RECOMMENDATIONS':
      return { ...state, recommendations: action.payload };
    case 'SET_HEALTH_SCORE':
      return { ...state, healthScore: action.payload };
    case 'SET_FAMILY_MEMBERS':
      return { ...state, familyMembers: action.payload };
    case 'SET_LEADERBOARD':
      return { ...state, leaderboard: action.payload };
    case 'SET_SOCIAL_FEED':
      return { ...state, socialFeed: action.payload };
    case 'ADD_CHAT_MESSAGE':
      return { ...state, chatMessages: [...state.chatMessages, action.payload] };
    case 'SET_DINACHARYA':
      return { ...state, dinacharya: action.payload };
    case 'SET_MEALS':
      return { ...state, meals: action.payload };
    case 'LOGOUT':
      return { ...initialState, isLoading: false };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('ayurtwin_user');
      if (userData) {
        dispatch({ type: 'SET_USER', payload: JSON.parse(userData) });
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } catch {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const login = async (userData) => {
    await AsyncStorage.setItem('ayurtwin_user', JSON.stringify(userData));
    dispatch({ type: 'SET_USER', payload: userData });
  };

  const logout = async () => {
    await AsyncStorage.removeItem('ayurtwin_user');
    dispatch({ type: 'LOGOUT' });
  };

  const updateRegistration = (data) => {
    dispatch({ type: 'SET_REGISTRATION_DATA', payload: data });
  };

  return (
    <AppContext.Provider value={{ state, dispatch, login, logout, updateRegistration }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
