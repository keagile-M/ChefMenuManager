// App.js
// Root component: wraps the app in the shared menu data provider
// and sets up navigation between the three screens.

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MenuProvider } from './context/MenuContext';
import MenuListScreen from './screens/MenuListScreen';
import MenuFormScreen from './screens/MenuFormScreen';
import StatisticsScreen from './screens/StatisticsScreen';
import { COLORS } from './theme';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: COLORS.primary },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: { fontWeight: '700' },
          }}
        >
          <Stack.Screen
            name="MenuList"
            component={MenuListScreen}
            options={{ title: "Chef's Menu Manager" }}
          />
          <Stack.Screen
            name="MenuForm"
            component={MenuFormScreen}
            options={({ route }) => ({
              title: route.params?.itemId ? 'Edit Menu Item' : 'Add Menu Item',
            })}
          />
          <Stack.Screen
            name="Statistics"
            component={StatisticsScreen}
            options={{ title: 'Menu Statistics' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}
