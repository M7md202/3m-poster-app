import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  TextInput, 
  Switch,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  MessageSquare, 
  Play, 
  Pause, 
  Search, 
  CheckCircle2, 
  FileSpreadsheet, 
  User, 
  Clock, 
  Calendar, 
  Code, 
  Filter, 
  Sparkles, 
  MessageCircle,
  Zap,
  Image,
  Film,
  Paperclip,
  Save,
  Bot,         // أيقونة للمجيب الآلي
  CalendarDays // أيقونة للجدولة
} from 'lucide-react-native';

const initialConversations = [
  { id: 'c1', name: 'أحمد محمود (سأل عن العقارات)', lastActive: 'منذ ساعتين', totalMessages: 14, selected: true, lastIntent: 'السعر كام' },
  { id: 'c2', name: 'منى علي (مهتمة بملابس الجملة)', lastActive: 'منذ يوم', totalMessages: 8, selected: true, lastIntent: 'تفاصيل الشحن' },
  { id: 'c3', name: 'كريم حسن (استفسار صيانة موبايل)', lastActive: 'منذ 3 أيام', totalMessages: 3, selected: false, lastIntent: 'العنوان فين' },
];

const initialAutoResponses = [
  { id: 'r1', keyword: 'بكام', reply: 'أهلاً بك يا فندم! السعر حالياً داخل العرض هو 350 جنيهاً فقط لفترة محدودة لفترة الصيف 🌟' },
  { id: 'r2', keyword: 'تفاصيل', reply: 'مرحباً بك! تفاصيل المنتج تم إرسالها لك، ويمكنك تفعيل الطلب مباشرة بالرد بكلمة (تأكيد).' },
];

export default function InboxScreen() {
  const [conversations, setConversations] = useState(initialConversations);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageText, setMessageText] = useState('');
  const [intentQuery, setIntentQuery] = useState(''); 
  const [safetyInterval, setSafetyInterval] = useState<'safe' | 'fast'>('safe');
  const [customDelay, setCustomDelay] = useState('30');

  // حالات نوع المحتوى والوسائط المرفقة
  const [contentType, setContentType] = useState<'text' | 'image' | 'video'>('text');
  const [attachedMediaName, setAttachedMediaName] = useState<string | null>(null);
  const [isSelectingMedia, setIsSelectingMedia] = useState(false);

  // ميزة جدولة الحملة (Scheduler)
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('2026-07-19');
  const [scheduleTime, setScheduleTime] = useState('14:00');

  // ميزة المجيب الآلي الذكي (Auto-Responder)
  const [isAutoResponderActive, setIsAutoResponderActive] = useState(true);
  const [autoResponses, setAutoResponses] = useState(initialAutoResponses);
  const [newKeyword, setNewKeyword] = useState('');
  const [newReply, setNewReply] = useState('');

  // حالات حملة المراسلة الجماعية
  const [isCampaignActive, setIsCampaignActive] = useState(false);
  const [sentCount, setSentCount] = useState(1950);
  const [totalTarget, setTotalTarget] = useState(3000);
  const [isExporting, setIsExporting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const insertMessageTag = (tag: string) => {
    setMessageText(prev => prev + " " + tag);
  };

  const handleSelectMedia = () => {
    setIsSelectingMedia(true);
    setTimeout(() => {
      if (contentType === 'image') {
        setAttachedMediaName('🔥_مخطط_العرض_الجديد_تصميم.png');
      } else if (contentType === 'video') {
        setAttachedMediaName('فيديو_شرح_المميزات_المشروع.mp4');
      }
      setIsSelectingMedia(false);
    }, 800);
  };

  const handleSaveMessageTemplate = () => {
    if (!messageText) return;
    const fileName = `قالب_رسالة_${messageText.slice(0, 10).replace(/\s/g, '_')}.txt`;
    setStatusMessage(`💾 تم حفظ قالب الرسالة بنجاح داخل فولدر الموبايل المستقل: /3M Poster FB/${fileName}`);
    setTimeout(() => setStatusMessage(''), 5000);
  };

  const handleExportInboxToExcel = () => {
    setIsExporting(true);
    setTimeout(() => {
      setStatusMessage(`📊 تم سحب وتصدير داتا 3,000 عميل من الـ Inbox في ملف: /3M Poster FB/Inbox_Customers.xlsx`);
      setIsExporting(false);
      setTimeout(() => setStatusMessage(''), 5000);
    }, 1200);
  };

  const handleAddAutoResponseRule = () => {
    if (!newKeyword || !newReply) return;
    const newRule = {
      id: Math.random().toString(),
      keyword: newKeyword,
      reply: newReply
    };
    setAutoResponses(prev => [newRule, ...prev]);
    setNewKeyword('');
    setNewReply('');
    setStatusMessage(`🤖 تم إضافة قاعدة الرد التلقائي للكلمة المفتاحية [${newKeyword}] بنجاح!`);
    setTimeout(() => setStatusMessage(''), 4000);
  };

  const toggleSelectConversation = (id: string) => {
    setConversations(prev => prev.map(c => c.id === id ? { ...c, selected: !c.selected } : c));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>إعادة استهداف عملاء الـ Inbox</Text>
        <Text style={styles.headerSubtitle}>مراسلة جماعية مخصصة لكل من تواصل مع الصفحة التجارية سابقاً</Text>
        <Text style={styles.clientWelcomeText}>أهلاً (Mohamed) 👋</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {statusMessage ? (
          <View style={styles.notificationBanner}>
            <Text style={styles.notificationText}>{statusMessage}</Text>
          </View>
        ) : null}

        {/* ================= 1. لوحة تعقب ومراقبة حملة المراسلة الجماعية ================= */}
        <View style={[styles.campaignCard, isCampaignActive && { borderColor: '#d946ef' }]}>
          <View style={styles.campaignHeader}>
            <View style={styles.statusBadge}>
              <View style={[styles.statusDot, { backgroundColor: isCampaignActive ? '#d946ef' : '#64748b' }]} />
              <Text style={styles.statusBadgeText}>
                {isCampaignActive ? 'حملة المراسلة الجماعية نشطة حالياً...' : 'الحملة متوقفة مؤقتاً'}
              </Text>
            </View>
            <TouchableOpacity 
              style={[styles.controlBtn, { backgroundColor: isCampaignActive ? '#fef2f2' : '#fdf4ff' }]}
              onPress={() => setIsCampaignActive(!isCampaignActive)}
            >
              {isCampaignActive ? <Pause size={16} color="#ef4444" /> : <Play size={16} color="#d946ef" />}
            </TouchableOpacity>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressLabelRow}>
              <Text style={styles.progressPercentage}>{Math.round((sentCount / totalTarget) * 100)}%</Text>
              <Text style={styles.progressCountText}>تم إرسال {sentCount} رسالة من إجمالي {totalTarget} عميل مستهدف</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${(sentCount / totalTarget) * 100}%` }]} />
            </View>
          </View>

          <View style={styles.campaignMiniStats}>
            <Text style={styles.miniStatText}>نجاح التسليم: <Text style={{color: '#16a34a', fontWeight: 'bold'}}>98.5%</Text></Text>
            <Text style={styles.miniStatText}>معدل الأمان الحركي: <Text style={{color: '#2563eb', fontWeight: 'bold'}}>مؤمن كلياً 🛡️</Text></Text>
          </View>
        </View>

        {/* ================= 2. صندوق كتابة وصناعة العرض التسويقي المطور ================= */}
        <Text style={styles.sectionTitle}>💬 تكوين الرسالة ونوع المحتوى الإعلاني</Text>
        <View style={styles.messageComposerCard}>
          
          <View style={styles.contentTypeSelectorRow}>
            <TouchableOpacity 
              style={[styles.typeBtn, contentType === 'video' && styles.typeBtnActiveVideo]} 
              onPress={() => { setContentType('video'); setAttachedMediaName(null); }}
            >
              <Film size={14} color={contentType === 'video' ? '#fff' : '#64748b'} style={{ marginLeft: 5 }} />
              <Text style={[styles.typeBtnText, contentType === 'video' && { color: '#fff' }]}>نص + فيديو</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.typeBtn, contentType === 'image' && styles.typeBtnActiveImage]} 
              onPress={() => { setContentType('image'); setAttachedMediaName(null); }}
            >
              <Image size={14} color={contentType === 'image' ? '#fff' : '#64748b'} style={{ marginLeft: 5 }} />
              <Text style={[styles.typeBtnText, contentType === 'image' && { color: '#fff' }]}>نص + صورة</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.typeBtn, contentType === 'text' && styles.typeBtnActiveText]} 
              onPress={() => { setContentType('text'); setAttachedMediaName(null); }}
            >
              <MessageCircle size={14} color={contentType === 'text' ? '#fff' : '#64748b'} style={{ marginLeft: 5 }} />
              <Text style={[styles.typeBtnText, contentType === 'text' && { color: '#fff' }]}>نص فقط</Text>
            </TouchableOpacity>
          </View>

          {contentType !== 'text' && (
            <View style={styles.mediaAttachmentWrapper}>
              <TouchableOpacity style={styles.selectMediaUploadBtn} onPress={handleSelectMedia} disabled={isSelectingMedia}>
                {isSelectingMedia ? (
                  <ActivityIndicator size="small" color="#d946ef" />
                ) : (
                  <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                    <Paperclip size={14} color="#d946ef" style={{ marginLeft: 6 }} />
                    <Text style={styles.selectMediaUploadBtnText}>
                      {attachedMediaName ? 'تغيير الملف المرفق 🔄' : `اختر ملف الـ ${contentType === 'image' ? 'صورة' : 'فيديو'} من الجهاز`}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
              {attachedMediaName && (
                <View style={styles.mediaNameBadge}>
                  <Text style={styles.mediaNameBadgeText} numberOfLines={1}>{attachedMediaName} ✅</Text>
                </View>
              )}
            </View>
          )}

          <TextInput 
            style={styles.messageInput}
            placeholder="اكتب هنا نص العرض التسويقي المرفق مع الحملة..."
            placeholderTextColor="#94a3b8"
            multiline={true}
            numberOfLines={4}
            value={messageText}
            onChangeText={setMessageText}
          />

          <Text style={styles.spintaxTitle}>✨ كبسولات التخصيص ومنع الحظر الذكي (تدرج تلقائياً):</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.spintaxScroll} contentContainerStyle={{flexDirection: 'row-reverse'}}>
            <TouchableOpacity style={styles.tagBadgeBtn} onPress={() => insertMessageTag('{customer_name}')}>
              <User size={12} color="#d946ef" style={{ marginLeft: 4 }} />
              <Text style={styles.tagBadgeText}>اسم العميل المراسِل</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tagBadgeBtn} onPress={() => insertMessageTag('{rand_code}')}>
              <Code size={12} color="#2563eb" style={{ marginLeft: 4 }} />
              <Text style={styles.tagBadgeText}>كود أمان عشوائي</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tagBadgeBtn} onPress={() => insertMessageTag('{time}')}>
              <Clock size={12} color="#10b981" style={{ marginLeft: 4 }} />
              <Text style={styles.tagBadgeText}>الوقت الحالي</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tagBadgeBtn} onPress={() => insertMessageTag('{date}')}>
              <Calendar size={12} color="#f59e0b" style={{ marginLeft: 4 }} />
              <Text style={styles.tagBadgeText}>تاريخ اليوم</Text>
            </TouchableOpacity>
          </ScrollView>

          <TouchableOpacity style={styles.saveTemplateBtn} onPress={handleSaveMessageTemplate}>
            <Save size={14} color="#a21caf" style={{ marginLeft: 4 }} />
            <Text style={styles.saveTemplateBtnText}>حفظ قالب الرسالة الحالي في الفولدر 💾</Text>
          </TouchableOpacity>
        </View>

        {/* ================= 3. الميزة الجديدة (1): جدولة حملات المراسلة تلقائياً ================= */}
        <View style={styles.sectionHeaderRow}>
          <CalendarDays size={18} color="#f59e0b" />
          <Text style={styles.sectionTitleMain}>⏰ جدولة الحملة تلقائياً (Campaign Scheduler)</Text>
        </View>

        <View style={styles.schedulerCard}>
          <View style={styles.schedulerSwitchRow}>
            <Text style={styles.schedulerLabel}>تفعيل إطلاق الحملة في وقت لاحق:</Text>
            <Switch 
              trackColor={{ false: '#cbd5e1', true: '#fef3c7' }}
              thumbColor={isScheduled ? '#f59e0b' : '#f1f5f9'}
              onValueChange={setIsScheduled}
              value={isScheduled}
            />
          </View>

          {isScheduled && (
            <View style={styles.schedulerInputsContainer}>
              <View style={styles.schedulerInputWrapper}>
                <Text style={styles.miniLabelText}>تاريخ الإرسال:</Text>
                <TextInput 
                  style={styles.schedulerInput}
                  value={scheduleDate}
                  onChangeText={setScheduleDate}
                  placeholder="YYYY-MM-DD"
                />
              </View>
              <View style={styles.schedulerInputWrapper}>
                <Text style={styles.miniLabelText}>وقت البدء (24h):</Text>
                <TextInput 
                  style={styles.schedulerInput}
                  value={scheduleTime}
                  onChangeText={setScheduleTime}
                  placeholder="HH:MM"
                />
              </View>
            </View>
          )}
        </View>

        {/* ================= 4. الميزة الجديدة (2): المجيب الآلي الذكي (Auto-Responder) ================= */}
        <View style={styles.sectionHeaderRow}>
          <Bot size={18} color="#d946ef" />
          <Text style={styles.sectionTitleMain}>🤖 الرد التلقائي الذكي على الكلمات المفتاحية</Text>
        </View>

        <View style={styles.autoResponderCard}>
          <View style={styles.schedulerSwitchRow}>
            <Text style={styles.schedulerLabel}>تشغيل البوت للرد التلقائي على العملاء حالياً:</Text>
            <Switch 
              trackColor={{ false: '#cbd5e1', true: '#f5d0fe' }}
              thumbColor={isAutoResponderActive ? '#d946ef' : '#f1f5f9'}
              onValueChange={setIsAutoResponderActive}
              value={isAutoResponderActive}
            />
          </View>

          {isAutoResponderActive && (
            <View style={styles.autoResponderContainer}>
              <Text style={styles.filterLabelDescription}>➕ إضافة قاعدة رد ذكية جديدة:</Text>
              <View style={styles.addRuleBoxRow}>
                <TextInput 
                  style={[styles.ruleInput, { flex: 0.35 }]} 
                  placeholder="الكلمة المفتاحية" 
                  placeholderTextColor="#94a3b8"
                  value={newKeyword}
                  onChangeText={setNewKeyword}
                />
                <TextInput 
                  style={[styles.ruleInput, { flex: 0.65 }]} 
                  placeholder="نص الرد الفوري التلقائي..." 
                  placeholderTextColor="#94a3b8"
                  value={newReply}
                  onChangeText={setNewReply}
                />
              </View>
              <TouchableOpacity style={styles.addRuleBtn} onPress={handleAddAutoResponseRule}>
                <Text style={styles.addRuleBtnText}>تثبيت قاعدة الرد التلقائي في النظام ⚡</Text>
              </TouchableOpacity>

              <Text style={styles.subSectionTitleInside}>📋 القواعد المفعلة حالياً في الذاكرة الحركية:</Text>
              {autoResponses.map((rule) => (
                <View key={rule.id} style={styles.ruleItemBadge}>
                  <Text style={styles.ruleKeywordText}>إذا كتب العميل: "{rule.keyword}"</Text>
                  <Text style={styles.ruleReplyText} numberOfLines={2}>يرد السيستم بـ: {rule.reply}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* ================= 5. فلاتر الفرز المتقدمة ونظام حماية الـ Messenger ================= */}
        <View style={styles.sectionHeaderRow}>
          <Filter size={18} color="#2563eb" />
          <Text style={styles.sectionTitleMain}>🎯 فلاتر الفرز المتقدمة وإعدادات الأمان والتصدير</Text>
        </View>

        <View style={styles.filterCard}>
          <Text style={styles.filterLabelDescription}>🎯 الفلترة الذكية بكلمة مفتاحية داخل المحادثات السابقة (مثل: السعر، بكام):</Text>
          <View style={styles.intentSearchBox}>
            <TextInput 
              style={styles.intentInput}
              placeholder="اكتب الكلمة المفتاحية للفرز الفوري (مثال: السعر)..."
              placeholderTextColor="#cbd5e1"
              value={intentQuery}
              onChangeText={setIntentQuery}
            />
            <Sparkles size={14} color="#d946ef" style={{ marginLeft: 6 }} />
          </View>

          <Text style={styles.filterLabelDescription}>🛡️ نظام حماية صندوق الوارد والـ Messenger:</Text>
          <View style={styles.safetyRowSwitch}>
            <TouchableOpacity 
              style={[styles.safetyBtn, safetyInterval === 'fast' && styles.safetyBtnFastActive]} 
              onPress={() => setSafetyInterval('fast')}
            >
              <Zap size={12} color={safetyInterval === 'fast' ? '#fff' : '#ef4444'} style={{ marginLeft: 4 }} />
              <Text style={[styles.safetyText, safetyInterval === 'fast' && { color: '#fff' }]}>سريع (مخاطرة)</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.safetyBtn, safetyInterval === 'safe' && styles.safetyBtnSafeActive]} 
              onPress={() => setSafetyInterval('safe')}
            >
              <MessageCircle size={12} color={safetyInterval === 'safe' ? '#fff' : '#16a34a'} style={{ marginLeft: 4 }} />
              <Text style={[styles.safetyText, safetyInterval === 'safe' && { color: '#fff' }]}>وضع آمن عشوائي</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.customDelayContainerRow}>
            <Text style={styles.miniLabelText}>الفاصل الزمني الثابت بين كل رسالة (بالثواني):</Text>
            <TextInput 
              style={styles.miniInput}
              placeholder="30"
              placeholderTextColor="#cbd5e1"
              keyboardType="numeric"
              value={customDelay}
              onChangeText={setCustomDelay}
            />
          </View>

          <TouchableOpacity style={styles.exportExcelBtn} onPress={handleExportInboxToExcel} disabled={isExporting}>
            {isExporting ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                <FileSpreadsheet size={16} color="#fff" style={{ marginLeft: 6 }} />
                <Text style={styles.exportExcelBtnText}>سحب وتصدير عملاء الـ Inbox لشيت Excel 📊</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* ================= 6. استعراض قائمة العملاء المراسِلين ================= */}
        <View style={styles.searchHeaderContainer}>
          <Text style={styles.sectionTitle}>👥 قائمة المحادثات المستهدفة للمراسلة ({conversations.length})</Text>
          <View style={styles.searchBarBox}>
            <TextInput 
              style={styles.searchInput}
              placeholder="ابحث باسم عميل محدد..."
              placeholderTextColor="#94a3b8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Search size={16} color="#94a3b8" style={{marginLeft: 6}} />
          </View>
        </View>

        {conversations.filter(c => c.name.includes(searchQuery) && c.lastIntent.includes(intentQuery)).map(convo => (
          <View key={convo.id} style={styles.convoCardItem}>
            <View style={styles.convoRightSide}>
              <View style={styles.avatarBox}>
                <MessageSquare size={16} color="#d946ef" />
              </View>
              <View style={{ alignItems: 'flex-end', marginRight: 10, flex: 1 }}>
                <Text style={styles.convoNameText} numberOfLines={1}>{convo.name}</Text>
                <Text style={styles.convoMetaText}>آخر محتوى شات: "{convo.lastIntent}" • {convo.lastActive}</Text>
              </View>
            </View>
            <Switch 
              trackColor={{ false: '#cbd5e1', true: '#f5d0fe' }}
              thumbColor={convo.selected ? '#d946ef' : '#f1f5f9'}
              onValueChange={() => toggleSelectConversation(convo.id)}
              value={convo.selected}
            />
          </View>
        ))}

        {/* ================= 7. سجل تقارير الإرسال اللحظي والمجيب الآلي ================= */}
        <Text style={styles.sectionTitle}>📊 السجل الحي لرسائل العروض الآن</Text>
        <View style={styles.logContainerBox}>
          <View style={styles.logRowDetail}>
            <CheckCircle2 size={14} color="#10b981" style={{ marginLeft: 8, marginTop: 2 }} />
            <View style={styles.logTextWrapper}>
              <Text style={styles.logMainText}>تم تسليم الرسالة بنجاح إلى العميل: [أحمد محمود] مخصصة باسمه ✅</Text>
              <Text style={styles.logSubText}>منذ ثانيتين • رمز الأمان المتغير: #3M_X9</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    alignItems: 'flex-end',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  headerSubtitle: {
    fontSize: 11.5,
    color: '#64748b',
    marginTop: 4,
    textAlign: 'right',
  },
  clientWelcomeText: {
    fontSize: 12,
    color: '#2563eb',
    fontWeight: '600',
    textAlign: 'right',
    marginTop: 6,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  notificationBanner: {
    backgroundColor: '#1e3a8a',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  notificationText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionHeaderRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 18,
  },
  sectionTitleMain: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
    marginRight: 6,
  },
  campaignCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 16,
    marginBottom: 20,
  },
  campaignHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusBadge: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 6,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  controlBtn: {
    padding: 8,
    borderRadius: 50,
  },
  progressContainer: {
    width: '100%',
  },
  progressLabelRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#d946ef',
  },
  progressCountText: {
    fontSize: 12,
    color: '#64748b',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#d946ef',
    borderRadius: 4,
    position: 'absolute',
    right: 0,
  },
  campaignMiniStats: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 10,
  },
  miniStatText: {
    fontSize: 11,
    color: '#475569',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'right',
    marginBottom: 12,
    marginTop: 10,
  },
  messageComposerCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 16,
    marginBottom: 5,
  },
  contentTypeSelectorRow: {
    flexDirection: 'row-reverse',
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
    padding: 4,
    marginBottom: 12,
  },
  typeBtn: {
    flex: 1,
    flexDirection: 'row-reverse',
    paddingVertical: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  typeBtnText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
  },
  typeBtnActiveText: { backgroundColor: '#2563eb' },
  typeBtnActiveImage: { backgroundColor: '#10b981' },
  typeBtnActiveVideo: { backgroundColor: '#d946ef' },
  mediaAttachmentWrapper: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  selectMediaUploadBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f5d0fe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  selectMediaUploadBtnText: {
    fontSize: 11.5,
    color: '#a21caf',
    fontWeight: '600',
  },
  mediaNameBadge: {
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#bbf7d0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    maxWidth: '55%',
  },
  mediaNameBadgeText: {
    fontSize: 11,
    color: '#16a34a',
    fontWeight: '500',
  },
  messageInput: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    padding: 12,
    fontSize: 13,
    color: '#0f172a',
    textAlign: 'right',
    height: 80,
    textAlignVertical: 'top',
  },
  spintaxTitle: {
    fontSize: 11,
    fontWeight: '500',
    color: '#475569',
    textAlign: 'right',
    marginTop: 12,
    marginBottom: 6,
  },
  spintaxScroll: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  tagBadgeBtn: {
    flexDirection: 'row-reverse',
    backgroundColor: '#fdf4ff',
    borderWidth: 1,
    borderColor: '#f5d0fe',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
    marginLeft: 8,
  },
  tagBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#a21caf',
  },
  saveTemplateBtn: {
    flexDirection: 'row-reverse',
    backgroundColor: '#fdf4ff',
    borderWidth: 1,
    borderColor: '#f5d0fe',
    borderRadius: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
  },
  saveTemplateBtnText: {
    fontSize: 12,
    color: '#a21caf',
    fontWeight: 'bold',
  },
  /* تنسيقات كارت الجدولة التلقائية */
  schedulerCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fde68a',
    padding: 16,
    marginBottom: 5,
  },
  schedulerSwitchRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  schedulerLabel: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#334155',
  },
  schedulerTransitionsContainer: {
    marginTop: 12,
  },
  schedulerInputsContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#fef3c7',
    paddingTop: 12,
  },
  schedulerInputWrapper: {
    width: '48%',
  },
  schedulerInput: {
    backgroundColor: '#fefbc3',
    borderWidth: 1,
    borderColor: '#fef08a',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 12.5,
    color: '#0f172a',
    textAlign: 'center',
    marginTop: 4,
  },
  /* تنسيقات كارت الرد التلقائي الذكي */
  autoResponderCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f5d0fe',
    padding: 16,
    marginBottom: 5,
  },
  autoResponderContainer: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#fdf4ff',
    paddingTop: 12,
  },
  addRuleBoxRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  ruleInput: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
    fontSize: 12,
    color: '#0f172a',
    textAlign: 'right',
    marginLeft: 6,
  },
  addRuleBtn: {
    backgroundColor: '#a21caf',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 14,
  },
  addRuleBtnText: {
    color: '#fff',
    fontSize: 11.5,
    fontWeight: 'bold',
  },
  subSectionTitleInside: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#475569',
    textAlign: 'right',
    marginBottom: 6,
  },
  ruleItemBadge: {
    backgroundColor: '#faf5ff',
    borderWidth: 1,
    borderColor: '#e9d5ff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 6,
  },
  ruleKeywordText: {
    fontSize: 11.5,
    fontWeight: 'bold',
    color: '#7e22ce',
    textAlign: 'right',
  },
  ruleReplyText: {
    fontSize: 11,
    color: '#5b21b6',
    textAlign: 'right',
    marginTop: 3,
  },
  filterCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    padding: 16,
    marginBottom: 20,
  },
  filterLabelDescription: {
    fontSize: 12,
    color: '#475569',
    textAlign: 'right',
    marginBottom: 8,
    marginTop: 2,
  },
  intentSearchBox: {
    flexDirection: 'row-reverse',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  intentInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 12.5,
    color: '#0f172a',
    textAlign: 'right',
  },
  safetyRowSwitch: {
    flexDirection: 'row-reverse',
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
    padding: 4,
    marginBottom: 12,
  },
  safetyBtn: {
    flex: 1,
    flexDirection: 'row-reverse',
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  safetyBtnSafeActive: { backgroundColor: '#16a34a' },
  safetyBtnFastActive: { backgroundColor: '#ef4444' },
  safetyText: {
    fontSize: 11.5,
    color: '#64748b',
    fontWeight: '600',
  },
  customDelayContainerRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 16,
    backgroundColor: '#f8fafc',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  miniLabelText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
    textAlign: 'right',
  },
  miniInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 13,
    color: '#0f172a',
    textAlign: 'center',
    width: 70,
  },
  exportExcelBtn: {
    backgroundColor: '#16a34a',
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exportExcelBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  searchHeaderContainer: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  searchBarBox: {
    flexDirection: 'row-reverse',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 2,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 12,
    color: '#0f172a',
    textAlign: 'right',
  },
  convoCardItem: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 12,
    marginBottom: 10,
  },
  convoRightSide: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    flex: 1,
    paddingLeft: 10,
  },
  avatarBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#fdf4ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  convoNameText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#334155',
    textAlign: 'right',
  },
  convoMetaText: {
    fontSize: 10.5,
    color: '#64748b',
    marginTop: 2,
    textAlign: 'right',
  },
  logContainerBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  logRowDetail: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  logTextWrapper: {
    flex: 1,
    alignItems: 'flex-end',
  },
  logMainText: {
    fontSize: 12,
    color: '#334155',
    textAlign: 'right',
    lineHeight: 16,
  },
  logSubText: {
    fontSize: 10,
    color: '#94a3b8',
    marginTop: 4,
  },
});