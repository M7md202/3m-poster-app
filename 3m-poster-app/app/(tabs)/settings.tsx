import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  Switch,
  Modal,
  TextInput,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Globe, 
  ShieldAlert, 
  FileDown, 
  Info, 
  Check, 
  Wifi, 
  Plus, 
  Fingerprint, 
  Image as ImageIcon, 
  FileSpreadsheet, 
  FileText,
  X,
  Trash2,
  ShieldCheck
} from 'lucide-react-native';

export default function SettingsScreen() {
  // 1. Language State
  const [selectedLanguage, setSelectedLanguage] = useState<'ar' | 'en'>('ar');

  // 2. Proxy State
  const [proxies, setProxies] = useState<{ id: string, address: string }[]>([]);
  const [isProxyModalVisible, setIsProxyModalVisible] = useState(false);
  const [newProxyIP, setNewProxyIP] = useState('');
  const [newProxyPort, setNewProxyPort] = useState('');

  // 3. Security Settings State
  const [biometricLock, setBiometricLock] = useState(false);
  const [stripMetadata, setStripMetadata] = useState(true);

  // 4. Export Reports State
  const [autoExport, setAutoExport] = useState(false);
  const [exportFormat, setExportFormat] = useState<'csv' | 'pdf'>('csv');

  // إضافة بروكسي جديد
  const handleAddProxy = () => {
    if (!newProxyIP || !newProxyPort) {
      Alert.alert('خطأ', 'برجاء إدخال الـ IP والـ Port بشكل صحيح.');
      return;
    }
    const newProxy = { id: Math.random().toString(), address: `${newProxyIP}:${newProxyPort}` };
    setProxies([...proxies, newProxy]);
    setIsProxyModalVisible(false);
    setNewProxyIP('');
    setNewProxyPort('');
  };

  const removeProxy = (id: string) => {
    setProxies(proxies.filter(p => p.id !== id));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>إعدادات التطبيق (Settings)</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* ================= 1. Language Section ================= */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Globe size={18} color="#1e3a8a" style={{ marginLeft: 8 }} />
            <Text style={styles.sectionTitle}>لغة الواجهة (Language)</Text>
          </View>

          <TouchableOpacity 
            style={[styles.languageOptionBtn, selectedLanguage === 'ar' && styles.languageOptionActive]} 
            onPress={() => setSelectedLanguage('ar')}
          >
            <Text style={[styles.languageText, selectedLanguage === 'ar' && styles.languageTextActive]}>العربية (Arabic)</Text>
            {selectedLanguage === 'ar' && <Check size={16} color="#2563eb" />}
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.languageOptionBtn, selectedLanguage === 'en' && styles.languageOptionActive]} 
            onPress={() => setSelectedLanguage('en')}
          >
            <Text style={[styles.languageText, selectedLanguage === 'en' && styles.languageTextActive]}>English</Text>
            {selectedLanguage === 'en' && <Check size={16} color="#2563eb" />}
          </TouchableOpacity>
        </View>

        {/* ================= 2. Proxy Configuration ================= */}
        <View style={styles.sectionCard}>
          <View style={styles.proxyHeaderRow}>
            <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
              <Wifi size={18} color="#1e3a8a" style={{ marginLeft: 8 }} />
              <Text style={styles.sectionTitle}>إعدادات الخوادم (Proxy)</Text>
            </View>
            <TouchableOpacity style={styles.addProxyBtn} onPress={() => setIsProxyModalVisible(true)}>
              <Plus size={14} color="#2563eb" style={{ marginLeft: 4 }} />
              <Text style={styles.addProxyBtnText}>إضافة</Text>
            </TouchableOpacity>
          </View>

          {proxies.length === 0 ? (
            <View style={styles.emptyProxyContainer}>
              <View style={styles.shieldIconWrapper}>
                <ShieldCheck size={28} color="#94a3b8" />
              </View>
              <Text style={styles.emptyProxyTitle}>لا يوجد أي بروكسي مضاف</Text>
              <Text style={styles.emptyProxySub}>أضف بروكسي لحماية الحسابات من الحظر الجغرافي</Text>
            </View>
          ) : (
            <View style={{ marginTop: 10 }}>
              {proxies.map(proxy => (
                <View key={proxy.id} style={styles.proxyItemRow}>
                  <Text style={styles.proxyItemText}>{proxy.address}</Text>
                  <TouchableOpacity onPress={() => removeProxy(proxy.id)}>
                    <Trash2 size={16} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* ================= 3. Security Settings ================= */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <ShieldAlert size={18} color="#1e3a8a" style={{ marginLeft: 8 }} />
            <Text style={styles.sectionTitle}>إعدادات الأمان (Security)</Text>
          </View>

          {/* Biometric Lock */}
          <View style={styles.switchRow}>
            <View style={styles.switchLabelContainer}>
              <View style={{ flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 4 }}>
                <Fingerprint size={15} color="#475569" style={{ marginLeft: 6 }} />
                <Text style={styles.switchMainText}>قفل التطبيق بالبصمة (Biometric Lock)</Text>
              </View>
              <Text style={styles.switchSubText}>يطلب البصمة عند فتح الأبلكيشن لحماية الحملات.</Text>
            </View>
            <Switch trackColor={{ false: '#cbd5e1', true: '#bbf7d0' }} thumbColor={biometricLock ? '#16a34a' : '#f1f5f9'} onValueChange={setBiometricLock} value={biometricLock} />
          </View>

          {/* Strip Image Metadata */}
          <View style={[styles.switchRow, { borderBottomWidth: 0, paddingBottom: 0 }]}>
            <View style={styles.switchLabelContainer}>
              <View style={{ flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 4 }}>
                <ImageIcon size={15} color="#475569" style={{ marginLeft: 6 }} />
                <Text style={styles.switchMainText}>تطهير بيانات الصور (Strip Metadata)</Text>
              </View>
              <Text style={styles.switchSubText}>إزالة بصمة الصورة (EXIF) قبل النشر لمنع الرادار من كشف التكرار.</Text>
            </View>
            <Switch trackColor={{ false: '#cbd5e1', true: '#bbf7d0' }} thumbColor={stripMetadata ? '#16a34a' : '#f1f5f9'} onValueChange={setStripMetadata} value={stripMetadata} />
          </View>
        </View>

        {/* ================= 4. Export Reports ================= */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <FileDown size={18} color="#1e3a8a" style={{ marginLeft: 8 }} />
            <Text style={styles.sectionTitle}>تصدير التقارير (Export Reports)</Text>
          </View>

          <View style={styles.switchRow}>
            <View style={styles.switchLabelContainer}>
              <Text style={styles.switchMainText}>تصدير تلقائي بعد انتهاء الحملة</Text>
            </View>
            <Switch trackColor={{ false: '#cbd5e1', true: '#bfdbfe' }} thumbColor={autoExport ? '#2563eb' : '#f1f5f9'} onValueChange={setAutoExport} value={autoExport} />
          </View>

          <View style={styles.exportFormatRow}>
            <Text style={styles.exportFormatLabel}>صيغة التصدير الافتراضية:</Text>
            <View style={styles.formatToggleContainer}>
              <TouchableOpacity style={[styles.formatBtn, exportFormat === 'csv' && styles.formatBtnActive]} onPress={() => setExportFormat('csv')}>
                <FileSpreadsheet size={14} color={exportFormat === 'csv' ? '#fff' : '#64748b'} style={{ marginLeft: 4 }} />
                <Text style={[styles.formatBtnText, exportFormat === 'csv' && { color: '#fff' }]}>CSV</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.formatBtn, exportFormat === 'pdf' && styles.formatBtnActive]} onPress={() => setExportFormat('pdf')}>
                <FileText size={14} color={exportFormat === 'pdf' ? '#fff' : '#64748b'} style={{ marginLeft: 4 }} />
                <Text style={[styles.formatBtnText, exportFormat === 'pdf' && { color: '#fff' }]}>PDF</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.exportActionRow}>
            <TouchableOpacity style={styles.exportActionBtn}>
              <Text style={styles.exportActionBtnText}>تصدير CSV الآن</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.exportActionBtn}>
              <Text style={styles.exportActionBtnText}>تصدير PDF الآن</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ================= 5. About Section ================= */}
        <View style={[styles.sectionCard, { marginBottom: 120 }]}>
          <View style={styles.sectionHeader}>
            <Info size={18} color="#64748b" style={{ marginLeft: 8 }} />
            <Text style={[styles.sectionTitle, { color: '#475569' }]}>حول التطبيق (About)</Text>
          </View>

          <View style={styles.aboutRow}>
            <Text style={styles.aboutValue}>3M Poster FB PRO</Text>
            <Text style={styles.aboutLabel}>اسم البرنامج:</Text>
          </View>
          <View style={[styles.aboutRow, { borderBottomWidth: 0, paddingBottom: 0 }]}>
            <Text style={styles.aboutValue}>v 1.2.0 (Stable)</Text>
            <Text style={styles.aboutLabel}>الإصدار الحالي:</Text>
          </View>
        </View>

      </ScrollView>

      {/* ================= Modal: Add New Proxy ================= */}
      <Modal animationType="fade" transparent={true} visible={isProxyModalVisible} onRequestClose={() => setIsProxyModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setIsProxyModalVisible(false)}><X size={20} color="#64748b" /></TouchableOpacity>
              <Text style={styles.modalTitle}>إضافة Proxy جديد</Text>
            </View>

            <View style={styles.modalForm}>
              <Text style={styles.inputLabel}>عنوان الـ IP:</Text>
              <TextInput style={styles.inputField} placeholder="مثال: 192.168.1.1" value={newProxyIP} onChangeText={setNewProxyIP} keyboardType="numeric" />

              <Text style={styles.inputLabel}>المنفذ (Port):</Text>
              <TextInput style={styles.inputField} placeholder="مثال: 8080" value={newProxyPort} onChangeText={setNewProxyPort} keyboardType="numeric" />

              <TouchableOpacity style={styles.saveProxyBtn} onPress={handleAddProxy}>
                <Text style={styles.saveProxyBtnText}>حفظ وإضافة</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9' },
  headerContainer: { paddingHorizontal: 20, paddingVertical: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e2e8f0', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' },
  scrollContent: { padding: 16 },

  sectionCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#e2e8f0' },
  sectionHeader: { flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 14, borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingBottom: 10 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#1e293b' },

  /* Language Options */
  languageOptionBtn: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 14, borderRadius: 10, borderWidth: 1, borderColor: '#e2e8f0', marginBottom: 8, backgroundColor: '#f8fafc' },
  languageOptionActive: { borderColor: '#bfdbfe', backgroundColor: '#eff6ff' },
  languageText: { fontSize: 13, color: '#475569', fontWeight: '500' },
  languageTextActive: { color: '#1e3a8a', fontWeight: 'bold' },

  /* Proxy Section */
  proxyHeaderRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingBottom: 10, marginBottom: 10 },
  addProxyBtn: { flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: '#eff6ff', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20 },
  addProxyBtnText: { color: '#2563eb', fontSize: 11, fontWeight: 'bold' },
  emptyProxyContainer: { alignItems: 'center', paddingVertical: 20 },
  shieldIconWrapper: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#f1f5f9', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  emptyProxyTitle: { fontSize: 13, fontWeight: 'bold', color: '#475569', marginBottom: 4 },
  emptyProxySub: { fontSize: 11, color: '#94a3b8' },
  proxyItemRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#e2e8f0', marginBottom: 8 },
  proxyItemText: { fontSize: 13, color: '#1e293b', fontFamily: 'monospace' },

  /* Switches Row */
  switchRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  switchLabelContainer: { flex: 1, alignItems: 'flex-end', paddingLeft: 16 },
  switchMainText: { fontSize: 12.5, fontWeight: '600', color: '#334155' },
  switchSubText: { fontSize: 10, color: '#94a3b8', textAlign: 'right', marginTop: 2 },

  /* Export Format */
  exportFormatRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, marginBottom: 16 },
  exportFormatLabel: { fontSize: 12, color: '#475569', fontWeight: '500' },
  formatToggleContainer: { flexDirection: 'row-reverse', backgroundColor: '#f1f5f9', borderRadius: 10, padding: 4 },
  formatBtn: { flexDirection: 'row-reverse', alignItems: 'center', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  formatBtnActive: { backgroundColor: '#2563eb' },
  formatBtnText: { fontSize: 11, fontWeight: '600', color: '#64748b' },
  exportActionRow: { flexDirection: 'row', justifyContent: 'space-between' },
  exportActionBtn: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: '#cbd5e1', marginHorizontal: 4 },
  exportActionBtnText: { fontSize: 12, color: '#2563eb', fontWeight: '600' },

  /* About */
  aboutRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  aboutLabel: { fontSize: 12, color: '#64748b' },
  aboutValue: { fontSize: 12, fontWeight: 'bold', color: '#1e293b' },

  /* Modal Proxy */
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#fff', borderRadius: 20, padding: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 16, fontWeight: 'bold', color: '#1e3a8a' },
  modalForm: { alignItems: 'flex-end' },
  inputLabel: { fontSize: 12, color: '#475569', marginBottom: 6, fontWeight: '600' },
  inputField: { width: '100%', backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 10, padding: 10, fontSize: 14, textAlign: 'right', marginBottom: 16 },
  saveProxyBtn: { width: '100%', backgroundColor: '#2563eb', padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  saveProxyBtnText: { color: '#fff', fontSize: 14, fontWeight: 'bold' }
});