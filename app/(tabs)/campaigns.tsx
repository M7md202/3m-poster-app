import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator,
  Modal,
  TextInput,
  Switch,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Activity, 
  Play, 
  Pause, 
  XCircle, 
  CheckCircle2, 
  Terminal, 
  AlertCircle,
  RefreshCw,
  TrendingUp,
  Plus,
  X,
  Sliders,
  ShieldCheck,
  GitBranch
} from 'lucide-react-native';

export default function CampaignsScreen() {
  const [campaigns, setCampaigns] = useState([
    {
      id: '1',
      name: 'حملة عقارات التجمع الخامس والرحاب',
      type: 'نشر تلقائي في الجروبات',
      account: 'Mohamed Mahmoud Ali',
      status: 'running',
      total: 60,
      success: 38,
      failed: 1,
      progress: 0.63,
    },
    {
      id: '2',
      name: 'توزيع عرض الصيف - كورس التسويق',
      type: 'إرسال رسائل جماعية (إنبوكس)',
      account: '3M Sender Pro Acc',
      status: 'paused',
      total: 100,
      success: 45,
      failed: 3,
      progress: 0.45,
    }
  ]);

  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  // إعدادات بناء الحملة
  const [campaignName, setCampaignName] = useState('');
  const [campaignType, setCampaignType] = useState('نشر تلقائي في الجروبات');
  const [minInterval, setMinInterval] = useState('5');
  const [maxInterval, setMaxInterval] = useState('12');
  const [dailyLimit, setDailyLimit] = useState('20');
  const [simulateScrolling, setSimulateScrolling] = useState(true);
  const [scrollDuration, setScrollDuration] = useState('30');
  const [randomDelays, setRandomDelays] = useState(true);
  const [rotateProxies, setRotateProxies] = useState(false);
  const [firstCommentLink, setFirstCommentLink] = useState(false);
  const [autoCommentDM, setAutoCommentDM] = useState(false);
  const [autoBump, setAutoBump] = useState(false);
  const [sequenceCampaign, setSequenceCampaign] = useState(false);
  const [rssAutoPosting, setRssAutoPosting] = useState(false);
  const [abTesting, setAbTesting] = useState(false);

  const [logs, setLogs] = useState([
    { time: '14:52:10', msg: '🛡️ نظام الحماية نشط ومستعد لمراقبة الحملات الجديدة من الحظر.', type: 'secure' },
    { time: '14:52:15', msg: '🌐 تم تهيئة جدار الحماية ومطهر الميتاداتا بنجاح.', type: 'info' }
  ]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLogs(prev => [
        { time: new Date().toLocaleTimeString(), msg: '🔄 تم مزامنة إعدادات الـ Anti-Ban وحماية البروفايلات.', type: 'wait' },
        ...prev
      ]);
    }, 700);
  };

  const toggleCampaignStatus = (id: string) => {
    setCampaigns(prev => prev.map(camp => {
      if (camp.id === id) {
        const newStatus = camp.status === 'running' ? 'paused' : 'running';
        return { ...camp, status: newStatus };
      }
      return camp;
    }));
  };

  const handleCreateCampaign = () => {
    if (!campaignName.trim()) {
      Alert.alert('تنبيه', 'برجاء كتابة اسم الحملة التسويقية أولاً.');
      return;
    }

    const newCampaign = {
      id: Math.random().toString(),
      name: campaignName,
      type: campaignType,
      account: 'Mohamed Mahmoud Ali',
      status: 'running',
      total: parseInt(dailyLimit) || 50,
      success: 0,
      failed: 0,
      progress: 0.0,
    };

    setCampaigns([newCampaign, ...campaigns]);
    setIsCreateModalVisible(false);
    setCampaignName('');
  };

  const filteredCampaigns = campaigns.filter(c => {
    if (selectedFilter === 'all') return true;
    return c.status === selectedFilter;
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* الهيدر المطور العمودي لمنع التداخل نهائياً */}
      <View style={styles.headerBlockContainer}>
        <View style={styles.headerTextWrapper}>
          <Text style={styles.headerTitle}>لوحة التحكم وإدارة الحملات</Text>
          <Text style={styles.headerSubtitle}>راقب حملاتك الإعلانية النشطة، وسجلات الحماية من الحظر فورياً</Text>
        </View>
        
        <View style={styles.headerActionsRow}>
          <TouchableOpacity style={styles.refreshBtn} onPress={handleRefresh}>
            {isRefreshing ? <ActivityIndicator size="small" color="#1e3a8a" /> : <RefreshCw size={14} color="#1e3a8a" />}
          </TouchableOpacity>
          <TouchableOpacity style={styles.createNewCampaignTriggerBtn} onPress={() => setIsCreateModalVisible(true)}>
            <Plus size={14} color="#fff" style={{ marginLeft: 4 }} />
            <Text style={styles.createNewCampaignTriggerText}>إطلاق حملة جديدة 🚀</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* كروت الإحصائيات العامة */}
        <View style={styles.statsGridContainer}>
          <View style={styles.statMiniCard}>
            <View style={[styles.iconDotWrapper, { backgroundColor: '#eff6ff' }]}>
              <TrendingUp size={14} color="#2563eb" />
            </View>
            <Text style={styles.statLabel}>إجمالي المرسل</Text>
            <Text style={[styles.statValue, { color: '#1e293b' }]}>83 عملية</Text>
          </View>

          <View style={styles.statMiniCard}>
            <View style={[styles.iconDotWrapper, { backgroundColor: '#f0fdf4' }]}>
              <CheckCircle2 size={14} color="#16a34a" />
            </View>
            <Text style={styles.statLabel}>العمليات الناجحة</Text>
            <Text style={[styles.statValue, { color: '#16a34a' }]}>83 / 83</Text>
          </View>

          <View style={styles.statMiniCard}>
            <View style={[styles.iconDotWrapper, { backgroundColor: '#fef2f2' }]}>
              <AlertCircle size={14} color="#ef4444" />
            </View>
            <Text style={styles.statLabel}>المحجوبة</Text>
            <Text style={[styles.statValue, { color: '#ef4444' }]}>0 حساب 🛡️</Text>
          </View>
        </View>

        {/* فلاتر التصفية */}
        <View style={styles.filterTabContainer}>
          <TouchableOpacity style={[styles.filterTabBtn, selectedFilter === 'paused' && styles.filterTabBtnActive]} onPress={() => setSelectedFilter('paused')}>
            <Text style={[styles.filterTabText, selectedFilter === 'paused' && styles.filterTabTextActive]}>الموقوفة</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filterTabBtn, selectedFilter === 'running' && styles.filterTabBtnActive]} onPress={() => setSelectedFilter('running')}>
            <Text style={[styles.filterTabText, selectedFilter === 'running' && styles.filterTabTextActive]}>النشطة</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filterTabBtn, selectedFilter === 'all' && styles.filterTabBtnActive]} onPress={() => setSelectedFilter('all')}>
            <Text style={[styles.filterTabText, selectedFilter === 'all' && styles.filterTabTextActive]}>كل الحملات</Text>
          </TouchableOpacity>
        </View>

        {/* قائمة الحملات */}
        <Text style={styles.sectionTitle}>📋 قائمة الحملات التشغيلية الحالية:</Text>
        
        {filteredCampaigns.map((camp) => (
          <View key={camp.id} style={styles.campaignMainCard}>
            <View style={styles.campHeaderRow}>
              <View style={[styles.statusBadge, camp.status === 'running' ? { backgroundColor: '#f0fdf4' } : { backgroundColor: '#fff7ed' }]}>
                <Text style={[styles.statusBadgeText, camp.status === 'running' ? { color: '#16a34a' } : { color: '#ea580c' }]}>
                  {camp.status === 'running' ? '● جاري العمل' : '● موقوف أمان'}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end', flex: 1, paddingRight: 10 }}>
                <Text style={styles.campNameText}>{camp.name}</Text>
                <Text style={styles.campSubtitleText}>{camp.type} • بروفايل: {camp.account}</Text>
              </View>
            </View>

            <View style={styles.progressSectionWrapper}>
              <View style={styles.progressDataLabels}>
                <Text style={styles.progressPercentText}>{Math.round(camp.progress * 100)}%</Text>
                <Text style={styles.progressCountText}>تم إرسال {camp.success} من أصل {camp.total}</Text>
              </View>
              <View style={styles.progressBarOuterTrack}>
                <View style={[styles.progressBarInnerFill, { width: `${camp.progress * 100}%` }, camp.status === 'paused' && { backgroundColor: '#f97316' }]} />
              </View>
            </View>

            <View style={styles.campActionsFooterRow}>
              <TouchableOpacity style={styles.cancelCampBtn}>
                <XCircle size={13} color="#ef4444" style={{ marginLeft: 4 }} />
                <Text style={styles.cancelCampBtnText}>إنهاء وإلغاء</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.pauseResumeCampBtn} onPress={() => toggleCampaignStatus(camp.id)}>
                <Text style={[styles.pauseResumeCampBtnText, { color: camp.status === 'running' ? '#ea580c' : '#16a34a' }]}>
                  {camp.status === 'running' ? '⏸️ إيقاف مؤقت' : '▶️ استئناف'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* سجل الرادار */}
        <View style={styles.terminalSectionHeader}>
          <Terminal size={14} color="#475569" style={{ marginLeft: 6 }} />
          <Text style={styles.sectionTitleTextInline}>🛡️ سجل الرادار الحي ومراوغة الخوارزميات (Anti-Ban):</Text>
        </View>

        <View style={styles.terminalBlackBoxContainer}>
          <ScrollView nestedScrollEnabled style={{ maxHeight: 150 }}>
            {logs.map((log, index) => (
              <View key={index} style={styles.terminalLogRow}>
                <Text style={styles.terminalLogTime}>[{log.time}]</Text>
                <Text style={[styles.terminalLogMsg, log.type === 'secure' && { color: '#38bdf8' }, log.type === 'wait' && { color: '#fbbf24' }]}>
                  {log.msg}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* نافذة بناء الحملات الإعلانية المنبثقة */}
      <Modal animationType="slide" transparent={true} visible={isCreateModalVisible} onRequestClose={() => setIsCreateModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalFullContentContainer}>
            <View style={styles.modalCustomHeader}>
              <TouchableOpacity onPress={() => setIsCreateModalVisible(false)} style={styles.closeModalCircleBtn}><X size={18} color="#64748b" /></TouchableOpacity>
              <Text style={styles.modalCustomHeaderTitle}>إعداد وإطلاق حملة ذكية جديدة</Text>
            </View>

            <ScrollView contentContainerStyle={styles.modalFormScrollContent} showsVerticalScrollIndicator={false}>
              <View style={styles.formSectionGroupCard}>
                <Text style={styles.formInputLabel}>📌 اسم الحملة التسويقية:</Text>
                <TextInput style={styles.formInputTextFiled} placeholder="مثال: حملة عملاء 7agati store" placeholderTextColor="#94a3b8" value={campaignName} onChangeText={setCampaignName} />
              </View>

              <View style={styles.formSectionGroupCard}>
                <View style={styles.sectionFormSubHeader}><Sliders size={14} color="#1e3a8a" style={{ marginLeft: 6 }} /><Text style={styles.sectionFormSubHeaderTitle}>الجدولة الزمنية (Scheduling)</Text></View>
                <View style={styles.inputsInlineFlexRow}>
                  <View style={styles.halfWidthInputWrapper}>
                    <Text style={styles.formSubInputLabel}>أقصى انتظار (دقائق)</Text>
                    <TextInput style={styles.formInputTextFiledCenter} value={maxInterval} onChangeText={setMaxInterval} keyboardType="numeric" />
                  </View>
                  <View style={styles.halfWidthInputWrapper}>
                    <Text style={styles.formSubInputLabel}>أقل انتظار (دقائق)</Text>
                    <TextInput style={styles.formInputTextFiledCenter} value={minInterval} onChangeText={setMinInterval} keyboardType="numeric" />
                  </View>
                </View>
                <Text style={styles.formSubInputLabel}>الحد الأقصى اليومي لكل حساب:</Text>
                <TextInput style={styles.formInputTextFiled} value={dailyLimit} onChangeText={setDailyLimit} keyboardType="numeric" />
              </View>

              <View style={styles.formSectionGroupCard}>
                <View style={styles.sectionFormSubHeader}><ShieldCheck size={14} color="#16a34a" style={{ marginLeft: 6 }} /><Text style={styles.sectionFormSubHeaderTitle}>حزمة تخطي الحظر (Anti-Ban Suite)</Text></View>
                <View style={styles.modalFormSwitchRow}>
                  <Text style={styles.switchMainHeading}>محاكاة التصفح البشري الفعلي</Text>
                  <Switch trackColor={{ false: '#cbd5e1', true: '#bbf7d0' }} thumbColor={simulateScrolling ? '#16a34a' : '#f1f5f9'} onValueChange={setSimulateScrolling} value={simulateScrolling} />
                </View>
                <View style={styles.modalFormSwitchRow}>
                  <Text style={styles.switchMainHeading}>فترات انتظار عشوائية ومتغيرة</Text>
                  <Switch trackColor={{ false: '#cbd5e1', true: '#bbf7d0' }} thumbColor={randomDelays ? '#16a34a' : '#f1f5f9'} onValueChange={setRandomDelays} value={randomDelays} />
                </View>
              </View>

              <View style={styles.formSectionGroupCard}>
                <View style={styles.sectionFormSubHeader}><GitBranch size={14} color="#7e22ce" style={{ marginLeft: 6 }} /><Text style={styles.sectionFormSubHeaderTitle}>مسارات وأدوات الأتمتة المتقدمة</Text></View>
                <View style={styles.modalFormSwitchRow}><Text style={styles.switchMainHeading}>رابط في أول تعليق تلقائي</Text><Switch onValueChange={setFirstCommentLink} value={firstCommentLink} /></View>
                <View style={styles.modalFormSwitchRow}><Text style={styles.switchMainHeading}>مسار الرد التلقائي + الإنبوكس</Text><Switch onValueChange={setAutoCommentDM} value={autoCommentDM} /></View>
                <View style={styles.modalFormSwitchRow}><Text style={styles.switchMainHeading}>رفع المنشورات التلقائي (Auto-Bump)</Text><Switch onValueChange={setAutoBump} value={autoBump} /></View>
              </View>

              <View style={styles.modalActionButtonsFooterRow}>
                <TouchableOpacity style={styles.modalCancelTriggerBtn} onPress={() => setIsCreateModalVisible(false)}><Text style={styles.modalCancelTriggerBtnText}>إلغاء</Text></TouchableOpacity>
                <TouchableOpacity style={styles.modalSaveTriggerBtn} onPress={handleCreateCampaign}><Text style={styles.modalSaveTriggerBtnText}>إطلاق الحملة فوراً</Text></TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  
  // تنسيق الهيدر المطور الجديد لحل مشكلة التداخل بالكامل
  headerBlockContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTextWrapper: {
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e3a8a', textAlign: 'right' },
  headerSubtitle: { fontSize: 11, color: '#64748b', marginTop: 2, textAlign: 'right' },
  headerActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  refreshBtn: { padding: 8, backgroundColor: '#f1f5f9', borderRadius: 10, borderWidth: 1, borderColor: '#e2e8f0' },
  createNewCampaignTriggerBtn: { backgroundColor: '#2563eb', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 10, flexDirection: 'row-reverse', alignItems: 'center' },
  createNewCampaignTriggerText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },

  scrollContent: { padding: 16 },
  statsGridContainer: { flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 16 },
  statMiniCard: { backgroundColor: '#fff', borderRadius: 14, borderWidth: 1, borderColor: '#e2e8f0', padding: 10, width: '31.5%', alignItems: 'flex-end' },
  iconDotWrapper: { padding: 5, borderRadius: 8, marginBottom: 4 },
  statLabel: { fontSize: 10, color: '#64748b' },
  statValue: { fontSize: 11, fontWeight: 'bold', marginTop: 2 },
  filterTabContainer: { flexDirection: 'row-reverse', backgroundColor: '#edf2f7', borderRadius: 12, padding: 4, marginBottom: 16 },
  filterTabBtn: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 10 },
  filterTabBtnActive: { backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  filterTabText: { fontSize: 12, color: '#64748b' },
  filterTabTextActive: { color: '#1e3a8a', fontWeight: 'bold' },
  sectionTitle: { fontSize: 13, fontWeight: 'bold', color: '#1e293b', textAlign: 'right', marginBottom: 12 },
  campaignMainCard: { backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#e2e8f0', padding: 14, marginBottom: 12 },
  campHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20 },
  statusBadgeText: { fontSize: 9.5, fontWeight: '600' },
  campNameText: { fontSize: 13, fontWeight: 'bold', color: '#1e293b', textAlign: 'right' },
  campSubtitleText: { fontSize: 10, color: '#64748b', marginTop: 4, textAlign: 'right' },
  progressSectionWrapper: { marginTop: 12 },
  progressDataLabels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  progressPercentText: { fontSize: 11, fontWeight: 'bold', color: '#1e3a8a' },
  progressCountText: { fontSize: 10, color: '#64748b' },
  progressBarOuterTrack: { height: 6, backgroundColor: '#f1f5f9', borderRadius: 10, overflow: 'hidden' },
  progressBarInnerFill: { height: '100%', backgroundColor: '#2563eb', borderRadius: 10 },
  campActionsFooterRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, borderTopWidth: 1, borderTopColor: '#f1f5f9', paddingTop: 10 },
  cancelCampBtn: { flexDirection: 'row-reverse', alignItems: 'center', paddingVertical: 5, paddingHorizontal: 8, borderWidth: 1, borderColor: '#fca5a5', borderRadius: 8 },
  cancelCampBtnText: { fontSize: 11, color: '#ef4444' },
  pauseResumeCampBtn: { paddingVertical: 5, paddingHorizontal: 10, borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, backgroundColor: '#f8fafc' },
  pauseResumeCampBtnText: { fontSize: 11, fontWeight: '600' },
  terminalSectionHeader: { flexDirection: 'row-reverse', alignItems: 'center', marginTop: 14, marginBottom: 8 },
  sectionTitleTextInline: { fontSize: 12, fontWeight: 'bold', color: '#475569' },
  terminalBlackBoxContainer: { backgroundColor: '#0f172a', borderRadius: 14, padding: 12 },
  terminalLogRow: { flexDirection: 'row-reverse', marginBottom: 6 },
  terminalLogTime: { color: '#94a3b8', fontSize: 10, marginLeft: 6 },
  terminalLogMsg: { color: '#f8fafc', fontSize: 11, textAlign: 'right', flex: 1 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.6)', justifyContent: 'flex-end' },
  modalFullContentContainer: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, height: '85%' },
  modalCustomHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  closeModalCircleBtn: { padding: 6, backgroundColor: '#f1f5f9', borderRadius: 50 },
  modalCustomHeaderTitle: { fontSize: 14, fontWeight: 'bold', color: '#1e3a8a' },
  modalFormScrollContent: { padding: 16 },
  formSectionGroupCard: { backgroundColor: '#f8fafc', borderRadius: 14, borderWidth: 1, borderColor: '#e2e8f0', padding: 12, marginBottom: 12 },
  formInputLabel: { fontSize: 12, fontWeight: 'bold', color: '#334155', textAlign: 'right', marginBottom: 6 },
  formInputTextFiled: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 8, fontSize: 12.5, color: '#0f172a', textAlign: 'right' },
  formInputTextFiledCenter: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 8, fontSize: 12.5, textAlign: 'center' },
  sectionFormSubHeader: { flexDirection: 'row-reverse', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#cbd5e1', paddingBottom: 6, marginBottom: 10 },
  sectionFormSubHeaderTitle: { fontSize: 11.5, fontWeight: 'bold', color: '#1e3a8a' },
  inputsInlineFlexRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  halfWidthInputWrapper: { width: '48%' },
  formSubInputLabel: { fontSize: 10.5, color: '#475569', textAlign: 'right', marginBottom: 4 },
  modalFormSwitchRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  switchMainHeading: { fontSize: 11.5, fontWeight: '600', color: '#334155' },
  modalActionButtonsFooterRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  modalCancelTriggerBtn: { backgroundColor: '#f1f5f9', borderRadius: 10, paddingVertical: 12, width: '30%', alignItems: 'center', borderWidth: 1, borderColor: '#cbd5e1' },
  modalCancelTriggerBtnText: { color: '#64748b', fontSize: 12 },
  modalSaveTriggerBtn: { backgroundColor: '#2563eb', borderRadius: 10, paddingVertical: 12, width: '66%', alignItems: 'center' },
  modalSaveTriggerBtnText: { color: '#fff', fontSize: 12, fontWeight: 'bold' }
});