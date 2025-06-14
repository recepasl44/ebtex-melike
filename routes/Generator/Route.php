<?php
/**
 * Routes
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Routes'], function () {
        Route::resource('routes', 'RoutesController');
        //For Datatable
        Route::post('routes/get', 'RoutesTableController')->name('routes.get');
    });
    
});