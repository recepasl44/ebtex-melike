<?php

namespace App\Scopes;

use App\Platform\Platform;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class PlatformScope implements Scope
{
    public function apply(Builder $builder, Model $model)
    {
        if (Platform::isExcept($model)) return;
        $builder->where("{$model->getTable()}.platform_id", Platform::id());
    }
}