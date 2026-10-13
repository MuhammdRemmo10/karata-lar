# KARATAŞLAR — Dijital Ürün Kataloğu

KARATAŞLAR Lüx Hırdavat'ın 13 Ekim 2026 tarihli ürün kataloğundan hazırlanmış Türkçe web sitesi.

- 344 ürün ve 27 kategori
- Ürün adı ve model kodu ile arama
- Kategori filtreleri ve Türkçe alfabetik sıralama
- Orijinal ürün görselleri, model ve ambalaj bilgileri
- Tarayıcıda saklanan seçim listesi ve liste indirme
- 102 sayfalık hafif PDF katalog
- Mobil, tablet ve masaüstü için duyarlı tasarım

## Yerel görüntüleme

`index.html` dosyasını tarayıcıda açın. Ürün verileri `catalog-data.js` içinde bulunduğundan yerel görüntüleme için kurulum veya sunucu gerekmez. `assets` klasörünü koruyun.

## GitHub Pages ile yayınlama

1. Repository: [MuhammdRemmo10/karata-lar](https://github.com/MuhammdRemmo10/karata-lar). GitHub Pages yayın kaynağını bu repository içinde ayarlayın.
2. Bu klasörün içeriğini repository'nin `main` dalının kök dizinine yükleyin. `index.html` dosyası kökte olmalıdır.
3. **Settings → Pages** sayfasını açın.
4. **Build and deployment → Source → Deploy from a branch** seçin.
5. Branch: **main**; folder: **/(root)** seçip **Save** düğmesine basın.
6. Yayın tamamlandıktan sonra aynı sayfadaki **Visit site** bağlantısını açın.

Proje adresi GitHub kullanıcı adınız ve repository adınız üzerinden oluşturulur. Özel alan adı gerekiyorsa GitHub Pages ayarlarından sonradan bağlanabilir.

`.nojekyll` dosyası, bu statik sitenin Jekyll işlemine ihtiyaç duymadan yayınlanmasını sağlar. Node.js, veritabanı veya ücretli bir sunucu gerekmez.

## Dosyalar

| Dosya | İçerik |
| --- | --- |
| `index.html` | Ana sayfa ve katalog arayüzü |
| `style.css` | Marka tasarımı ve duyarlı düzen |
| `app.js` | Arama, filtreler, detaylar ve seçim listesi |
| `catalog-data.js` | Tarayıcıya doğrudan yüklenen ürün verileri |
| `catalog.json` | Düzenlenebilir ürün verilerinin JSON kopyası |
| `assets/` | Logo, 344 ürün görseli ve PDF katalog |
| `.nojekyll` | GitHub Pages statik yayın ayarı |

Ürün verilerini güncellerken `catalog.json` ve `catalog-data.js` dosyalarını birlikte güncelleyin. `catalog-data.js`, aynı JSON verisini `globalThis.KARATASLAR_CATALOG = ...;` biçiminde içerir. `main` dalına gönderilen değişiklikler, GitHub Pages yayın kaynağı ayarlandıktan sonra sitede yayınlanır.

Seçim listesi ziyaretçinin kendi tarayıcısında saklanır; sipariş göndermez. Model ve ambalaj bilgileri sağlanan katalogdan alınmıştır. PDF dosyası orijinal 102 sayfanın daha hafif görsel sürümüdür.

Resmî rehber: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

Marka ve ürün görsellerinin hakları ilgili sahiplerine aittir.
