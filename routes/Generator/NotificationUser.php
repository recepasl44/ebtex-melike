<?php
/**
 * NotificationUsers
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'NotificationUsers'], function () {
        Route::resource('notificationusers', 'NotificationUsersController');
        //For Datatable
        Route::post('notificationusers/get', 'NotificationUsersTableController')->name('notificationusers.get');
    });
    
});