import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  TextInput, 
  Switch,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Users2, 
  FileText, 
  Play, 
  Pause, 
  Search, 
  CheckCircle2, 
  AlertTriangle,
  Image,
  RefreshCw,
  Globe,
  Sliders,
  Lock,
  Filter,
  Share2,
  Save,
  FileSpreadsheet,
  FolderOpen,
  UploadCloud,
  DownloadCloud,
  Code,
  Clock,
  Calendar,
  UserCheck
} from 'lucide-react-native';

const initialJoinedGroups = [
  { id: 'j1', name: 'جروب عقارات التجمع الخامس والرحاب', members: '145K', selected: true, isBlacklisted: false },
  { id: 'j2', name: 'تجار ملابس الجملة في مصر (العتبة والموسكي)', members: '92K', selected: true, isBlacklisted: false },
  { id: 'j3', name: 'جروب العائلة الشخصي (سرّي للغاية)', members: '18', selected: false, isBlacklisted: true }, // مثال لجروب مستبعد تلقائياً
];

const initialSavedFiles = [
  { id: 'f1', name: 'داتا_جروبات_العقارات_المفتوحة.xlsx', date: '2026-07-18', size: '24 KB', type: 'excel' },
  { id: 'f2', name: 'منشور_عرض_الجمعة_البيضاء.txt', date: '2026-07-15', size: '2 KB', type: 'post' },
];

export default function GroupsScreen() {
  const [joinedGroups, setJoinedGroups] = useState(initialJoinedGroups);
  const [joinedSearch, setJoinedSearch] = useState('');
  const [postText, setPostText] = useState('');
  const [postType, setPostType] = useState<'text' | 'image'>('text');
  
  // حالات حملة النشر
  const [isCampaignActive, setIsCampaignActive] = useState(false);
  const [postedCount, setPostedCount] = useState(14);
  const [totalTarget, setTotalTarget] = useState(45);

  // حالات محرك البحث العالمي
  const [globalKeyword, setGlobalKeyword] = useState('');
  const [privacyMode, setPrivacyMode] = useState<'all' | 'public' | 'private'>('all');
  const [isAutoApproveOnly, setIsAutoApproveOnly] = useState(false);
  const [minMembersCount, setMinMembersCount] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [globalSearchResults, setGlobalSearchResults] = useState<any[]>([]);

  // حالات مدير الملفات
  const [savedFiles, setSavedFiles] = useState(initialSavedFiles);
  const [fileMessage, setFileMessage] = useState('');

  const insertSpintaxTag = (tag: string) => {
    setPostText(prev => prev + " " + tag);
  };

  // دالة تفاعلية صايعة لتفعيل وإلغاء استبعاد الجروب (Blacklist Toggle)
  const toggleBlacklistGroup = (id: string) => {
    setJoinedGroups(prev => prev.map(g => {
      if (g.id === id) {
        return { 
          ...g, 
          isBlacklisted: !g.isBlacklisted, 
          selected: g.isBlacklisted ? g.selected : false // لو تم استبعاده شيل التحديد فوراً
        };
      }
      return g;
    }));
  };

  const toggleGroupSelect = (id: string) => {
    setJoinedGroups(prev => prev.map(g => g.id === id ? { ...g, selected: !g.selected } : g));
  };

  const handleGlobalSearch = () => {
    if (!globalKeyword) return;
    setIsSearching(true);
    
    setTimeout(() => {
      const mockResults = [
        { id: 'g1', name: `عقارات ومقاولات كبرى - ${globalKeyword}`, members: '250,400', privacy: 'public', autoApprove: true },
        { id: 'g2', name: `رابطة تجار ومصانع [${globalKeyword}] مصر`, members: '84,120', privacy: 'public', autoApprove: true },
        { id: 'g3', name: `كل ما يخص ${globalKeyword} شوبينج واستثمار`, members: '12,500', privacy: 'private', autoApprove: false },
        { id: 'g4', name: `جروب البيع والشراء لخدمات ${globalKeyword}`, members: '198,000', privacy: 'public', autoApprove: false },
      ];

      let filtered = mockResults;
      if (privacyMode !== 'all') {
        filtered = filtered.filter(g => g.privacy === privacyMode);
      }
      if (isAutoApproveOnly) {
        filtered = filtered.filter(g => g.autoApprove === true);
      }
      if (minMembersCount) {
        const minNum = parseInt(minMembersCount) || 0;
        filtered = filtered.filter(g => parseInt(g.members.replace(/,/g, '')) >= minNum);
      }

      setGlobalSearchResults(filtered);
      setIsSearching(false);
    }, 1200);
  };

  const handleExportToExcel = () => {
    if (globalSearchResults.length === 0) return;
    const fileName = `داتا_${globalKeyword || 'جروبات'}_${Date.now().toString().slice(-4)}.xlsx`;
    
    const newFile = {
      id: Date.now().toString(),
      name: fileName,
      date: new Date().toISOString().split('T')[0],
      size: `${globalSearchResults.length * 6} KB`,
      type: 'excel'
    };

    setSavedFiles([newFile, ...savedFiles]);
    setFileMessage(`📊 تم تصدير ${globalSearchResults.length} جروب بنجاح داخل فولدر الموبايل: /3M Poster FB/${fileName}`);
    setTimeout(() => setFileMessage(''), 5000);
  };

  const handleSavePost = () => {
    if (!postText) return;
    const fileName = `منشور_${postText.slice(0, 10).replace(/\s/g, '_')}.txt`;
    
    const newFile = {
      id: Date.now().toString(),
      name: fileName,
      date: new Date().toISOString().split('T')[0],
      size: '1 KB',
      type: 'post'
    };

    setSavedFiles([newFile, ...savedFiles]);
    setFileMessage(`💾 تم حفظ قالب المنشور بنجاح داخل فولدر الموبايل: /3M Poster FB/${fileName}`);
    setTimeout(() => setFileMessage(''), 5000);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>النشر والبحث المتقدم في الجروبات</Text>
        <Text style={styles.headerSubtitle}>إدارة النشر وسحب المجموعات المستهدفة بفلاتر أمان ذكية</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {fileMessage ? (
          <View style={styles.floatingNotification}>
            <Text style={styles.notificationText}>{fileMessage}</Text>
          </View>
        ) : null}

        {/* ================= محرك البحث والسحب العميق للمجموعات ================= */}
        <View style={styles.sectionHeaderRow}>
          <Sliders size={18} color="#f59e0b" />
          <Text style={styles.sectionTitleMain}>🔍 محرك البحث والسحب المتقدم للمجموعات (Global Scanner)</Text>
        </View>

        <View style={styles.globalSearchCard}>
          <Text style={styles.fieldLabelText}>اكتب الكلمة أو الكلمات المفتاحية (يدعم أي لغة):</Text>
          <View style={styles.searchBarContainer}>
            <TextInput 
              style={styles.searchInput}
              placeholder="مثال: عقارات، ملابس جملة، Real Estate..."
              placeholderTextColor="#94a3b8"
              value={globalKeyword}
              onChangeText={setGlobalKeyword}
            />
            <Search size={16} color="#f59e0b" style={styles.searchIcon} />
          </View>

          <Text style={styles.fieldLabelText}>⚙️ تخصيص فلاتر الفرز العميقة:</Text>
          
          <View style={styles.filterSwitchRow}>
            <TouchableOpacity style={[styles.filterSwitchBtn, privacyMode === 'private' && styles.filterSwitchActivePrivate]} onPress={() => setPrivacyMode('private')}>
              <Lock size={12} color={privacyMode === 'private' ? '#fff' : '#64748b'} style={{marginLeft: 4}} />
              <Text style={[styles.filterSwitchText, privacyMode === 'private' && {color: '#fff'}]}>مغلقة فقط</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.filterSwitchBtn, privacyMode === 'public' && styles.filterSwitchActivePublic]} onPress={() => setPrivacyMode('public')}>
              <Globe size={12} color={privacyMode === 'public' ? '#fff' : '#64748b'} style={{marginLeft: 4}} />
              <Text style={[styles.filterSwitchText, privacyMode === 'public' && {color: '#fff'}]}>عامة فقط</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.filterSwitchBtn, privacyMode === 'all' && styles.filterSwitchActiveAll]} onPress={() => setPrivacyMode('all')}>
              <Filter size={12} color={privacyMode === 'all' ? '#fff' : '#64748b'} style={{marginLeft: 4}} />
              <Text style={[styles.filterSwitchText, privacyMode === 'all' && {color: '#fff'}]}>عرض الكل</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.advancedOptionsRow}>
            <View style={styles.memberInputContainer}>
              <Text style={styles.miniLabelText}>الحد الأدنى للأعضاء:</Text>
              <TextInput 
                style={styles.miniInput}
                placeholder="مثال: 50000"
                placeholderTextColor="#cbd5e1"
                keyboardType="numeric"
                value={minMembersCount}
                onChangeText={setMinMembersCount}
              />
            </View>

            <View style={styles.toggleRowInline}>
              <Text style={styles.miniLabelText}>مفتوح النشر بدون موافقة أدمن:</Text>
              <Switch
                trackColor={{ false: '#cbd5e1', true: '#fef08a' }}
                thumbColor={isAutoApproveOnly ? '#d97706' : '#f1f5f9'}
                onValueChange={setIsAutoApproveOnly}
                value={isAutoApproveOnly}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.triggerSearchBtn} onPress={handleGlobalSearch} disabled={isSearching}>
            {isSearching ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                <RefreshCw size={16} color="#fff" style={{marginLeft: 6}} />
                <Text style={styles.triggerSearchBtnText}>ابدأ السحب والبحث العميق 🚀</Text>
              </View>
            )}
          </TouchableOpacity>

          {globalSearchResults.length > 0 && (
            <View style={styles.resultsWrapper}>
              <View style={styles.resultsHeaderExcelRow}>
                <TouchableOpacity style={styles.exportExcelBtn} onPress={handleExportToExcel}>
                  <FileSpreadsheet size={14} color="#fff" style={{ marginLeft: 4 }} />
                  <Text style={styles.exportExcelBtnText}>تصدير لشيت Excel 📊</Text>
                </TouchableOpacity>
                <Text style={styles.resultsCountTitle}>النتائج المستخرجة ({globalSearchResults.length}):</Text>
              </View>

              {globalSearchResults.map((g) => (
                <View key={g.id} style={styles.scrapedGroupCard}>
                  <View style={styles.scrapedInfoSide}>
                    <Text style={styles.scrapedGroupName} numberOfLines={1}>{g.name}</Text>
                    <Text style={styles.scrapedGroupMeta}>ID: {g.id.replace('g', '482019')} • 👥 {g.members} عضو • {g.privacy === 'public' ? 'عامة' : 'مغلقة'}</Text>
                  </View>
                  <View style={[styles.approvalBadge, g.autoApprove ? {backgroundColor: '#f0fdf4'} : {backgroundColor: '#fff7ed'}]}>
                    <Text style={[styles.approvalBadgeText, g.autoApprove ? {color: '#16a34a'} : {color: '#ea580c'}]}>
                      {g.autoApprove ? '🔓 تلقائي' : '🔒 أدمن'}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* ================= مستودع ملفات البرنامج ================= */}
        <View style={styles.sectionHeaderRow}>
          <FolderOpen size={18} color="#2563eb" />
          <Text style={styles.sectionTitleMain}>📁 مستودع ملفات البرنامج (3M Poster FB Storage)</Text>
        </View>

        <View style={styles.fileManagerCard}>
          <Text style={styles.fileCardDescription}>الملفات المحفوظة محلياً داخل فولدر التطبيق بالموبايل للفتح والاستيراد السريع:</Text>
          
          <View style={styles.fileActionTopButtons}>
            <TouchableOpacity style={styles.fileUtilBtn}>
              <UploadCloud size={14} color="#2563eb" style={{ marginLeft: 4 }} />
              <Text style={styles.fileUtilBtnText}>استيراد داتا خارجة</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.fileUtilBtn, { backgroundColor: '#f1f5f9', borderColor: '#e2e8f0' }]}>
              <DownloadCloud size={14} color="#475569" style={{ marginLeft: 4 }} />
              <Text style={[styles.fileUtilBtnText, { color: '#475569' }]}>تصدير الكل احتياطي</Text>
            </TouchableOpacity>
          </View>

          {savedFiles.map(file => (
            <View key={file.id} style={styles.fileRowItem}>
              <View style={styles.fileLeftActions}>
                <TouchableOpacity style={styles.openFileBtn}>
                  <Text style={styles.openFileBtnText}>فتح واستيراد</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.fileRightInfo}>
                <View style={styles.fileIconIndicator}>
                  {file.type === 'excel' ? <FileSpreadsheet size={16} color="#16a34a" /> : <FileText size={16} color="#2563eb" />}
                </View>
                <View style={{ alignItems: 'flex-end', marginRight: 8, flex: 1 }}>
                  <Text style={styles.fileNameText} numberOfLines={1}>{file.name}</Text>
                  <Text style={styles.fileMetaText}>التاريخ: {file.date} • الحجم: {file.size}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* ================= لوحة النشر والجدولة التلقائية بالجروبات ================= */}
        <View style={styles.sectionHeaderRow}>
          <Share2 size={18} color="#10b981" />
          <Text style={styles.sectionTitleMain}>لوحة النشر والجدولة التلقائية بالجروبات</Text>
        </View>

        <View style={[styles.campaignControlCard, isCampaignActive && { borderColor: '#10b981' }]}>
          <View style={styles.campaignHeaderRow}>
            <View style={styles.statusBadgeContainer}>
              <View style={[styles.statusDot, { backgroundColor: isCampaignActive ? '#10b981' : '#64748b' }]} />
              <Text style={styles.statusBadgeText}>
                {isCampaignActive ? 'حملة النشر تعمل حالياً...' : 'الحملة متوقفة'}
              </Text>
            </View>
            <TouchableOpacity 
              style={[styles.controlBtn, { backgroundColor: isCampaignActive ? '#fef2f2' : '#f0fdf4' }]}
              onPress={() => setIsCampaignActive(!isCampaignActive)}
            >
              {isCampaignActive ? <Pause size={16} color="#ef4444" /> : <Play size={16} color="#10b981" />}
            </TouchableOpacity>
          </View>

          <View style={styles.progressSection}>
            <View style={styles.progressLabelRow}>
              <Text style={styles.progressPercentage}>{Math.round((postedCount / totalTarget) * 100)}%</Text>
              <Text style={styles.progressCountText}>تم النشر في {postedCount} من أصل {totalTarget} جروب</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${(postedCount / totalTarget) * 100}%` }]} />
            </View>
          </View>
        </View>

        {/* ================= صندوق كتابة وصناعة المنشور مع خيار الحفظ والـ SpinTax ================= */}
        <Text style={styles.sectionTitle}>📝 اكتب منشورك التسويقي</Text>
        <View style={styles.postComposerCard}>
          <View style={styles.typeSelectorRow}>
            <TouchableOpacity style={[styles.typeBtn, postType === 'image' && styles.typeBtnActive]} onPress={() => setPostType('image')}>
              <Image size={14} color={postType === 'image' ? '#fff' : '#64748b'} style={{ marginLeft: 5 }} />
              <Text style={[styles.typeBtnText, postType === 'image' && { color: '#fff' }]}>بوست بصورة</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.typeBtn, postType === 'text' && styles.typeBtnActive]} onPress={() => setPostType('text')}>
              <FileText size={14} color={postType === 'text' ? '#fff' : '#64748b'} style={{ marginLeft: 5 }} />
              <Text style={[styles.typeBtnText, postType === 'text' && { color: '#fff' }]}>نص فقط</Text>
            </TouchableOpacity>
          </View>
          
          <TextInput
            style={styles.postInput}
            placeholder="اكتب تفاصيل الإعلان هنا..."
            placeholderTextColor="#94a3b8"
            multiline={true}
            numberOfLines={4}
            value={postText}
            onChangeText={setPostText}
          />

          <Text style={styles.spintaxLabelText}>✨ اضغط لإضافة متغير ديناميكي (يمنع الحظر ويخصص المنشور تلقائياً):</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.spintaxScrollRow} contentContainerStyle={{flexDirection: 'row-reverse'}}>
            <TouchableOpacity style={styles.spintaxTagBtn} onPress={() => insertSpintaxTag('{rand_code}')}>
              <Code size={12} color="#2563eb" style={{ marginLeft: 4 }} />
              <Text style={styles.spintaxTagText}>كود عشوائي</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.spintaxTagBtn} onPress={() => insertSpintaxTag('{time}')}>
              <Clock size={12} color="#d946ef" style={{ marginLeft: 4 }} />
              <Text style={styles.spintaxTagText}>الوقت الحالي</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.spintaxTagBtn} onPress={() => insertSpintaxTag('{date}')}>
              <Calendar size={12} color="#10b981" style={{ marginLeft: 4 }} />
              <Text style={styles.spintaxTagText}>تاريخ اليوم</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.spintaxTagBtn} onPress={() => insertSpintaxTag('{group_name}')}>
              <UserCheck size={12} color="#f59e0b" style={{ marginLeft: 4 }} />
              <Text style={styles.spintaxTagText}>اسم الجروب</Text>
            </TouchableOpacity>
          </ScrollView>

          <TouchableOpacity style={styles.savePostBtn} onPress={handleSavePost}>
            <Save size={14} color="#1e3a8a" style={{ marginLeft: 4 }} />
            <Text style={styles.savePostBtnText}>حفظ المنشور الحالي في الفولدر 💾</Text>
          </TouchableOpacity>
        </View>

        {/* ================= الجروبات المربوطة بالحساب مع ميزة الاستبعاد الملعوبة (Blacklist) ================= */}
        <View style={styles.groupsHeaderRow}>
          <Text style={styles.sectionTitle}>🎯 اختر مجموعاتك المربوطة للنشر والاستبعاد السوداء</Text>
          <View style={styles.searchBarContainer}>
            <TextInput 
              style={styles.searchInput}
              placeholder="ابحث في جروبات الحساب المربوطة..."
              placeholderTextColor="#94a3b8"
              value={joinedSearch}
              onChangeText={setJoinedSearch}
            />
            <Search size={16} color="#94a3b8" style={styles.searchIcon} />
          </View>
        </View>

        {joinedGroups.filter(g => g.name.includes(joinedSearch)).map(group => (
          <View key={group.id} style={[styles.groupItemCard, group.isBlacklisted && styles.groupBlacklistedCard]}>
            <View style={styles.groupInfoSide}>
              <View style={[styles.groupIconPlaceholder, group.isBlacklisted && { backgroundColor: '#fef2f2' }]}>
                <Users2 size={18} color={group.isBlacklisted ? '#ef4444' : '#2563eb'} />
              </View>
              <View style={{ alignItems: 'flex-end', marginRight: 10, flex: 1 }}>
                {/* شطب اسم الجروب لو مستبعد تكتيكياً */}
                <Text style={[styles.groupName, group.isBlacklisted && { color: '#94a3b8', textDecorationLine: 'line-through' }]} numberOfLines={1}>
                  {group.name}
                </Text>
                <Text style={styles.groupMembers}>
                  {group.isBlacklisted ? '🚫 مُستبعد نهائياً من كل حملات النشر والجدولة' : `عدد الأعضاء: ${group.members}`}
                </Text>
              </View>
            </View>
            
            <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
              <Switch
                trackColor={{ false: '#cbd5e1', true: '#bfdbfe' }}
                thumbColor={group.selected ? '#2563eb' : '#f1f5f9'}
                onValueChange={() => toggleGroupSelect(group.id)}
                value={group.selected}
                disabled={group.isBlacklisted} // قفل التحديد لو مستبعد
              />
              
              {/* زر الاستبعاد السريع والذكي */}
              <TouchableOpacity 
                style={[styles.blacklistToggleBtn, group.isBlacklisted ? styles.blacklistActiveBtn : styles.blacklistInactiveBtn]} 
                onPress={() => toggleBlacklistGroup(group.id)}
              >
                <Text style={[styles.blacklistToggleBtnText, group.isBlacklisted ? { color: '#fff' } : { color: '#ef4444' }]}>
                  {group.isBlacklisted ? 'إلغاء الحظر' : 'استبعاد 🚫'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* ================= سجل العمليات والتقارير الحية ================= */}
        <Text style={styles.sectionTitle}>📊 تقرير النشر والعمليات اللحظية</Text>
        <View style={styles.logBox}>
          <View style={styles.logItemRow}>
            <CheckCircle2 size={14} color="#10b981" style={{ marginLeft: 8, marginTop: 2 }} />
            <View style={styles.logTexts}>
              <Text style={styles.logMainText}>تم النشر بنجاح في: جروب عقارات التجمع الخامس والرحاب</Text>
              <Text style={styles.logTimeText}>منذ دقيقة • رابط المنشور جاهز 🔗</Text>
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
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  floatingNotification: {
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
    marginTop: 15,
  },
  sectionTitleMain: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
    marginRight: 6,
  },
  globalSearchCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fde68a',
    padding: 16,
    marginBottom: 20,
  },
  fieldLabelText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
    textAlign: 'right',
    marginBottom: 8,
    marginTop: 5,
  },
  filterSwitchRow: {
    flexDirection: 'row-reverse',
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
    padding: 4,
    marginBottom: 12,
  },
  filterSwitchBtn: {
    flex: 1,
    flexDirection: 'row-reverse',
    paddingVertical: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  filterSwitchActiveAll: { backgroundColor: '#475569' },
  filterSwitchActivePublic: { backgroundColor: '#2563eb' },
  filterSwitchActivePrivate: { backgroundColor: '#dc2626' },
  filterSwitchText: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '600',
  },
  advancedOptionsRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  memberInputContainer: {
    width: '45%',
    alignItems: 'flex-end',
  },
  miniLabelText: {
    fontSize: 11,
    color: '#64748b',
    marginBottom: 4,
    textAlign: 'right',
  },
  miniInput: {
    width: '100%',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 12,
    color: '#0f172a',
    textAlign: 'center',
  },
  toggleRowInline: {
    width: '50%',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  triggerSearchBtn: {
    backgroundColor: '#d97706',
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  triggerSearchBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  resultsWrapper: {
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 12,
  },
  resultsHeaderExcelRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  exportExcelBtn: {
    flexDirection: 'row-reverse',
    backgroundColor: '#16a34a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  exportExcelBtnText: {
    color: '#fff',
    fontSize: 11.5,
    fontWeight: 'bold',
  },
  resultsCountTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#b45309',
    textAlign: 'right',
  },
  scrapedGroupCard: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff9db',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fef08a',
    padding: 10,
    marginBottom: 8,
  },
  scrapedInfoSide: {
    flex: 1,
    alignItems: 'flex-end',
    paddingLeft: 8,
  },
  scrapedGroupName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0f172a',
    textAlign: 'right',
  },
  scrapedGroupMeta: {
    fontSize: 10.5,
    color: '#64748b',
    marginTop: 2,
  },
  approvalBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  approvalBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  fileManagerCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    padding: 16,
    marginBottom: 20,
  },
  fileCardDescription: {
    fontSize: 11.5,
    color: '#475569',
    textAlign: 'right',
    lineHeight: 16,
    marginBottom: 12,
  },
  fileActionTopButtons: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  fileUtilBtn: {
    flex: 1,
    flexDirection: 'row-reverse',
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#bfdbfe',
    borderRadius: 8,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  fileUtilBtnText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#2563eb',
  },
  fileRowItem: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  fileRightInfo: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    flex: 1,
  },
  fileIconIndicator: {
    width: 30,
    height: 30,
    borderRadius: 6,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileNameText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#334155',
    textAlign: 'right',
  },
  fileMetaText: {
    fontSize: 10,
    color: '#94a3b8',
    marginTop: 2,
  },
  openFileBtn: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  openFileBtnText: {
    fontSize: 11,
    color: '#2563eb',
    fontWeight: '600',
  },
  campaignControlCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 16,
    marginBottom: 20,
  },
  campaignHeaderRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusBadgeContainer: {
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
  progressSection: {
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
    color: '#2563eb',
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
    backgroundColor: '#2563eb',
    borderRadius: 4,
    position: 'absolute',
    right: 0,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'right',
    marginBottom: 12,
    marginTop: 10,
  },
  postComposerCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 16,
    marginBottom: 20,
  },
  typeSelectorRow: {
    flexDirection: 'row-reverse',
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
    padding: 4,
    marginBottom: 12,
  },
  typeBtn: {
    flex: 1,
    flexDirection: 'row-reverse',
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  typeBtnActive: {
    backgroundColor: '#2563eb',
  },
  typeBtnText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
  },
  postInput: {
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
  spintaxLabelText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#475569',
    textAlign: 'right',
    marginTop: 10,
    marginBottom: 6,
  },
  spintaxScrollRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  spintaxTagBtn: {
    flexDirection: 'row-reverse',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
    marginLeft: 8,
  },
  spintaxTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#334155',
  },
  savePostBtn: {
    flexDirection: 'row-reverse',
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#bfdbfe',
    borderRadius: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  savePostBtnText: {
    fontSize: 12,
    color: '#1e3a8a',
    fontWeight: 'bold',
  },
  groupsHeaderRow: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  searchBarContainer: {
    flexDirection: 'row-reverse',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 5,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 12,
    color: '#0f172a',
    textAlign: 'right',
  },
  searchIcon: {
    marginLeft: 6,
  },
  groupItemCard: {
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
  /* تنسيقات ميزة كروت الاستبعاد الذكية المضافة */
  groupBlacklistedCard: {
    borderColor: '#fecaca',
    backgroundColor: '#fef2f2',
  },
  blacklistToggleBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
    borderWidth: 1,
  },
  blacklistActiveBtn: {
    backgroundColor: '#ef4444',
    borderColor: '#ef4444',
  },
  blacklistInactiveBtn: {
    backgroundColor: '#fff',
    borderColor: '#fecaca',
  },
  blacklistToggleBtnText: {
    fontSize: 10.5,
    fontWeight: '600',
  },
  groupInfoSide: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    flex: 1,
    paddingLeft: 10,
  },
  groupIconPlaceholder: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#334155',
    textAlign: 'right',
  },
  groupMembers: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
  },
  logBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  logItemRow: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  logTexts: {
    flex: 1,
    alignItems: 'flex-end',
  },
  logMainText: {
    fontSize: 12,
    color: '#334155',
    textAlign: 'right',
    lineHeight: 16,
  },
  logTimeText: {
    fontSize: 10,
    color: '#94a3b8',
    marginTop: 4,
  },
});