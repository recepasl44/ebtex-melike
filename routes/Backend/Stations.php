<?php

Route::group(['namespace' => 'Stations'], function () {
    Route::resource('stations', 'StationsController');
});