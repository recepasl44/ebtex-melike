<?php
/**
 * AnnualPlans
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'AnnualPlans'], function () {
        Route::resource('annualplans', 'AnnualPlansController');
        //For Datatable
        Route::post('annualplans/get', 'AnnualPlansTableController')->name('annualplans.get');
    });
    
});