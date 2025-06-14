<?php

namespace App\Models\Agreements;

use Illuminate\Database\Eloquent\Model;

class AgreementSetting extends Model
{
    protected $table = 'agreement_settings';

    protected $fillable = [
        'branch_id',
        'agreement_type',           // branches tablosundaki type ile uyumlu
        'program_id',
        'promissory_name',
        'court_name',
        'place_promissory',
        'sozlesme_sartlari_yeni_sayfa',  // aktif (1) veya pasif (0)
        'sozlesme_tarihini_goster',      // 1: göster, 0: gösterme
        'logo_goster',                   // 1: logo gösterilsin, 0: gizlensin
        'senet_turleri',                 // ENUM: 'Çoklu senet', 'Öoklu senet-hiznet', 'Tek Senet', 'Tek Senet Hizmet', 'yok'
        'senet_yeni_sayfa',              // 1: aktif, 0: pasif
        'makbuz_turu',                   // ENUM: 'A5 Dikey', 'A5 Dikey Katansız', 'A5 Yatay', 'A5 Yatay Kalansız'
        'agreement_title',               // HTML formatında sözleşme başlığı (CKEditor ile gönderilecek)
        'agreement_text'                 // HTML formatında sözleşme metni (CKEditor ile gönderilecek)
    ];
}
