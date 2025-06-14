<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\DB;

class MainServiceRequired implements Rule
{
    public function passes($attribute, $value)
    {
        // Eğer $value (services ID listesi) boşsa false döndür
        if (empty($value) || !is_array($value)) {
            return false;
        }

        // Gönderilen ID'lerden is_main = 1 olan en az bir kayıt var mı?
        $count = DB::table('services')
            ->whereIn('id', $value)
            ->where('is_main', 1)
            ->count();

        return $count > 0;
    }

    public function message()
    {
        return 'Seçilen hizmetler arasında en az bir ana hizmet bulunmalıdır.';
    }
}