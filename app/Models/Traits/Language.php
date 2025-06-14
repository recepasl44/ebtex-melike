<?php

namespace App\Models\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\App;

/**
 * Class ColorRelationship
 */
trait Language
{
    public static function bootLanguage()
    {
        // Check if there's a locale
        if (App::getLocale()) {
            // When creating a new model, set the `user_id` to the id of the authenticated user
            static::creating(function ($model) {
                $model->lang = App::getLocale();
            });

            // Add a global scope that automatically scopes queries to the authenticated user
            static::addGlobalScope('lang', function (Builder $builder) {
                $builder->where('lang', App::getLocale())->orWhere('lang', 'all');
            });
        }
    }

    public function getLanguageLabelAttribute($lang){
        $lang = $this->lang ?? App::getLocale();
        $statuses = [
            'tr' => 'success',
            'en' => 'primary',
            'fr' => 'warning',
            'all' => 'secondary',
        ];
        $lang_label = config('locale.languages')[$lang] ? config('locale.languages')[$lang][3] : 'all';

        return '<label class="badge bg-outline-'.($statuses[$lang] ?? 'purple').'">'._tr($lang_label).'</label>';
    }
}

