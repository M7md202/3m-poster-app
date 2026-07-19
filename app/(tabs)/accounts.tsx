import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  TextInput, 
  Modal, 
  Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Plus, 
  Key, 
  ShieldCheck, 
  Trash2, 
  User, 
  Code, 
  Mail, 
  Shield,
  Zap,
  Clock,
  Globe // أيقونة البروكسي العالمية والشبكات
} from 'lucide-react-native';

const initialAccounts = [
  { id: '1', name: 'Mohamed Ali (الحساب الأساسي)', fbId: '1000847291039', status: 'active', type: 'Token', groupsCount: 85, shadowban: 'safe', throttleMode: 'safe', proxy: '185.230.124.5:3128' },
  { id: '2', name: '3M Marketing Node 1', fbId: '1000928374112', status: 'checkpoint', type: 'Cookies', groupsCount: 60, shadowban: 'checking', throttleMode: 'balanced', proxy: '195.201.45.122:8080' },
  { id: '3', name: 'حساب النشر الاحتياطي', fbId: '1000374829102', status: 'disabled', type: 'Credentials', groupsCount: 0, shadowban: 'banned', throttleMode: 'aggressive', proxy: 'none' },
];

export default function AccountsScreen() {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [modalVisible, setModalVisible] = useState(false);
  
  const [authType, setAuthType] = useState<'token' | 'cookies' | 'credentials'>('token');
  const [inputData, setInputData] = useState('');
  const [accountName, setAccountName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [proxyInput, setProxyInput] = useState(''); // حقل البروكسي الجديد

  const handleChangeThrottle = (id: string, mode: 'safe' | 'balanced' | 'aggressive') => {
    setAccounts(prev => prev.map(acc => {
      if (acc.id === id) {
        return { ...acc, throttleMode: mode };
      }
      return acc;
    }));
  };

  const handleCheckShadowban = (id: string) => {
    setAccounts(prev => prev.map(acc => {
      if (acc.id === id) {
        return { ...acc, shadowban: acc.shadowban === 'safe' ? 'banned' : 'safe' };
      }
      return acc;
    }));
  };

  const handleDeleteAccount = (id: string) => {
    setAccounts(prev => prev.filter(acc => acc.id !== id));
  };

  const handleAddAccount = () => {
    if (authType === 'credentials' && (!email || !password)) return;
    if (authType !== 'credentials' && !inputData) return;

    const newAcc = {
      id: Date.now().toString(),
      name: accountName || (authType === 'credentials' ? email : 'حساب فيسبوك جديد'),
      fbId: Math.floor(1000000000000 + Math.random() * 9000000000000).toString(),
      status: 'active',
      type: authType === 'token' ? 'Token' : authType === 'cookies' ? 'Cookies' : 'Credentials',
      groupsCount: Math.floor(10 + Math.random() * 100),
      shadowban: 'safe',
      throttleMode: 'safe',
      proxy: proxyInput.trim() || 'none' // حفظ البروكسي أو تعيينه لاتصال مباشر
    };

    setAccounts([...accounts, newAcc]);
    setInputData('');
    setAccountName('');
    setEmail('');
    setPassword('');
    setProxyInput('');
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>إدارة حسابات الفيسبوك</Text>
        <Text style={styles.headerSubtitle}>ربط وتأمين الحسابات وعرض صلاحيات الـ Access Tokens</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <TouchableOpacity style={styles.addAccountBtn} onPress={() => setModalVisible(true)}>
          <Plus size={20} color="#fff" />
          <Text style={styles.addAccountBtnText}>ربط حساب فيسبوك جديد</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>الحسابات النشطة والمربوطة بالمنصة ({accounts.length})</Text>
        
        {accounts.map((account) => (
          <View key={account.id} style={[
            styles.accountCard,
            account.status === 'disabled' && { borderColor: '#fecaca' },
            account.status === 'checkpoint' && { borderColor: '#fef08a' }
          ]}>
            <View style={styles.cardTopRow}>
              <View style={styles.accountInfoMain}>
                <View style={styles.avatarPlaceholder}>
                  <User size={20} color="#64748b" />
                </View>
                <View style={{ alignItems: 'flex-end', marginRight: 10 }}>
                  <Text style={styles.accountName}>{account.name}</Text>
                  <Text style={styles.fbIdText}>ID: {account.fbId} ({account.type})</Text>
                </View>
              </View>

              <View style={[
                styles.statusBadge,
                account.status === 'active' && { backgroundColor: '#f0fdf4' },
                account.status === 'checkpoint' && { backgroundColor: '#fefdf0' },
                account.status === 'disabled' && { backgroundColor: '#fef2f2' },
              ]}>
                <Text style={[
                  styles.statusBadgeText,
                  account.status === 'active' && { color: '#16a34a' },
                  account.status === 'checkpoint' && { color: '#ca8a04' },
                  account.status === 'disabled' && { color: '#dc2626' },
                ]}>
                  {account.status === 'active' && 'نشط وجاهز'}
                  {account.status === 'checkpoint' && 'Checkpoint'}
                  {account.status === 'disabled' && 'مرفوض / منتهي'}
                </Text>
              </View>
            </View>

            <View style={styles.cardDetailsRow}>
              <Text style={styles.detailsText}>الجروبات المستخرجة: <Text style={{fontWeight:'bold', color:'#0f172a'}}>{account.groupsCount}</Text></Text>
              
              <View style={styles.shadowbanRow}>
                <Text style={styles.detailsText}>حالة الحظر الفني: </Text>
                <Text style={[
                  styles.shadowbanStatusText,
                  account.shadowban === 'safe' && { color: '#16a34a' },
                  account.shadowban === 'banned' && { color: '#dc2626' },
                  account.shadowban === 'checking' && { color: '#ca8a04' },
                ]}>
                  {account.shadowban === 'safe' && 'آمن ومستقر'}
                  {account.shadowban === 'banned' && 'مقيد (Shadowban)'}
                  {account.shadowban === 'checking' && 'جاري الفحص...'}
                </Text>
              </View>
            </View>

            {/* ================= ميزة البروكسي المخصص المضافة ================= */}
            <View style={styles.proxyRowContainer}>
              <View style={styles.proxyHeaderInline}>
                <Globe size={13} color="#2563eb" style={{ marginLeft: 5 }} />
                <Text style={styles.proxyTitleText}>اتصال الـ Proxy المخصص:</Text>
              </View>
              <Text style={[
                styles.proxyValueText, 
                account.proxy === 'none' ? { color: '#64748b' } : { color: '#0284c7', fontWeight: 'bold' }
              ]}>
                {account.proxy === 'none' ? 'اتصال مباشر بدون بروكسي (خطر) ⚠️' : account.proxy}
              </Text>
            </View>

            {/* مُحدد الأمان ومكافحة الحظر */}
            <View style={styles.throttleContainer}>
              <Text style={styles.throttleTitle}>🛡️ مُحدد الأمان الذكي ومكافحة الحظر:</Text>
              
              <View style={styles.throttleButtonsRow}>
                <TouchableOpacity 
                  style={[styles.throttleBtn, account.throttleMode === 'aggressive' && styles.btnAggressiveActive]}
                  onPress={() => handleChangeThrottle(account.id, 'aggressive')}
                >
                  <Zap size={12} color={account.throttleMode === 'aggressive' ? '#fff' : '#ef4444'} style={{marginLeft: 4}} />
                  <Text style={[styles.throttleBtnText, account.throttleMode === 'aggressive' && {color: '#fff'}]}>هجومي</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.throttleBtn, account.throttleMode === 'balanced' && styles.btnBalancedActive]}
                  onPress={() => handleChangeThrottle(account.id, 'balanced')}
                >
                  <Clock size={12} color={account.throttleMode === 'balanced' ? '#fff' : '#f97316'} style={{marginLeft: 4}} />
                  <Text style={[styles.throttleBtnText, account.throttleMode === 'balanced' && {color: '#fff'}]}>متوازن</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.throttleBtn, account.throttleMode === 'safe' && styles.btnSafeActive]}
                  onPress={() => handleChangeThrottle(account.id, 'safe')}
                >
                  <Shield size={12} color={account.throttleMode === 'safe' ? '#fff' : '#16a34a'} style={{marginLeft: 4}} />
                  <Text style={[styles.throttleBtnText, account.throttleMode === 'safe' && {color: '#fff'}]}>آمن جداً</Text>
                </TouchableOpacity>
              </View>

              <Text style={[
                styles.throttleDescription,
                account.throttleMode === 'safe' && { color: '#16a34a' },
                account.throttleMode === 'balanced' && { color: '#f97316' },
                account.throttleMode === 'aggressive' && { color: '#ef4444', fontWeight: 'bold' },
              ]}>
                {account.throttleMode === 'safe' && '• فاصل زمني عشوائي (5-7 دقائق). يحاكي السلوك البشري 100% ويحمي حسابك.'}
                {account.throttleMode === 'balanced' && '• فاصل زمني متوسط (2-3 دقائق). مناسب للحسابات القديمة والمؤكدة هاتفياً.'}
                {account.throttleMode === 'aggressive' && '• تحذير: فاصل سريع جداً (30 ثانية). قد يعرض الحساب للتقييد الفوري من فيسبوك!'}
              </Text>
            </View>

            <View style={styles.cardActionsRow}>
              <TouchableOpacity 
                style={[styles.actionBtn, { backgroundColor: '#eff6ff' }]}
                onPress={() => handleCheckShadowban(account.id)}
              >
                <ShieldCheck size={14} color="#2563eb" style={{marginLeft: 4}} />
                <Text style={[styles.actionBtnText, {color: '#2563eb'}]}>فحص الأمان والقيود</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.actionBtn, { backgroundColor: '#fef2f2' }]}
                onPress={() => handleDeleteAccount(account.id)}
              >
                <Trash2 size={14} color="#ef4444" style={{marginLeft: 4}} />
                <Text style={[styles.actionBtnText, {color: '#ef4444'}]}>حذف الحساب</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>ربط حساب فيسبوك جديد بالمنصة</Text>
            
            <TextInput 
              style={styles.modalInput} 
              placeholder="اسم تعريفي للحساب (اختياري)"
              placeholderTextColor="#94a3b8"
              value={accountName}
              onChangeText={setAccountName}
            />

            <View style={styles.tabSwitchRow}>
              <TouchableOpacity 
                style={[styles.tabSwitchBtn, authType === 'credentials' && styles.tabSwitchActive]} 
                onPress={() => setAuthType('credentials')}
              >
                <Mail size={13} color={authType === 'credentials' ? '#fff' : '#64748b'} style={{marginLeft: 4}} />
                <Text style={[styles.tabSwitchText, authType === 'credentials' && {color: '#fff'}]}>بريد وباسورد</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.tabSwitchBtn, authType === 'cookies' && styles.tabSwitchActive]} 
                onPress={() => setAuthType('cookies')}
              >
                <Code size={13} color={authType === 'cookies' ? '#fff' : '#64748b'} style={{marginLeft: 4}} />
                <Text style={[styles.tabSwitchText, authType === 'cookies' && {color: '#fff'}]}>Cookies</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.tabSwitchBtn, authType === 'token' && styles.tabSwitchActive]} 
                onPress={() => setAuthType('token')}
              >
                <Key size={13} color={authType === 'token' ? '#fff' : '#64748b'} style={{marginLeft: 4}} />
                <Text style={[styles.tabSwitchText, authType === 'token' && {color: '#fff'}]}>Token</Text>
              </TouchableOpacity>
            </View>

            {authType === 'credentials' ? (
              <View style={{ width: '100%' }}>
                <TextInput 
                  style={styles.modalInput} 
                  placeholder="البريد الإلكتروني أو رقم الهاتف"
                  placeholderTextColor="#94a3b8"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TextInput 
                  style={styles.modalInput} 
                  placeholder="كلمة سر الفيسبوك (Password)"
                  placeholderTextColor="#94a3b8"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
            ) : (
              <TextInput
                style={[styles.modalInput, styles.textAreaInput]}
                multiline={true}
                numberOfLines={4}
                placeholder={authType === 'token' ? 'ضع هنا الـ Access Token (EAAB...)' : 'ضع هنا نص الـ Cookies بالكامل المستخرج من المتصفح'}
                placeholderTextColor="#94a3b8"
                value={inputData}
                onChangeText={setInputData}
              />
            )}

            {/* حقل إدخال البروكسي الاختياري الجديد داخل المودال */}
            <TextInput 
              style={styles.modalInput} 
              placeholder="إدخال Proxy مخصص (اختياري IP:Port)"
              placeholderTextColor="#94a3b8"
              value={proxyInput}
              onChangeText={setProxyInput}
              autoCapitalize="none"
            />

            <View style={styles.modalActions}>
              <TouchableOpacity style={[styles.modalBtn, styles.modalSubmitBtn]} onPress={handleAddAccount}>
                <Text style={styles.modalBtnTextContainer}>تأكيد الربط والتحقق</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.modalBtn, styles.modalCancelBtn]} onPress={() => setModalVisible(false)}>
                <Text style={[styles.modalBtnTextContainer, {color: '#64748b'}]}>إلغاء</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    alignItems: 'flex-end',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
    textAlign: 'right',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  addAccountBtn: {
    flexDirection: 'row-reverse',
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  addAccountBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 8,
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'right',
    marginBottom: 15,
  },
  accountCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
  },
  cardTopRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingBottom: 12,
  },
  accountInfoMain: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 38,
    height: 38,
    borderRadius: 50,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  fbIdText: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  cardDetailsRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  detailsText: {
    fontSize: 12,
    color: '#475569',
  },
  shadowbanRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  shadowbanStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  /* تنسيق قسم البروكسي المخصص داخل الكارت */
  proxyRowContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f6ff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#dbeafe',
  },
  proxyHeaderInline: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  proxyTitleText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#1e40af',
  },
  proxyValueText: {
    fontSize: 12,
  },
  throttleContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  throttleTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#334155',
    textAlign: 'right',
    marginBottom: 10,
  },
  throttleButtonsRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  throttleBtn: {
    flex: 1,
    flexDirection: 'row-reverse',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingVertical: 6,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
  },
  btnSafeActive: {
    backgroundColor: '#16a34a',
    borderColor: '#16a34a',
  },
  btnBalancedActive: {
    backgroundColor: '#f97316',
    borderColor: '#f97316',
  },
  btnAggressiveActive: {
    backgroundColor: '#ef4444',
    borderColor: '#ef4444',
  },
  throttleBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  throttleDescription: {
    fontSize: 10.5,
    textAlign: 'right',
    lineHeight: 15,
    marginTop: 4,
  },
  cardActionsRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 12,
    marginTop: 10,
  },
  actionBtn: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 10,
  },
  actionBtnText: {
    fontSize: 11,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: Dimensions.get('window').width - 40,
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalInput: {
    width: '100%',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: '#0f172a',
    textAlign: 'right',
    marginBottom: 15,
  },
  tabSwitchRow: {
    flexDirection: 'row-reverse',
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
    padding: 4,
    marginBottom: 15,
  },
  tabSwitchBtn: {
    flex: 1,
    flexDirection: 'row-reverse',
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  tabSwitchActive: {
    backgroundColor: '#2563eb',
  },
  tabSwitchText: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '600',
  },
  textAreaInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalActions: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center', // مصلحة وشغالة 100% بدون أخطاء
    alignItems: 'center',
  },
  modalSubmitBtn: {
    backgroundColor: '#2563eb',
    marginLeft: 10,
  },
  modalCancelBtn: {
    backgroundColor: '#f1f5f9',
  },
  modalBtnTextContainer: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff',
  },
});