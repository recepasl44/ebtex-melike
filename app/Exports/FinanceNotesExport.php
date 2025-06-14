<?php

namespace App\Exports;

use Illuminate\Contracts\Support\Responsable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Illuminate\Support\Collection;

class FinanceNotesExport implements FromCollection, WithHeadings, Responsable
{
    private Collection $collection;
    public string $fileName = 'finance_notes.xlsx';

    public function __construct(Collection $collection)
    {
        $this->collection = $collection;
    }

    public function collection()
    {
        return $this->collection;
    }

    public function headings(): array
    {
        return [
            'Şube',
            'Okul No',
            'T.C. Kimlik No',
            'Adı Soyadı',
            'Sınıf Seviyesi',

            'Tarih',
            'Not',
            'Söz Verme Tarihi',
            'Kullanıcı',
        ];
    }
}
