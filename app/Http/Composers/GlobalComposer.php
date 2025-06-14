<?php

namespace App\Http\Composers;

use App\Models\Settings\Setting;
use App\Models\Socials\Social;
use Illuminate\View\View;

/**
 * Class GlobalComposer.
 */
class GlobalComposer
{
    /**
     * Bind data to the view.
     *
     * @param View $view
     *
     * @return void
     */
    public function compose(View $view)
    {
        $settingData = Setting::first();
        $socials = Social::all();
        $view->with('logged_in_user', access()->user());
        $view->with('settings', $settingData);
        $view->with('socials', $socials);
    }
}
