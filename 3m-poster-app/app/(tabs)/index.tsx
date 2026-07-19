import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Users, 
  MessageSquare, 
  RefreshCw, 
  CheckCircle, 
  Layers,
  Users2,
  Share2,
  Inbox,
  Database,
  ThumbsUp,
  MessageCircle,
  Play, 
  Pause  
} from 'lucide-react-native';

export default function DashboardScreen() {
  const [isScraperRunning, setIsScraperRunning] = useState(true);
  const [isInboxRunning, setIsInboxRunning] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* الهيدر العلوي للمنصة */}
      <View style={styles.header}>
        <View>
          <Text style={styles.brandText}>3M Poster FB</Text>
          <Text style={styles.welcomeText}>لوحة القيادة والتقارير الشاملة</Text>
          {/* اسم العميل المضاف بخط جميل وتنسيق مميز */}
          <Text style={styles.clientNameText}>أهلاً (Mohamed) 👋</Text>
        </View>
        <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
          <RefreshCw size={20} color="#2563eb" style={refreshing ? styles.spinning : {}} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* ================= قسم 1: سحب الداتا المتقدم من فيسبوك (Scraping) ================= */}
        <View style={styles.sectionHeaderRow}>
          <Database size={20} color="#f59e0b" />
          <Text style={styles.sectionTitleMain}>أدوات سحب الداتا واستخراج المتفاعلين</Text>
        </View>

        <View style={[styles.liveCampaignCard, { borderColor: '#fde68a' }]}>
          <View style={styles.liveHeader}>
            <View style={styles.liveStatusBadge}>
              <View style={[styles.statusDot, { backgroundColor: isScraperRunning ? '#22c55e' : '#64748b' }]} />
              <Text style={styles.liveStatusText}>
                {isScraperRunning ? 'جاري استخراج الداتا حالياً...' : 'المهام الحالية في الانتظار'}
              </Text>
            </View>
            <TouchableOpacity 
              style={[styles.controlBtn, { backgroundColor: '#fef3c7' }]}
              onPress={() => setIsScraperRunning(!isScraperRunning)}
            >
              {isScraperRunning ? <Pause size={15} color="#d97706" /> : <Play size={15} color="#d97706" />}
            </TouchableOpacity>
          </View>
          
          <Text style={styles.campaignTargetTitle}>المهمة الحالية: سحب المتفاعلين بـ (لايك + كومنت) من آخر البوستات النشطة</Text>

          <View style={styles.miniStatsRow}>
            <View style={styles.miniStatItem}>
              <Users size={16} color="#64748b" style={{ marginBottom: 4 }} />
              <Text style={styles.miniStatNumber}>3,450</Text>
              <Text style={styles.miniStatLabel}>أعضاء جروبات مستخرجين</Text>
            </View>
            <View style={styles.miniStatItem}>
              <ThumbsUp size={16} color="#64748b" style={{ marginBottom: 4 }} />
              <Text style={styles.miniStatNumber}>1,890</Text>
              <Text style={styles.miniStatLabel}>متفاعلين (لايكات)</Text>
            </View>
            <View style={styles.miniStatItem}>
              <MessageCircle size={16} color="#64748b" style={{ marginBottom: 4 }} />
              <Text style={styles.miniStatNumber}>740</Text>
              <Text style={styles.miniStatLabel}>متفاعلين (تعليقات)</Text>
            </View>
          </View>
        </View>


        {/* ================= قسم 2: إرسال الرسائل لمراسلي الصفحة الحالية (Inbox) ================= */}
        <View style={styles.sectionHeaderRow}>
          <Inbox size={20} color="#d946ef" />
          <Text style={styles.sectionTitleMain}>حملات إعادة استهداف مراسلي الصفحة (Inbox)</Text>
        </View>

        <View style={[styles.liveCampaignCard, { borderColor: '#f5d0fe' }]}>
          <View style={styles.liveHeader}>
            <View style={styles.liveStatusBadge}>
              <View style={[styles.statusDot, { backgroundColor: isInboxRunning ? '#22c55e' : '#64748b' }]} />
              <Text style={styles.liveStatusText}>
                {isInboxRunning ? 'حملة المراسلة شغالة' : 'الحملة متوقفة مؤقتاً'}
              </Text>
            </View>
            <TouchableOpacity 
              style={[styles.controlBtn, { backgroundColor: '#fae8ff' }]}
              onPress={() => setIsInboxRunning(!isInboxRunning)}
            >
              {isInboxRunning ? <Pause size={15} color="#d946ef" /> : <Play size={15} color="#d946ef" />}
            </TouchableOpacity>
          </View>

          <Text style={styles.campaignTargetTitle}>إرسال العروض التسويقية لكل عملاء صندوق الوارد السابقين تلقائياً</Text>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: '65%', backgroundColor: '#d946ef' }]} />
            </View>
            <View style={styles.progressLabels}>
              <Text style={[styles.progressValue, { color: '#d946ef' }]}>65%</Text>
              <Text style={styles.progressCount}>1,950 / 3,000 عميل مرسَل</Text>
            </View>
          </View>

          <View style={[styles.miniStatsRow, { marginTop: 15, borderTopColor: '#fae8ff' }]}>
            <View style={styles.miniStatItem}>
              <Text style={styles.miniStatNumber}>3,000</Text>
              <Text style={styles.miniStatLabel}>إجمالي المراسِلين</Text>
            </View>
            <View style={styles.miniStatItem}>
              <Text style={styles.miniStatNumber}>1,950</Text>
              <Text style={styles.miniStatLabel}>تم بنجاح</Text>
            </View>
            <View style={styles.miniStatItem}>
              <Text style={styles.miniStatNumber}>89.2%</Text>
              <Text style={styles.miniStatLabel}>معدل التسليم</Text>
            </View>
          </View>
        </View>


        {/* ================= قسم 3: النشر التلقائي وإدارة الجروبات ================= */}
        <View style={styles.sectionHeaderRow}>
          <Users2 size={20} color="#10b981" />
          <Text style={styles.sectionTitleMain}>النشر التلقائي والمشاركة في الجروبات</Text>
        </View>

        <View style={[styles.liveCampaignCard, { borderColor: '#a7f3d0' }]}>
          <View style={styles.groupRunningRow}>
            <Text style={styles.groupScheduleText}>📅 الجدولة القادمة: منشور تفاعلي الساعة 04:00 م</Text>
          </View>

          <View style={styles.miniStatsRow}>
            <View style={styles.miniStatItem}>
              <Text style={styles.miniStatNumber}>145</Text>
              <Text style={styles.miniStatLabel}>جروب مشترك به</Text>
            </View>
            <View style={styles.miniStatItem}>
              <Text style={styles.miniStatNumber}>12</Text>
              <Text style={styles.miniStatLabel}>منشورات مجدولة</Text>
            </View>
            <View style={styles.miniStatItem}>
              <Text style={styles.miniStatNumber}>48</Text>
              <Text style={styles.miniStatLabel}>نُشر اليوم تلقائياً</Text>
            </View>
          </View>
        </View>


        {/* ================= أدوات التحكم السريع والمميزات الإضافية ================= */}
        <Text style={styles.sectionTitle}>أدوات ومميزات التطبيق السريعة</Text>
        <View style={styles.statsGrid}>
          
          <TouchableOpacity style={styles.featureGridCard}>
            <Users size={22} color="#2563eb" />
            <Text style={styles.featureGridTitle}>سحب أعضاء الجروبات</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureGridCard}>
            <ThumbsUp size={22} color="#f59e0b" />
            <Text style={styles.featureGridTitle}>استخراج المتفاعلين</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureGridCard}>
            <Inbox size={22} color="#d946ef" />
            <Text style={styles.featureGridTitle}>مراسلة الـ Inbox</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureGridCard}>
            <Share2 size={22} color="#10b981" />
            <Text style={styles.featureGridTitle}>نشر تلقائي بالجروبات</Text>
          </TouchableOpacity>

        </View>


        {/* ================= التقارير اللحظية وسجل العمليات الحية ================= */}
        <Text style={styles.sectionTitle}>آخر التقارير الآنية والعمليات الحية</Text>
        <View style={styles.logContainer}>
          
          <View style={styles.logItem}>
            <CheckCircle size={16} color="#22c55e" style={styles.logIcon} />
            <View style={styles.logTexts}>
              <Text style={styles.logMainText}>اكتمل استخراج 240 مستخدم تفاعلوا بالتعليقات على بوست المستهدف</Text>
              <Text style={styles.logTime}>منذ ثانيتين</Text>
            </View>
          </View>

          <View style={styles.logItem}>
            <Database size={16} color="#f59e0b" style={styles.logIcon} />
            <View style={styles.logTexts}>
              <Text style={styles.logMainText}>تم حفظ 1,500 عضو مسحوبين من "جروب تجار ملابس الجملة" بجودة عالية</Text>
              <Text style={styles.logTime}>منذ دقيقة</Text>
            </View>
          </View>

          <View style={styles.logItem}>
            <Share2 size={16} color="#10b981" style={styles.logIcon} />
            <View style={styles.logTexts}>
              <Text style={styles.logMainText}>تم نشر بوست تسويقي بنجاح في "جروب عقارات وتجارة القاهرة"</Text>
              <Text style={styles.logTime}>منذ 5 دقائق</Text>
            </View>
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  brandText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e3a8a',
    textAlign: 'right',
  },
  welcomeText: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'right',
    marginTop: 2,
  },
  clientNameText: {
    fontSize: 12,
    color: '#2563eb', // لون أزرق مميز ونظيف
    fontWeight: '600',
    textAlign: 'right',
    marginTop: 4, // مسافة صغيرة تحت العنوان الشامل
  },
  refreshButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#eff6ff',
  },
  spinning: {
    transform: [{ rotate: '45deg' }],
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionHeaderRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 15,
  },
  sectionTitleMain: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1e293b',
    marginRight: 8,
  },
  liveCampaignCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  liveHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  liveStatusBadge: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 6,
  },
  liveStatusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  controlBtn: {
    padding: 6,
    borderRadius: 50,
  },
  campaignTargetTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    textAlign: 'right',
    marginBottom: 12,
    lineHeight: 18,
  },
  miniStatsRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 12,
  },
  miniStatItem: {
    alignItems: 'center',
  },
  miniStatNumber: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  miniStatLabel: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
  },
  progressContainer: {
    width: '100%',
    marginTop: 5,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
    position: 'absolute',
    right: 0,
  },
  progressLabels: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  progressValue: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  progressCount: {
    fontSize: 11,
    color: '#64748b',
  },
  groupRunningRow: {
    flexDirection: 'row-reverse',
    marginBottom: 10,
  },
  groupScheduleText: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'right',
    marginBottom: 15,
    marginTop: 20,
  },
  statsGrid: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  featureGridCard: {
    width: (Dimensions.get('window').width - 54) / 2,
    maxWidth: '48%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
  },
  featureGridTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    marginTop: 8,
    textAlign: 'center',
  },
  logContainer: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  logItem: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  logIcon: {
    marginLeft: 12,
    marginTop: 2,
  },
  logTexts: {
    flex: 1,
    alignItems: 'flex-end',
  },
  logMainText: {
    fontSize: 12,
    color: '#334155',
    textAlign: 'right',
    lineHeight: 18,
  },
  logTime: {
    fontSize: 10,
    color: '#94a3b8',
    marginTop: 4,
  },
});