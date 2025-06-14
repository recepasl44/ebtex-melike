<?php
namespace App\Models\Personel;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Personel extends Model
{
    use HasFactory;

    // Tablo adı
    protected $table = 'personeller';

    // Kütle atama (Mass Assignment) için izin verilen alanlar
    protected $fillable = [
        'ad',
        'soyad',
        'tc_kimlik_no',
        'mesleki_yas',
        'ikametgah_adresi',
        'gorev',
        'brans',
        'profil_foto',
        'pozisyon',
        'telefon',
        'email',
        'adres',
        'dogum_tarihi',
        'ise_giris_tarihi',
        'aktif',
    ];

    // Tarih alanlarının otomatik olarak karbon nesnelerine dönüştürülmesi
    protected $dates = [
        'dogum_tarihi',
        'ise_giris_tarihi',
        'created_at',
        'updated_at',
    ];

    // İlişkiler: Ders ücretleri
    public function dersUcretleri()
    {
        return $this->hasMany(\App\Models\Ders\DersUcreti::class, 'personel_id');
    }

    // İlişkiler: Koçluk ücretleri
    public function koclukUcretleri()
    {
        return $this->hasMany(\App\Models\Kocluk\KoclukUcreti::class, 'personel_id');
    }

    // İlişkiler: Kupon ücretleri
    public function kuponUcretleri()
    {
        return $this->hasMany(\App\Models\Kupon\KuponUcreti::class, 'personel_id');
    }

    // İlişkiler: Özel ders ücretleri
    public function ozelDersUcretleri()
    {
        return $this->hasMany(\App\Models\OzelDers\OzelDersUcreti::class, 'personel_id');
    }
}
