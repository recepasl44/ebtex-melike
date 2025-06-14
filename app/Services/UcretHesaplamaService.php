<?php

namespace App\Services;


class UcretHesaplamaService
{
    /**
     * Ders Ücreti Hesaplama
     */
    public function createDersUcreti($dersSayisi, $dersUcreti)
    {
        return $dersSayisi * $dersUcreti;
    }

    /**
     * Koçluk Ücreti Hesaplama
     */
    public function createKoclukUcreti($ucret, $ogrenciYuzdesi)
    {
        return $ucret * ($ogrenciYuzdesi / 100);
    }

    /**
     * Kupon Ücreti Hesaplama
     */
    public function createKuponUcreti($satisUcreti, $kuponYuzdesi)
    {
        return $satisUcreti * ($kuponYuzdesi / 100);
    }

    /**
     * Özel Ders Ücreti Hesaplama
     */
    public function createOzelDersUcreti($dersUcreti, $ogrenciYuzdesi)
    {
        return $dersUcreti * ($ogrenciYuzdesi / 100);
    }
}