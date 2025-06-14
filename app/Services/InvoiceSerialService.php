<?php

namespace App\Services;

use Carbon\Carbon;
use App\Models\Invoice\InvoiceSerial; // Eloquent Model (invoice_serials tablosu)

class InvoiceSerialService
{
    /**
     * getNextSerial()
     * 
     * - Bugünün tarihi ile invoice_serials tablosunda kayıtlı “FTR” prefix satırını bulur.
     * - Eğer bugün ilk kez fatura kesiliyorsa, current_number = 1 olarak reset’ler.
     * - Eğer aynı gün içinde daha önce kesildiyse, current_number’ı 1 arttırır.
     * - Format: "FTRYYYYMMDD#########" => 9 haneli sıfır dolgu
     */
    public function getNextSerial(): string
    {
        $prefix = 'FTR'; // sabit
        $today  = Carbon::now()->format('Y-m-d');

        // 1) Kayıt var mı?
        $serialRow = \App\Models\Invoice\InvoiceSerial::where('prefix', $prefix)->first();

        // 2) Yoksa oluştur
        if (!$serialRow) {
            $serialRow = new \App\Models\Invoice\InvoiceSerial();
            $serialRow->prefix = $prefix;
            $serialRow->current_number = 0; 
            $serialRow->last_generated_date = $today;
            $serialRow->save();
        }

        // 3) Tarih değiştiyse numarayı sıfırla (1’den başla)
        if ($serialRow->last_generated_date != $today) {
            $serialRow->current_number = 1;
            $serialRow->last_generated_date = $today;
        } else {
            // aynı gün, sadece +1 artır
            $serialRow->current_number++;
        }

        $serialRow->save();

        // 4) Format: FTR + YYYYMMDD + 9-haneli sayı
        $datePart   = Carbon::parse($serialRow->last_generated_date)->format('Ymd');
        $numberPart = str_pad($serialRow->current_number, 9, '0', STR_PAD_LEFT);

        // Nihai seri
        $finalSerial = $prefix . $datePart . $numberPart;
        $sonuc = ["success" => true, "serial_no" => $finalSerial];
        $sonuc = json_encode($sonuc);
        return $sonuc;
    }
}
    