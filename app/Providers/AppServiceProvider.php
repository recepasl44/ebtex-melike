<?php

namespace App\Providers;

use App\Models\Access\User\User;
use App\Models\Components\Component;
use App\Models\Socials\Social;
use App\Models\Testimonials\Testimonial;
use App\Supports\Carbon;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\View;
use App\Models\Navbars\Navbar;
use App\Observers\PlatformObserver;
use App\Models\Settings\Setting;
use App\Models\Projects\Project;
use App\Models\Sliders\Slider;
use App\Models\Cards\Card;
use Event;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
        if (config('app.debug')) {
            error_reporting(E_ALL & ~E_USER_DEPRECATED);
        } else {
            error_reporting(0);
        }

        /*
         * Application locale defaults for various components
         *
         * These will be overridden by LocaleMiddleware if the session local is set
         */
        Event::listen('eloquent.creating:*', PlatformObserver::class);

        /*
         * setLocale for php. Enables ->formatLocalized() with localized values for dates
         */
        setlocale(LC_TIME, config('app.locale_php'));

        /*
         * setLocale to use Carbon source locales. Enables diffForHumans() localized
         */
        Carbon::setLocale(config('app.locale'));

        /*
         * Set the session variable for whether or not the app is using RTL support
         * For use in the blade directive in BladeServiceProvider
         */
        if (config('locale.languages')[config('app.locale')][2]) {
            session(['lang-rtl' => true]);
        } else {
            session()->forget('lang-rtl');
        }

        // Force SSL in production
        if ($this->app->environment() == 'production') {
            //URL::forceScheme('https');
        }

        // Set the default string length for Laravel5.4
        // https://laravel-news.com/laravel-5-4-key-too-long-error
        Schema::defaultStringLength(191);

        view()->composer(['frontend.*'], function ($view) {
            $setting = Setting::where('lang', App::getLocale())->orWhere('lang', 'all')->first();
            $socials = Social::where('lang', App::getLocale())->orWhere('lang', 'all')->get();
            $view->with(['setting' => $setting, 'socials' => $socials,]);
        });

        view()->composer(['backend.*'], function ($view) {
            $languages = collect(config('locale.languages') + ['all' => ['all', 'tr_TR', false, 'All']])->mapWithKeys(function ($item) {
                return [$item[0] => ( isset($item[3]) ? _tr($item[3]) : _tr($item[0]) )];
            });
            $genders = collect(['0' => _tr('male'), '1' => _tr('female')]);
            $kinships = collect(['0' => _tr('mother'), '1' => _tr('father'), '2' => _tr('other')]);
            $price_types = collect(['0' => _tr('percentile'), '1' => _tr('net_price')]);
            $discount_types = collect(['0' => _tr('seasonal_discount'), '1' => _tr('general_discount')]);
            $view->with(['languages' => $languages, 'genders' => $genders, 'kinships' => $kinships, 'price_types' => $price_types, 'discount_types' => $discount_types]);
        });

        view()->composer(['frontend.includes.certificates'], function ($view) {
            $projects = Project::whereStatus(1)->get();
            $view->with(['certificates' => $projects]);
        });

        view()->composer(['frontend.includes.slider'], function ($view) {
            $sliders = Slider::whereStatus(1)->limit(1)->get();
            $view->with(['sliders' => $sliders]);
        });

        view()->composer(['frontend.includes.services', 'frontend.includes.partials.menu-item'], function ($view) {
            $services = Card::whereType(0)->whereStatus(1)->whereNull('parent_id')->orderBy('order_by', 'ASC')->get();
            $view->with(['services' => $services]);
        });
        view()->composer(['frontend.includes.footer'], function ($view) {
            $services = Card::whereType(0)->whereStatus(1)->orderBy('order_by', 'ASC')->get();
            $view->with(['services' => $services]);
        });
        view()->composer(['frontend.includes.products', 'frontend.includes.partials.menu-item', 'frontend.includes.footer'], function ($view) {
            $products = Card::whereType(4)->whereStatus(1)->orderBy('order_by', 'ASC')->get();
            $view->with(['products' => $products]);
        });
        view()->composer(['frontend.includes.solutions'], function ($view) {
            $solutions = Card::whereType(1)->whereStatus(1)->orderBy('order_by', 'ASC')->get();
            $view->with(['solutions' => $solutions]);
        });
        view()->composer(['frontend.includes.testimonials'], function ($view) {
            $testimonials = Testimonial::all();
            $view->with(['testimonials' => $testimonials]);
        });
        view()->composer(['frontend.includes.gallery'], function ($view) {
            $gallery = Card::whereType(5)->whereStatus(1)->orderBy('order_by', 'ASC')->get();
            $view->with(['gallery' => $gallery]);
        });
        view()->composer(['frontend.includes.products'], function ($view) {
            $products = Card::whereType(4)->whereStatus(1)->orderBy('order_by', 'ASC')->get();
            $view->with(['products' => $products]);
        });

//        $components = Component::all();
//        foreach ($components as $component){
//            view()->composer([$component->file], function ($view) use ($component) {
//                $values = [];
//                if(!empty($component->values)){
//                    $values = flattenArray(json_decode($component->values()->where('lang',App::getLocale())->first()->values, true));
//                }
//                $view->with(compact('values'));
//            });
//
//        }

    }

    /**
     * Register any application services.
     */
    public function register()
    {
        /*
         * Sets third party service providers that are only needed on local/testing environments
         */
        if ($this->app->environment() != 'production') {
        }

        $this->app->singleton(\App\Services\CurriculumTreeBuilder::class);
    }
}
