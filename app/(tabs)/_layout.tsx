import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          elevation: 0,
          height: 70,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'الرئيسية' }} />
      <Tabs.Screen name="groups" options={{ title: 'الجروبات' }} />
      <Tabs.Screen name="messages" options={{ title: 'الرسائل' }} />
      <Tabs.Screen name="creator" options={{ title: 'المحتوى' }} />
      <Tabs.Screen name="accounts" options={{ title: 'الحسابات' }} />
      <Tabs.Screen name="settings" options={{ title: 'الإعدادات' }} />
      <Tabs.Screen name="campaigns" options={{ title: 'الحملات' }} />
    </Tabs>
  );
}