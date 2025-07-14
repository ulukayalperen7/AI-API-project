# Proje Analizi ve Gereksinimleri: AI Content Lab

## 1. Proje Vizyonu ve Pazar Farklılığı

**AI Content Lab**, modern içerik üreticileri, pazarlamacılar ve ajanslar için tasarlanmış, çok-modlu (multi-modal) bir yapay zeka analiz platformudur. Geleneksel araçlar metni ve görseli ayrı ayrı analiz ederken, bizim projemiz bu iki dünyayı birleştirerek şu kritik soruyu cevaplar: **"Bu görsel ve bu metin BİRLİKTE ne anlama geliyor?"**

Projenin temel amacı; sadece analiz yapmak değil, bu analizleri eyleme dönüştürülebilir, yaratıcı ve stratejik çıktılara çevirerek kullanıcılara rekabet avantajı sağlamaktır. Platform, bir "sohbet arayüzü" olmanın ötesinde, belirli görevleri otomatikleştiren, yapısal ve güvenilir sonuçlar üreten profesyonel bir **araç (tool)** olarak konumlandırılmıştır.

## 2. Platformun Ana Yetenekleri ve Özellikleri

Platform, kullanıcının ihtiyaçlarına göre esneklik sunan üç ana modül üzerine inşa edilmiştir:

#### Modül 1: Metin Laboratuvarı 📝
*Kullanıcının sadece metin tabanlı analizler yaptığı alan.*
*   **Derinlemesine Özetleme:** Metni, farklı detay seviyelerinde (tek cümle, ana fikir, detaylı paragraf) özetler.
*   **Kavramsal Anahtar Kelime Çıkarımı:** Metindeki basit kelimeler yerine soyut konseptleri ve temaları tespit eder.
*   **Çok Katmanlı Duygu Analizi:** Metnin pozitif/negatif tonuna ek olarak `[Heyecan, Güven, Merak]` gibi spesifik duyguları ve yoğunluklarını raporlar.
*   **Yaratıcı Başlık ve Slogan Üretimi:** Verilen metnin özüne uygun, farklı pazarlama üsluplarında (`[Profesyonel, Esprili, Dikkat Çekici]`) başlıklar önerir.
*   **Metin İyileştirme ve Yeniden Yazma:** Metni farklı amaçlara göre yeniden formüle eder ("Daha akıcı yap", "Daha profesyonel yap").
*   **Hedef Kitle Tespiti:** Metnin diline bakarak hitap ettiği demografik grubu ve ilgi alanını tahmin eder.

#### Modül 2: Görsel Laboratuvarı 🖼️
*Kullanıcının sadece görsel tabanlı analizler yaptığı alan.*
*   **Akıllı Sahne ve Nesne Tanımlama:** Görseldeki nesneleri ve sahnenin genel bağlamını açıklar.
*   **Otomatik Açıklama ve Hikaye Üretme:** Görseli anlatan bir cümlelik açıklamaya ek olarak, o anın hissini veya hikayesini anlatan yaratıcı metinler üretir.
*   **Viral Hashtag ve Sosyal Medya Metni Üretici:** Görseli ve güncel trendleri analiz ederek etkileşim potansiyeli yüksek `#hashtag` ve gönderi metinleri önerir.
*   **Görsel Estetik ve Duygu Analizi:** Görselin renk paletini, kompozisyonunu ve uyandırdığı `[Huzur, Adrenalin, Lüks]` gibi duyguları analiz eder.
*   **Görüntüden Metin Okuma (OCR):** Resim içerisindeki yazıları okuyarak metin formatına dönüştürür.

#### Modül 3: Sentez Laboratuvarı ✨ (Projenin En Özgün Alanı)
*Kullanıcının hem görsel hem de metin vererek ikisi arasındaki ilişkiyi analiz ettirdiği alan.*
*   **Kapsamlı Görsel-Metin Uyum Analizi:** 1-100 arası bir uyum skoru verir ve bu skorun nedenlerini ("Görseldeki ürünün premium algısı, metindeki 'hesaplı' kelimesiyle çelişiyor.") detaylı bir şekilde açıklar.
*   **Bütünsel Konsept Çıkarımı:** İki girdinin birleşiminden ortaya çıkan soyut "büyük resmi" tespit eder ("Bu içerik, 'şehir hayatından kaçış' temasını işliyor.").
*   **Çok-Modlu İçerik Dönüşümü:** Bir görsel ve metinden yola çıkarak yepyeni formatlarda içerikler (blog yazısı fikri, e-posta bülteni anonsu, video senaryosu konsepti) üretir.
*   **Eksik Parçayı Tamamlama:** Verilen bir metne en uygun görselin nasıl olması gerektiğini tarif eder veya yüklenen bir görsele en uygun metni sıfırdan yazar.

## 3. Stratejik Vizyon ve Gelecek Potansiyeli

Bu temel yetenekler üzerine inşa edilecek gelişmiş özellikler platformu bir sonraki seviyeye taşıyacaktır:

*   **Kullanıcı Hesapları ve Çalışma Alanları (Workspaces):** Kullanıcıların projelerini organize etmesi ve analiz geçmişlerini kaydetmesi.
*   **Toplu Analiz (Batch Processing):** Yüzlerce metin veya görselin tek seferde analiz edilmesi.
*   **Developer API Erişimi:** Platformun yeteneklerini bir hizmet olarak diğer yazılımlara sunma imkanı.
*   **Prompt Kütüphanesi:** Kullanıcıların kendi uzman talimat setlerini kaydedip yeniden kullanabilmeleri.

## 4. Teknik Mimarî ve Süreç Akışı

#### Geliştirme Yaklaşımı: Backend-First
Projenin tüm iş mantığı backend'de yer alacağı için, öncelikle API altyapısı tasarlanacak, `Postman` gibi araçlarla test edilecek ve sağlam bir temel oluşturulacaktır. Bu yaklaşım, daha sonra geliştirilecek olan ön yüzün (frontend) güvenilir bir zemin üzerine inşa edilmesini sağlar.

#### Teknoloji Yığını (Tech Stack)
*   **Backend:** Node.js
*   **Framework:** Express.js
*   **AI Servisi:** OpenAI API
    *   **Metin Modelleri:** GPT-4 / GPT-3.5-Turbo
    *   **Görsel Analiz Modeli:** GPT-4 Vision (GPT-4V)
*   **Temel Kütüphaneler:**
    *   `openai`: Resmi OpenAI Node.js istemcisi.
    *   `multer`: Görsel dosyalarını sunucuya yüklemek (upload) için.
    *   `cors`: Çapraz kaynak isteklerine izin vermek için.
    *   `dotenv`: API anahtarı gibi gizli bilgileri güvenli bir şekilde saklamak için.

#### Mimarî Model ve Süreç
Platformun beyni, tek ve akıllı bir API endpoint'i (`POST /api/analyze`) üzerinden çalışacaktır. Bu mimari, projenin esnekliğini ve yönetilebilirliğini sağlar:
1.  **İstek (Request):** Kullanıcı arayüzden bir veya daha fazla veri (metin, görsel) ve yapılacak işin tanımını (`task: "summarize_text"`) içeren bir istek gönderir.
2.  **Yönlendirme (Routing):** Backend'deki `analyze` fonksiyonu, gelen `task` parametresine bakar.
3.  **Tercüme (Translation):** Bir `switch` veya `map` objesi, bu basit `task` tanımını, o işe özel olarak önceden hazırlanmış, detaylı ve uzman bir "Prompt"a (talimata) çevirir. **Bu, platformun bir Chatbot'tan temel farkıdır; kullanıcıdan uzman prompt bilgisi beklemez, bu uzmanlığı kendi içinde barındırır.**
4.  **Yürütme (Execution):** Oluşturulan uzman prompt ve kullanıcının verisi, OpenAI API'sine gönderilir.
5.  **Yanıt (Response):** OpenAI'den gelen sonuç, temiz ve yapılandırılmış bir JSON formatında paketlenerek kullanıcıya geri döndürülür.

## 5. Proje Gereksinimleri

#### Fonksiyonel Gereksinimler
*   Sistem, metin girdisini alıp en azından özetleme ve anahtar kelime çıkarma işlemlerini yapabilmelidir.
*   Sistem, görsel girdisini alıp en azından görseli anlatan bir metin (caption) üretebilmelidir.
*   Sistem, dosya yükleme (`image/jpeg`, `image/png`) işlemlerini desteklemelidir.
*   Tüm API istekleri tek bir endpoint üzerinden, `task` parametresi ile yönetilmelidir.

#### Teknik Gereksinimler
*   Geçerli bir OpenAI API anahtarına erişim.
*   Node.js ve NPM'in kurulu olduğu bir geliştirme ortamı.
