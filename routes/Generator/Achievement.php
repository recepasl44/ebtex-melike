<?php
/**
 * Achievements
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Achievements'], function () {
        Route::resource('achievements', 'AchievementsController');
        //For Datatable
        Route::post('achievements/get', 'AchievementsTableController')->name('achievements.get');
    });
    
});