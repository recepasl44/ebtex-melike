<?php

namespace App\Models\instrument;

use Illuminate\Database\Eloquent\Model;

class Instrument extends Model
{
    // Tablo adı
    protected $table = 'instruments';

    // Toplu atamaya uygun alanlar
    protected $fillable = [
        'branch_id',              // Şube
        'document_type',          // Tür (1 = çek, 2 = senet)
        'document_owner_name',    // Evrak sahibinin adı (sahibi)
        'bank',                   // Banka
        'amount',                 // Tutar
        'due_date',               // Vade
        'cirolar',                // Cirolar
        'check_no',               // Çek/Senet No
        'transaction_no',         // İşlem No
        'guarantors',             // Kefiller
        'season',                 // Sezon
        'instrument_no',          // Evrak No
        'owner_name',             // Evrakın adı (Adı)
        'school_no',              // Okul No
        'bozdur_swap'             // Bozdur/swap işlemi (0 veya 1)
    ];
}
