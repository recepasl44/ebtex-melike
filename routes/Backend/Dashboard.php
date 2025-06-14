<?php

/**
 * All route names are prefixed with 'admin.'.
 */
Route::get('dashboard', 'DashboardController@index')->name('dashboard');
Route::post('get-permission', 'DashboardController@getPermissionByRole')->name('get.permission');

Route::get('statistics/reports', 'DashboardController@reports')->name('statistics.reports');
Route::get('statistics/user/{user}', 'DashboardController@userReports')->name('statistics.users');
Route::get('statistics/workshop/{workshop}', 'DashboardController@workshopReports')->name('statistics.workshops');
Route::get('statistics/vehicle/{vehicle}', 'DashboardController@vehicleReports')->name('statistics.vehicles');


/*
 * Edit Profile
*/
Route::get('profile/edit', 'DashboardController@editProfile')->name('profile.edit');
Route::patch('profile/update', 'DashboardController@updateProfile')
    ->name('profile.update');
