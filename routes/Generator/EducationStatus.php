<?php
/**
 * EducationStatuses
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'EducationStatuses'], function () {
        Route::resource('educationstatuses', 'EducationStatusesController');
        //For Datatable
        Route::post('educationstatuses/get', 'EducationStatusesTableController')->name('educationstatuses.get');
    });
    
});