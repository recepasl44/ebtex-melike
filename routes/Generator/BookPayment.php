<?php
/**
 * Routes for : BookPayments
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
	
	Route::group( ['namespace' => 'BookPayments'], function () {
	    Route::get('bookpayments', 'BookPaymentsController@index')->name('bookpayments.index');
	    
	    
	    
	    //For Datatable
	    Route::post('bookpayments/get', 'BookPaymentsTableController')->name('bookpayments.get');
	});
	
});