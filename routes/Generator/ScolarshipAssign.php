<?php
/**
 * ScolarshipAssigns
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'ScolarshipAssigns'], function () {
        Route::resource('scolarshipassigns', 'ScolarshipAssignsController');
        //For Datatable
        Route::post('scolarshipassigns/get', 'ScolarshipAssignsTableController')->name('scolarshipassigns.get');
    });
    
});