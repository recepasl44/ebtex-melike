<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Laravel\Telescope\IncomingEntry;
use Laravel\Telescope\Telescope;

class TelescopeServiceProvider extends ServiceProvider
{
    /**
     * Register Telescope services.
     */
    public function register()
    {
        // Telescope yalnızca local ortamda etkin olacak.
        if ($this->app->isLocal()) {
            $this->app->register(\Laravel\Telescope\TelescopeServiceProvider::class);
            $this->app->register(\Laravel\Telescope\TelescopeApplicationServiceProvider::class);

            Telescope::filter(function (IncomingEntry $entry) {
                return $entry->isReportableException() ||
                    $entry->isFailedJob() ||
                    $entry->isScheduledTask() ||
                    $entry->hasMonitoredTag();
            });
        }
    }

    /**
     * Boot Telescope services.
     */
    public function boot()
    {
        if ($this->app->isLocal()) {
            $this->hideSensitiveRequestDetails();
            $this->gate();
        }
    }

    /**
     * Hide sensitive request details.
     */
    protected function hideSensitiveRequestDetails()
    {
        Telescope::hideRequestParameters(['_token']);

        Telescope::hideRequestHeaders([
            'cookie',
            'x-csrf-token',
            'x-xsrf-token',
        ]);
    }

    /**
     * Telescope erişimini yetkilendir.
     */
    protected function gate()
    {
        Gate::define('viewTelescope', function ($user) {
            return in_array($user->email, [
                'admin@example.com', // Gerekiyorsa e-posta ekle
            ]);
        });
    }
}
