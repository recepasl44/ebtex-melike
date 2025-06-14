<?php
/**
 * ClassRooms
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'ClassRooms'], function () {
        Route::resource('classrooms', 'ClassRoomsController');
        //For Datatable
        Route::post('classrooms/get', 'ClassRoomsTableController')->name('classrooms.get');
    });
    
});