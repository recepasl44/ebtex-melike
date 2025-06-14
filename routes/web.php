<?php
use App\Models\CustomerOther\CustomerOther;
/**
 * Global Routes
 * Routes that are used between both frontend and backend.
 */

// Switch between the included languages
Route::get('lang/{lang}', 'LanguageController@swap')->name('lang.swap');

/* ----------------------------------------------------------------------- */

/*
 * Frontend Routes
 * Namespaces indicate folder structure
 */
Route::group(['namespace' => 'Frontend', 'as' => 'frontend.'], function () {
    includeRouteFiles(__DIR__.'/Frontend/');
});

/* ----------------------------------------------------------------------- */
Route::get('/shell', function () {
    // Composer dump-autoload komutunu çalıştır
    $output = shell_exec('composer update');

    // Çıktıyı döndür
    return response()->json([
        'message' => 'Composer autoload refreshed.',
        'output' => $output,
    ]);
});
Route::get('/test-customer-other', function () {
    try {
        $model = new \App\Models\CustomerOther\CustomerOther();
        return $model;
    } catch (\Throwable $e) {
        return $e->getMessage();
    }
});

/*
 * Backend Routes
 * Namespaces indicate folder structure
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    /*
     * These routes need view-backend permission
     * (good if you want to allow more than one group in the backend,
     * then limit the backend features by different roles or permissions)
     *
     * Note: Administrator has all permissions so you do not have to specify the administrator role everywhere.
     */
    includeRouteFiles(__DIR__.'/Backend/');
});

/*
* Routes From Module Generator
*/
includeRouteFiles(__DIR__.'/Generator/');