<?php
/**
 * Routes for : Assignments
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
	
	Route::group( ['namespace' => 'Assignments'], function () {
	    Route::get('assignments', 'AssignmentsController@index')->name('assignments.index');
	    Route::get('assignments/create', 'AssignmentsController@create')->name('assignments.create');
	    Route::post('assignments', 'AssignmentsController@store')->name('assignments.store');
	    Route::get('assignments/{assignment}/edit', 'AssignmentsController@edit')->name('assignments.edit');
	    Route::patch('assignments/{assignment}', 'AssignmentsController@update')->name('assignments.update');
	    
	    //For Datatable
	    Route::post('assignments/get', 'AssignmentsTableController')->name('assignments.get');
	});
	
});