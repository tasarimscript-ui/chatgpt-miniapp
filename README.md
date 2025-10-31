# chatgpt-miniapp
ChatGPT destekli web & Telegram mini app altyapısı (bot + frontend + backend)

## Taş Kağıt Makas Oyunu
Depoda klavye kısayolları ve skor geçmişi içeren basit bir web oyunu örneği olarak `index.html` yer alır.

### Gereksinimler
- Tarayıcı (Chrome, Firefox, Edge vb.)
- İsteğe bağlı olarak depoyu klonlamak için [Git](https://git-scm.com/)
- Yerel sunucu başlatmak için bilgisayarınızda [Python 3](https://www.python.org/downloads/) yüklü olmalıdır (macOS ve çoğu Linux dağıtımında hazır gelir).

### Adım adım kurulum
1. **Kaynak kodu edinin**  
   - Git kullanıyorsanız:
     ```bash
     git clone https://github.com/<kullanici-adiniz>/chatgpt-miniapp.git
     cd chatgpt-miniapp
     ```
   - Alternatif olarak, GitHub üzerinden ZIP indirip bilgisayarınızda bir klasöre çıkartabilirsiniz.
2. **Sunucuyu başlatın**  
   - macOS / Linux:
     ```bash
     ./serve.sh 8000
     ```
     Betik çalışmıyorsa yürütme izni verin: `chmod +x serve.sh`
   - Windows (PowerShell veya Komut İstemi):
     ```powershell
     python -m http.server 8000
     ```
     Komutu çalıştırmadan önce projenin klasöründe (`chatgpt-miniapp`) olduğunuzdan emin olun.
3. **Oyunu açın**  
   Tarayıcınızda [http://localhost:8000/index.html](http://localhost:8000/index.html) adresine gidin. Artık butonları tıklayarak veya klavye kısayollarıyla oyunu oynayabilirsiniz.

### Sunucusuz hızlı önizleme
Sunucu kurmak istemiyorsanız `index.html` dosyasını tarayıcıya sürükleyip bırakabilir veya dosyaya çift tıklayabilirsiniz. Bu yöntem bazı tarayıcılarda skor geçmişi gibi özelliklerin tam çalışmamasına neden olabilir, bu yüzden mümkünse yerel sunucu yöntemini tercih edin.
