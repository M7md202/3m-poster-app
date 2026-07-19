import React from 'react';
import { Tabs, useRouter, usePathname } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LayoutDashboard, Grid, MessageSquare, Edit3, Users, Settings, Activity } from 'lucide-react-native';

function CustomTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (route: string) => {
    if (route === '/' && pathname === '/') return true;
    if (route !== '/' && pathname.includes(route)) return true;
    return false;
  };

  return (
    <View style={styles.premiumBottomTabBarContainer}>
      {/* 1. الرئيسية */}
      <TouchableOpacity style={[styles.tabBarItemBtn, isActive('/') && styles.tabBarItemBtnActive]} onPress={() => router.replace('/')}>
        <View style={isActive('/') ? styles.activeIconBubbleGlow : null}>
          <LayoutDashboard size={18} color={isActive('/') ? '#fff' : '#94a3b8'} />
        </View>
        <Text style={[styles.tabBarItemText, isActive('/') && styles.tabBarItemTextActive]}>الرئيسية</Text>
      </TouchableOpacity>

      {/* 2. الحملات */}
      <TouchableOpacity style={[styles.tabBarItemBtn, isActive('campaigns') && styles.tabBarItemBtnActive]} onPress={() => router.replace('/campaigns')}>
        <View style={isActive('campaigns') ? styles.activeIconBubbleGlow : null}>
          <Activity size={18} color={isActive('campaigns') ? '#fff' : '#94a3b8'} />
        </View>
        <Text style={[styles.tabBarItemText, isActive('campaigns') && styles.tabBarItemTextActive]}>الحملات</Text>
      </TouchableOpacity>

      {/* 3. الحسابات */}
      <TouchableOpacity style={[styles.tabBarItemBtn, isActive('accounts') && styles.tabBarItemBtnActive]} onPress={() => router.replace('/accounts')}>
        <View style={isActive('accounts') ? styles.activeIconBubbleGlow : null}>
          <Users size={18} color={isActive('accounts') ? '#fff' : '#94a3b8'} />
        </View>
        <Text style={[styles.tabBarItemText, isActive('accounts') && styles.tabBarItemTextActive]}>الحسابات</Text>
      </TouchableOpacity>

      {/* 4. المحتوى */}
      <TouchableOpacity style={[styles.tabBarItemBtn, isActive('creator') && styles.tabBarItemBtnActive]} onPress={() => router.replace('/creator')}>
        <View style={isActive('creator') ? styles.activeIconBubbleGlow : null}>
          <Edit3 size={18} color={isActive('creator') ? '#fff' : '#94a3b8'} />
        </View>
        <Text style={[styles.tabBarItemText, isActive('creator') && styles.tabBarItemTextActive]}>المحتوى</Text>
      </TouchableOpacity>

      {/* 5. الجروبات */}
      <TouchableOpacity style={[styles.tabBarItemBtn, isActive('groups') && styles.tabBarItemBtnActive]} onPress={() => router.replace('/groups')}>
        <View style={isActive('groups') ? styles.activeIconBubbleGlow : null}>
          <Grid size={18} color={isActive('groups') ? '#fff' : '#94a3b8'} />
        </View>
        <Text style={[styles.tabBarItemText, isActive('groups') && styles.tabBarItemTextActive]}>الجروبات</Text>
      </TouchableOpacity>

      {/* 6. الرسائل */}
      <TouchableOpacity style={[styles.tabBarItemBtn, isActive('inbox') && styles.tabBarItemBtnActive]} onPress={() => router.replace('/inbox')}>
        <View style={styles.tabBadgeCounterFloating}><Text style={styles.tabBadgeCounterText}>3</Text></View>
        <View style={isActive('inbox') ? styles.activeIconBubbleGlow : null}>
          <MessageSquare size={18} color={isActive('inbox') ? '#fff' : '#94a3b8'} />
        </View>
        <Text style={[styles.tabBarItemText, isActive('inbox') && styles.tabBarItemTextActive]}>الرسائل</Text>
      </TouchableOpacity>

      {/* 7. الإعدادات */}
      <TouchableOpacity style={[styles.tabBarItemBtn, isActive('settings') && styles.tabBarItemBtnActive]} onPress={() => router.replace('/settings')}>
        <View style={isActive('settings') ? styles.activeIconBubbleGlow : null}>
          <Settings size={18} color={isActive('settings') ? '#fff' : '#94a3b8'} />
        </View>
        <Text style={[styles.tabBarItemText, isActive('settings') && styles.tabBarItemTextActive]}>الإعدادات</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <View style={styles.rootSafeContainer}>
      <Tabs 
        screenOptions={{ 
          headerShown: false,
          // تصفير ومحو كامل لأي أثر برامجي للشريط الافتراضي على أندرويد
          tabBarStyle: { 
            display: 'none', 
            position: 'absolute', 
            height: 0, 
            opacity: 0, 
            elevation: 0,
            shadowOpacity: 0
          } 
        }}
        tabBar={() => null} 
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="campaigns" />
        <Tabs.Screen name="accounts" />
        <Tabs.Screen name="creator" />
        <Tabs.Screen name="groups" />
        <Tabs.Screen name="inbox" />
        <Tabs.Screen name="settings" />
      </Tabs>

      <CustomTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  rootSafeContainer: { flex: 1, backgroundColor: '#f8fafc', position: 'relative' },
  premiumBottomTabBarContainer: { 
    position: 'absolute', bottom: 15, left: 12, right: 12, 
    backgroundColor: 'rgba(255, 255, 255, 0.96)', flexDirection: 'row-reverse', 
    justifyContent: 'space-around', alignItems: 'center', paddingVertical: 8, 
    borderRadius: 24, borderWidth: 1, borderColor: 'rgba(226, 232, 240, 0.8)', 
    shadowColor: '#1e3a8a', shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.15, shadowRadius: 16, elevation: 8 
  },
  tabBarItemBtn: { flex: 1, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  tabBarItemBtnActive: { transform: [{ translateY: -4 }] },
  activeIconBubbleGlow: {
    backgroundColor: '#1e3a8a', padding: 10, borderRadius: 16,
    shadowColor: '#2563eb', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 4,
  },
  tabBarItemText: { fontSize: 10, fontWeight: '500', color: '#94a3b8', marginTop: 4 },
  tabBarItemTextActive: { color: '#1e3a8a', fontWeight: 'bold' },
  tabBadgeCounterFloating: {
    position: 'absolute', top: -5, right: 8, backgroundColor: '#d946ef', borderRadius: 10, minWidth: 15, height: 15, justifyContent: 'center', alignItems: 'center', zIndex: 10, paddingHorizontal: 3,
  },
  tabBadgeCounterText: { color: '#fff', fontSize: 9, fontWeight: 'bold' }
});