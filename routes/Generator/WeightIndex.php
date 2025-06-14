<?php
/**
 * WeightIndices
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'WeightIndices'], function () {
        Route::resource('weightindices', 'WeightIndicesController');
        //For Datatable
        Route::post('weightindices/get', 'WeightIndicesTableController')->name('weightindices.get');
    });
    
});