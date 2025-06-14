<?php
/**
 * ExamRelevances
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'ExamRelevances'], function () {
        Route::resource('examrelevances', 'ExamRelevancesController');
        //For Datatable
        Route::post('examrelevances/get', 'ExamRelevancesTableController')->name('examrelevances.get');
    });
    
});