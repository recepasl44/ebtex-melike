<?php
/**
 * UsedAreas
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'UsedAreas'], function () {
        Route::resource('usedareas', 'UsedAreasController');
        //For Datatable
        Route::post('usedareas/get', 'UsedAreasTableController')->name('usedareas.get');
    });
    
});