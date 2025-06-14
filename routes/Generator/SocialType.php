<?php
/**
 * SocialTypes
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'SocialTypes'], function () {
        Route::resource('socialtypes', 'SocialTypesController');
        //For Datatable
        Route::post('socialtypes/get', 'SocialTypesTableController')->name('socialtypes.get');
    });
    
});