<?php
namespace App\Imports;

use App\Models\Personel\Personel;
use Maatwebsite\Excel\Concerns\ToModel;

class PersonelImport implements ToModel
{
    public function model(array $row)
    {
        return new Personel([
            'ad' => $row[0],
            'soyad' => $row[1],
            'tc_kimlik_no' => $row[2],
            'telefon' => $row[3],
            'email' => $row[4],
            'adres' => $row[5],
            'pozisyon' => $row[6],
            'dogum_tarihi' => $row[7],
            'mesleki_yas' => $row[8],
            'ikametgah_adresi' => $row[9],
            'gorev' => $row[10],
            'brans' => $row[11],
            'profil_foto' => $row[12], // Opsiyonel: Profil fotoğrafı için bir URL ya da dosya yolu
        ]);
    }
}
