<?php
/**
 * Professions
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Professions'], function () {
        Route::resource('professions', 'ProfessionsController');
        //For Datatable
        Route::post('professions/get', 'ProfessionsTableController')->name('professions.get');
    });
    
});