<?php
/**
 * Social
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Socials'], function () {
        Route::resource('socials', 'SocialsController');
        //For Datatable
        Route::post('socials/get', 'SocialsTableController')->name('socials.get');
    });
    
});