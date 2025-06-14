<?php
/**
 * Topics
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Topics'], function () {
        Route::resource('topics', 'TopicsController');
        //For Datatable
        Route::post('topics/get', 'TopicsTableController')->name('topics.get');
    });
    
});