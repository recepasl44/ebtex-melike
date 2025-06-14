<?php
/**
 * ServicePlans
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'ServicePlans'], function () {
        Route::resource('serviceplans', 'ServicePlansController');
        //For Datatable
        Route::post('serviceplans/get', 'ServicePlansTableController')->name('serviceplans.get');
    });
    
});