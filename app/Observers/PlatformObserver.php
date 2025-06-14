<?php

namespace App\Observers; // Thats the namespace that I use, since I put my models on App\Models, but fell free to change it.
use App\Platform\Platform;
use Illuminate\Database\Eloquent\Model;

class PlatformObserver {
    /**
     * @param \Illuminate\Database\Eloquent\Model $model
     * @return bool
     */
    public function creating(Model $model) {
        if (Platform::isExcept($model)) return;
        if (isset($model->platform_id)) return;
        $model->platform_id = Platform::id();
    }

    public function handle($event, $models) {
        foreach ($models as $model) {
            $this->creating($model);
        }
    }
}