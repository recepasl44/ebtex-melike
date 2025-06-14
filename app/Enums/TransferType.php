<?php

namespace App\Enums;

enum TransferType: string
{
    // Şube içi transferler:
    case SubeI_BankadanNakite = 'sube_ici_bankadan_nakite'; // a) Şube içi: Bankadan nakit kasaya virman
    case SubeI_NakitKasadanBankaya = 'sube_ici_nakitsasadan_bankaya'; // b) Şube içi: Nakit kasadan bankaya virman
    case SubeI_KrediKartindanBankaya = 'sube_ici_kredikartindan_bankaya'; // c) Şube içi: Kredi kartından bankaya virman
    case SubeI_BankadanBankaya = 'sube_ici_bankadan_bankaya'; // d) Şube içi: Bankadan bankaya virman (gönderici ve alıcı banka hesapları)
    
    // Şubeler arası transferler:
    case SubelerArasi_Nakit = 'subeler_arasi_nakit'; // e) Şubeler arası: Nakit virman (sadece şube bilgileri, gönderici ve alıcı şube)
    case SubelerArasi_BankadanBankaya = 'subeler_arasi_bankadan_bankaya'; // f) Şubeler arası: Bankadan bankaya virman (gönderici banka hesabı, alıcı banka hesabı ve şube bilgileri)
    case SubelerArasi_NakitKasadanBankaya = 'subeler_arasi_nakitsasadan_bankaya'; // g) Şubeler arası: Nakit kasadan bankaya virman (gönderici ve alıcı şube)
    case SubelerArasi_BankadanNakitKasaya = 'subeler_arasi_bankadan_nakitkasaya'; // h) Şubeler arası: Bankadan nakit kasaya virman (gönderici şube, banka hesabı, alıcı şube, banka hesabı)
    
    // Çek ve senet transferleri:
    case SubelerArasi_Cek = 'subeler_arasi_cek'; // h) Şubeler arası: Çek virman (gönderici şube + gönderici çek, alıcı şube + alıcı çek – instruments tablosunda document_type=1)
    case SubelerArasi_Senet = 'subeler_arasi_senet'; // i) Şubeler arası: Senet virman (gönderici şube + gönderici senet, alıcı şube + alıcı senet – instruments tablosunda document_type=2)
}
