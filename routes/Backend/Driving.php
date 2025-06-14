<?php
    Route::group( ['namespace' => 'Drivings'], function () {
        Route::resource('drivings', 'DrivingsController');
    });