<?php

/**
 * Frontend Controllers
 * All route names are prefixed with 'frontend.'.
 */
Route::get('/', 'FrontendController@index')->name('index');
Route::post('/get/states', 'FrontendController@getStates')->name('get.states');
Route::post('/get/cities', 'FrontendController@getCities')->name('get.cities');
Route::post('/post/subscribe', 'FrontendController@postSubscribe')->name('post.subscribe');

/*
 * These frontend controllers require the user to be logged in
 * All route names are prefixed with 'frontend.'
 */
Route::group(['middleware' => 'auth'], function () {
    Route::group(['namespace' => 'User', 'as' => 'user.'], function () {
        /*
         * User Dashboard Specific
         */
        Route::get('dashboard', 'DashboardController@index')->name('dashboard');

        /*
         * User Account Specific
         */
        Route::get('account', 'AccountController@index')->name('account');

        /*
         * User Profile Specific
         */
        Route::patch('profile/update', 'ProfileController@update')->name('profile.update');

        /*
         * User Profile Picture
         */
        Route::patch('profile-picture/update', 'ProfileController@updateProfilePicture')->name('profile-picture.update');
    });
});

/*
* Show pages
*/
Route::get('pages/{slug}', 'FrontendController@showPage')->name('pages.show');
Route::get('blog', 'FrontendController@blog')->name('blog');
Route::get('blog/{slug}', 'FrontendController@showBlog')->name('blogs.show');
Route::get('services', 'FrontendController@services')->name('services');
Route::get('services/{slug}', 'FrontendController@showService')->name('services.show');
Route::get('products', 'FrontendController@products')->name('products');
Route::get('products/{slug}', 'FrontendController@showProduct')->name('products.show');
Route::get('projects', 'FrontendController@projects')->name('projects');
Route::get('contact', 'FrontendController@contact')->name('contact');
Route::post('contacts', 'FrontendController@contactSave')->name('contacts.save');

Route::get('about-me', 'FrontendController@aboutMe')->name('aboutMe');
Route::get('about-us', 'FrontendController@aboutUs')->name('aboutUs');
Route::get('about-team', 'FrontendController@aboutTeam')->name('aboutTeam');
