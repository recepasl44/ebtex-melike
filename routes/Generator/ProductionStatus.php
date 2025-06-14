<?php
/**
 * Routes for : BookProductions
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
	
	Route::group( ['namespace' => 'BookProductions'], function () {
	    Route::get('bookproductions', 'BookProductionsController@index')->name('bookproductions.index');
	    
	    
	    
	    //For Datatable
	    Route::post('bookproductions/get', 'BookProductionsTableController')->name('bookproductions.get');
	});
	
});