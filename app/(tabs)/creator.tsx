import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  TextInput, 
  Switch,
  ActivityIndicator,
  Modal,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Sparkles, 
  Eye, 
  Save, 
  X, 
  Image as ImageIcon, 
  Info,
  AlertTriangle,
  // أيقونات الشريط السفلي المستقرة والمميزة بالألوان
  Grid,          // الجروبات
  MessageSquare, // الرسائل
  Edit3,         // صانع المحتوى (Creator)
  Users,         // الحسابات (Accounts)
  Settings,      // الإعدادات (Settings)
  Activity       // الحملات (Campaigns)
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function CreatorScreen() {
  const [postText, setPostText] = useState('');
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // إعدادات الحماية والأمان
  const [enableWatermark, setEnableWatermark] = useState(false);
  const [stripMetadata, setStripMetadata] = useState(true); 
  const [firstCommentLink, setFirstCommentLink] = useState(false);

  // حالات المعاينة والتحليلات اللحظية
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [finalPreviewText, setFinalPreviewText] = useState('');
  const [flaggedWords, setFlaggedWords] = useState<string[]>([]);
  const [possibleVariants, setPossibleVariants] = useState(1);

  // الكلمات التي تسبب تدقيقاً أمنياً من خوارزميات فيسبوك
  const bannedKeywords = ['ربح', 'فلوس', 'مضمون', 'تخسيس', 'كاش', 'دولار'];

  // تأثير الفحص اللحظي للنص
  useEffect(() => {
    const foundFlags = bannedKeywords.filter(word => postText.includes(word));
    setFlaggedWords(foundFlags);

    const spintaxRegex = /\{([^}]+)\}/g;
    let match;
    let count = 1;
    let hasSpintax = false;

    while ((match = spintaxRegex.exec(postText)) !== null) {
      const options = match[1].split('|');
      if (options.length > 1) {
        count *= options.length;
        hasSpintax = true;
      }
    }
    setPossibleVariants(hasSpintax ? count : 1);
  }, [postText]);

  const insertPlaceholder = (placeholder: string) => {
    setPostText(prev => prev + " " + placeholder);
  };

  const handleAddImage = () => {
    setIsProcessingImage(true);
    setTimeout(() => {
      setAttachedImage('🔥_صورة_العرض_التسويقي_المطهر.jpg');
      setIsProcessingImage(false);
      if (stripMetadata) {
        setStatusMessage('🛡️ تم إرفاق الصورة وتطهير الميتاداتا العميقة فوراً لمراوغة فلاتر فيسبوك!');
        setTimeout(() => setStatusMessage(''), 5000);
      }
    }, 800);
  };

  const handleSaveTemplate = () => {
    if (!postText.trim()) return;
    setStatusMessage('💾 تم حفظ قالب المنشور بنجاح وجاهز للاستخدام في الحملات.');
    setTimeout(() => setStatusMessage(''), 4000);
  };

  const handlePreviewPost = () => {
    if (!postText.trim()) {
      setFinalPreviewText('⚠️ صندوق الكتابة فارغ! اكتب نصاً أو استخدم السبنتاكس أولاً لتتمكن من المعاينة.');
      setIsPreviewVisible(true);
      return;
    }
    
    let preview = postText;
    preview = preview.replace(/{group_name}/g, 'جروب عقارات ومحلات القاهرة 🏢');
    preview = preview.replace(/{account_name}/g, 'Mohamed Mahmoud Ali');
    preview = preview.replace(/{date}/g, '2026-07-18');
    preview = preview.replace(/{time}/g, '02:30 AM');
    preview = preview.replace(/{random_number}/g, Math.floor(10000 + Math.random() * 90000).toString());
    preview = preview.replace(/{random_emoji}/g, '🔥🚀✨');
    
    const spintaxRegex = /\{([^}]+)\}/g;
    preview = preview.replace(spintaxRegex, (match, choicesStr) => {
      if (choicesStr.includes('|')) {
        const choices = choicesStr.split('|');
        return choices[Math.floor(Math.random() * choices.length)];
      }
      return match; 
    });
    
    setFinalPreviewText(preview);
    setIsPreviewVisible(true);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* الهيدر */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>صانع وتنسيق المحتوى الذكي</Text>
        <Text style={styles.headerSubtitle}>صمم عروضك الإعلانية، واكسر نمط التكرار لمنع حظر الحسابات</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {statusMessage ? (
          <View style={styles.notificationBanner}>
            <Text style={styles.notificationText}>{statusMessage}</Text>
          </View>
        ) : null}

        {/* ================= 1. صندوق محرر النصوص الرئيسي والـ SpinTax ================= */}
        <View style={styles.mainComposerCard}>
          <Text style={styles.boxTitleLabel}>📝 نص المنشور الإعلاني (Post Content):</Text>
          <TextInput
            style={styles.textAreaInput}
            placeholder="اكتب منشورك هنا... يمكنك استخدام ميزة السبنتاكس لإنتاج نصوص متغيرة تلقائياً مثل: {أهلاً بك|مرحباً بك|أهلاً يا فنان}..."
            placeholderTextColor="#94a3b8"
            multiline={true}
            numberOfLines={6}
            value={postText}
            onChangeText={setPostText}
          />

          <View style={styles.spintaxInstructionBanner}>
            <Sparkles size={16} color="#7e22ce" style={{ marginLeft: 8 }} />
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={styles.spintaxBannerTitle}>ميزة الـ SpinTax العشوائي مفعّلة</Text>
              <Text style={styles.spintaxBannerSubtitle}>استخدم النمط {'{option1|option2|option3}'} لتوليد مفردات متغيرة تلقائياً مع كل عملية نشر.</Text>
            </View>
          </View>
        </View>

        {/* ================= لوحة فحص ذكاء النص والأمان اللحظي ================= */}
        <View style={styles.analyticsRowBox}>
          <View style={styles.miniAnalyticCard}>
            <Text style={styles.analyticTitle}>النسخ الفريدة المتاحة</Text>
            <Text style={[styles.analyticValue, { color: possibleVariants > 1 ? '#16a34a' : '#475569' }]}>
              {possibleVariants} نسخة فريدة 📊
            </Text>
          </View>

          <View style={[styles.miniAnalyticCard, flaggedWords.length > 0 && { borderColor: '#f87171', backgroundColor: '#fef2f2' }]}>
            <Text style={styles.analyticTitle}>مؤشر خطر الحظر الذكي</Text>
            {flaggedWords.length > 0 ? (
              <View style={{ flexDirection: 'row-reverse', alignItems: 'center', marginTop: 4 }}>
                <AlertTriangle size={14} color="#ef4444" style={{ marginLeft: 4 }} />
                <Text style={styles.dangerAlertValueText}>خطر ({flaggedWords.length} كلمات مكشوفة)</Text>
              </View>
            ) : (
              <Text style={[styles.analyticValue, { color: '#2563eb' }]}>آمن وممتاز 🛡️</Text>
            )}
          </View>
        </View>

        {flaggedWords.length > 0 && (
          <View style={styles.flaggedDetailsBanner}>
            <Text style={styles.flaggedDetailsText}>
              ⚠️ تنبيه أمان: الكلمات التالية قد تسبب حظر منشورك: {flaggedWords.map(w => `[${w}] `)} ينصح باستبدالها بمرادفات لتفادي الرقابة.
            </Text>
          </View>
        )}

        {/* ================= 2. الأكواد الديناميكية والمتغيرات ================= */}
        <Text style={styles.sectionTitle}>✨ متغيرات عشوائية وديناميكية (اضغط للإدراج الفوري):</Text>
        <View style={styles.placeholdersGridContainer}>
          <TouchableOpacity style={styles.placeholderBadgeBtn} onPress={() => insertPlaceholder('{group_name}')}>
            <Text style={styles.badgeCodeText}>{'{group_name}'}</Text>
            <Text style={styles.badgeDescText}>اسم المجموعة المستهدفة تلقائياً</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.placeholderBadgeBtn} onPress={() => insertPlaceholder('{account_name}')}>
            <Text style={styles.badgeCodeText}>{'{account_name}'}</Text>
            <Text style={styles.badgeDescText}>اسم حساب فيسبوك الناشر حالياً</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.placeholderBadgeBtn} onPress={() => insertPlaceholder('{date}')}>
            <Text style={styles.badgeCodeText}>{'{date}'}</Text>
            <Text style={styles.badgeDescText}>تاريخ اليوم الحالي تلقائياً</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.placeholderBadgeBtn} onPress={() => insertPlaceholder('{time}')}>
            <Text style={styles.badgeCodeText}>{'{time}'}</Text>
            <Text style={styles.badgeDescText}>وقت النشر الفعلي واللحظي</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.placeholderBadgeBtn} onPress={() => insertPlaceholder('{random_number}')}>
            <Text style={styles.badgeCodeText}>{'{random_number}'}</Text>
            <Text style={styles.badgeDescText}>رقم عشوائي فريد لمنع التطابق (0-99999)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.placeholderBadgeBtn} onPress={() => insertPlaceholder('{random_emoji}')}>
            <Text style={styles.badgeCodeText}>{'{random_emoji}'}</Text>
            <Text style={styles.badgeDescText}>إيموجي متغير عشوائياً في نهاية النص</Text>
          </TouchableOpacity>
        </View>

        {/* ================= 3. المرفقات وميديا الإعلان ================= */}
        <Text style={styles.sectionTitle}>🖼️ المرفقات وملفات الوسائط الإعلانية:</Text>
        <View style={styles.mediaAttachmentCard}>
          {attachedImage ? (
            <View style={styles.imageAttachedRow}>
              <TouchableOpacity style={styles.removeImageBtn} onPress={() => setAttachedImage(null)}>
                <X size={16} color="#ef4444" />
              </TouchableOpacity>
              <Text style={styles.imageNameText} numberOfLines={1}>{attachedImage}</Text>
              <ImageIcon size={18} color="#16a34a" style={{ marginLeft: 8 }} />
            </View>
          ) : (
            <Text style={styles.noMediaText}>لم يتم إرفاق أي صورة أو فيديو حتى الآن كـ ميديا للمنشور</Text>
          )}

          <TouchableOpacity style={styles.uploadImageTriggerBtn} onPress={handleAddImage} disabled={isProcessingImage}>
            {isProcessingImage ? (
              <ActivityIndicator size="small" color="#2563eb" />
            ) : (
              <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                <ImageIcon size={16} color="#2563eb" style={{ marginLeft: 6 }} />
                <Text style={styles.uploadImageTriggerBtnText}>إضافة صورة إعلانية من الاستوديو (Add Image)</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* ================= 4. إعدادات تخطي الخوارزميات ================= */}
        <Text style={styles.sectionTitle}>⚙️ إعدادات الحماية والأمان وتخطي فلاتر الرقابة (Settings):</Text>
        <View style={styles.advancedSettingsCardContainer}>
          <View style={styles.settingSwitchRow}>
            <View style={styles.switchLabelWrapper}>
              <Text style={styles.mainSwitchLabel}>إضافة علامة مائية ذكية تلقائياً (Enable Watermark)</Text>
              <Text style={styles.subSwitchLabel}>يقوم السيستم بدمج لوجو خفيف غير مرئي على الصورة لتغيير بصمتها البرمجية.</Text>
            </View>
            <Switch trackColor={{ false: '#cbd5e1', true: '#bfdbfe' }} thumbColor={enableWatermark ? '#2563eb' : '#f1f5f9'} onValueChange={setEnableWatermark} value={enableWatermark} />
          </View>

          <View style={styles.settingSwitchRow}>
            <View style={styles.switchLabelWrapper}>
              <Text style={styles.mainSwitchLabel}>تطهير بيانات الصورة المخفية (Strip Image Metadata)</Text>
              <Text style={styles.subSwitchLabel}>حذف الـ EXIF وتفاصيل الموقع الجغرافي من الصورة لتبدو جديدة تماماً لفيسبوك.</Text>
            </View>
            <Switch trackColor={{ false: '#cbd5e1', true: '#bbf7d0' }} thumbColor={stripMetadata ? '#16a34a' : '#f1f5f9'} onValueChange={setStripMetadata} value={stripMetadata} />
          </View>

          <View style={styles.settingSwitchRow}>
            <View style={styles.switchLabelWrapper}>
              <Text style={styles.mainSwitchLabel}>إدراج الرابط التسويقي في أول تعليق (First Comment Link)</Text>
              <Text style={styles.subSwitchLabel}>نشر الرابط الدعائي في التعليقات تلقائياً بدلاً من جسم المنشور لتجنب الحظر ولرفع معدل الـ Reach.</Text>
            </View>
            <Switch trackColor={{ false: '#cbd5e1', true: '#f5d0fe' }} thumbColor={firstCommentLink ? '#d946ef' : '#f1f5f9'} onValueChange={setFirstCommentLink} value={firstCommentLink} />
          </View>
        </View>

        {/* ================= 5. أزرار التحكم السفلية ================= */}
        <View style={styles.actionFooterActionRow}>
          <TouchableOpacity style={styles.previewFooterBtn} onPress={handlePreviewPost}>
            <Eye size={16} color="#1e3a8a" style={{ marginLeft: 6 }} />
            <Text style={styles.previewFooterBtnText}>معاينة تفكيك السبنتاكس 👁️</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveFooterBtn} onPress={handleSaveTemplate}>
            <Save size={16} color="#fff" style={{ marginLeft: 6 }} />
            <Text style={styles.saveFooterBtnText}>حفظ القالب الجديد 💾</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 110 }} /> {/* مساحة فارغة مريحة تمنع التداخل */}
      </ScrollView>

      {/* ================= 6. نافذة المعاينة الاحترافية المنبثقة ================= */}
      <Modal animationType="fade" transparent={true} visible={isPreviewVisible} onRequestClose={() => setIsPreviewVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContentBox}>
            <View style={styles.modalHeaderRow}>
              <TouchableOpacity onPress={() => setIsPreviewVisible(false)} style={styles.closeModalBtn}>
                <X size={18} color="#64748b" />
              </TouchableOpacity>
              <Text style={styles.modalHeaderTitle}>👁️ نسخة المعاينة الحية العشوائية</Text>
            </View>
            <ScrollView style={styles.modalTextScroll} showsVerticalScrollIndicator={true}>
              <Text style={styles.modalFinalTextDisplay}>{finalPreviewText}</Text>
              {attachedImage && postText.trim() && (
                <View style={styles.modalMediaBadgePreview}>
                  <ImageIcon size={14} color="#16a34a" style={{ marginLeft: 6 }} />
                  <Text style={styles.modalMediaPreviewText} numberOfLines={1}>الميديا المرفقة: {attachedImage}</Text>
                </View>
              )}
            </ScrollView>
            <TouchableOpacity style={styles.dismissModalFullBtn} onPress={() => setIsPreviewVisible(false)}>
              <Text style={styles.dismissModalFullBtnText}>إغلاق نافذة المعاينة</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ================= 7. تصميم شريب الأيقونات المودرن المتناسق ================= */}
      

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
    paddingBottom: 20,
  },
  notificationBanner: {
    backgroundColor: '#16a34a',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  notificationText: {
    color: '#fff',
    fontSize: 11.5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mainComposerCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 16,
    marginBottom: 12,
  },
  boxTitleLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#334155',
    textAlign: 'right',
    marginBottom: 8,
  },
  textAreaInput: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    padding: 12,
    fontSize: 13.5,
    color: '#0f172a',
    textAlign: 'right',
    height: 120,
    textAlignVertical: 'top',
  },
  spintaxInstructionBanner: {
    flexDirection: 'row-reverse',
    backgroundColor: '#fdf4ff',
    borderWidth: 1,
    borderColor: '#f5d0fe',
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
    alignItems: 'center',
  },
  spintaxBannerTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#7e22ce',
    textAlign: 'right',
  },
  spintaxBannerSubtitle: {
    fontSize: 10.5,
    color: '#a21caf',
    textAlign: 'right',
    marginTop: 2,
    lineHeight: 15,
  },
  analyticsRowBox: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  miniAnalyticCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 12,
    width: '48.5%',
    alignItems: 'flex-end',
  },
  analyticTitle: {
    fontSize: 10.5,
    color: '#64748b',
    fontWeight: '500',
  },
  analyticValue: {
    fontSize: 12.5,
    fontWeight: 'bold',
    marginTop: 4,
  },
  dangerAlertValueText: {
    fontSize: 11.5,
    fontWeight: 'bold',
    color: '#ef4444',
  },
  flaggedDetailsBanner: {
    backgroundColor: '#fff1f2',
    borderWidth: 1,
    borderColor: '#fecdd3',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  flaggedDetailsText: {
    fontSize: 11,
    color: '#991b1b',
    textAlign: 'right',
    lineHeight: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'right',
    marginBottom: 10,
    marginTop: 8,
  },
  placeholdersGridContainer: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  placeholderBadgeBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 10,
    width: '48.5%',
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  badgeCodeText: {
    fontSize: 12.5,
    fontWeight: 'bold',
    color: '#2563eb',
    textAlign: 'right',
  },
  badgeDescText: {
    fontSize: 10,
    color: '#64748b',
    textAlign: 'right',
    marginTop: 4,
  },
  mediaAttachmentCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 14,
    marginBottom: 12,
  },
  noMediaText: {
    fontSize: 11.5,
    color: '#94a3b8',
    textAlign: 'center',
    marginVertical: 10,
  },
  imageAttachedRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#bbf7d0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  removeImageBtn: {
    padding: 4,
    backgroundColor: '#fff',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fca5a5',
  },
  imageNameText: {
    flex: 1,
    fontSize: 11.5,
    color: '#16a34a',
    textAlign: 'right',
    marginRight: 8,
    fontWeight: '500',
  },
  uploadImageTriggerBtn: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#bfdbfe',
    borderRadius: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadImageTriggerBtnText: {
    fontSize: 12,
    color: '#2563eb',
    fontWeight: 'bold',
  },
  advancedSettingsCardContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 16,
    marginBottom: 15,
  },
  settingSwitchRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  switchLabelWrapper: {
    flex: 1,
    alignItems: 'flex-end',
    paddingLeft: 15,
  },
  mainSwitchLabel: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#334155',
    textAlign: 'right',
  },
  subSwitchLabel: {
    fontSize: 10.5,
    color: '#64748b',
    textAlign: 'right',
    marginTop: 4,
    lineHeight: 15,
  },
  actionFooterActionRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  previewFooterBtn: {
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#bfdbfe',
    borderRadius: 12,
    paddingVertical: 14,
    width: '48%',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewFooterBtnText: {
    fontSize: 13,
    color: '#1e3a8a',
    fontWeight: 'bold',
  },
  saveFooterBtn: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 14,
    width: '48%',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveFooterBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContentBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '100%',
    maxHeight: '80%',
    padding: 20,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingBottom: 12,
    marginBottom: 15,
  },
  closeModalBtn: {
    padding: 6,
    backgroundColor: '#f1f5f9',
    borderRadius: 50,
  },
  modalHeaderTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  modalTextScroll: {
    maxHeight: 300,
    marginBottom: 15,
  },
  modalFinalTextDisplay: {
    fontSize: 14,
    color: '#334155',
    textAlign: 'right',
    lineHeight: 22,
    backgroundColor: '#f8fafc',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  modalMediaBadgePreview: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#bbf7d0',
    borderRadius: 8,
    padding: 8,
    marginTop: 10,
  },
  modalMediaPreviewText: {
    fontSize: 11.5,
    color: '#16a34a',
    fontWeight: '600',
  },
  dismissModalFullBtn: {
    backgroundColor: '#1e3a8a',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  dismissModalFullBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },

  /* شريط التنقل السفلي الاحترافي المحدث */
  premiumBottomTabBarContainer: {
    position: 'absolute',
    bottom: 15,
    left: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.96)', 
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
    shadowColor: '#1e3a8a',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8, 
  },
  tabBarItemBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: (width - 40) / 6, 
    position: 'relative',
  },
  tabBarItemBtnActive: {
    transform: [{ translateY: -4 }], 
  },
  activeIconBubbleGlow: {
    backgroundColor: '#1e3a8a', 
    padding: 10,
    borderRadius: 16,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  tabBarItemText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#94a3b8',
    marginTop: 4,
  },
  tabBarItemTextActive: {
    color: '#1e3a8a',
    fontWeight: 'bold',
  },
  tabBadgeCounterFloating: {
    position: 'absolute',
    top: -5,
    right: 12,
    backgroundColor: '#d946ef', 
    borderRadius: 10,
    minWidth: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    paddingHorizontal: 3,
  },
  tabBadgeCounterText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
  }
});