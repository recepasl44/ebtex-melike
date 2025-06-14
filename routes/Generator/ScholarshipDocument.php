<?php
/**
 * ScholarshipDocuments
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'ScholarshipDocuments'], function () {
        Route::resource('scholarshipdocuments', 'ScholarshipDocumentsController');
        //For Datatable
        Route::post('scholarshipdocuments/get', 'ScholarshipDocumentsTableController')->name('scholarshipdocuments.get');
    });
    
});