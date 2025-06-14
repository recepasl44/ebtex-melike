<?php
/**
 * StudentPsychologicals
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'StudentPsychologicals'], function () {
        Route::resource('studentpsychologicals', 'StudentPsychologicalsController');
        //For Datatable
        Route::post('studentpsychologicals/get', 'StudentPsychologicalsTableController')->name('studentpsychologicals.get');
    });
    
});