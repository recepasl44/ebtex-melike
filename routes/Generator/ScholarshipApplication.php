<?php
/**
 * ScholarshipApplications
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'ScholarshipApplications'], function () {
        Route::resource('scholarshipapplications', 'ScholarshipApplicationsController');
        //For Datatable
        Route::post('scholarshipapplications/get', 'ScholarshipApplicationsTableController')->name('scholarshipapplications.get');
    });
    
});