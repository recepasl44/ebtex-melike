<?php

// Schoolbus CRUD işlemleri
Route::group(['namespace' => 'SchoolBuses'], function () {
    Route::resource('schoolbuses', 'SchoolBusController');
});