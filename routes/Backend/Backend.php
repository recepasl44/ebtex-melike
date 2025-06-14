<?php

use App\Http\Controllers\Backend\ImageUploadController;
use App\Http\Controllers\Backend\ModalController;
use App\Http\Controllers\Backend\PDFController;

Route::post('/upload-image', [ImageUploadController::class, 'upload'])->name('upload.image');
Route::post('/modals/create', [ModalController::class, 'create'])->name('modals.create');



Route::get('/', [PDFController::class, 'index']);
Route::post('/upload/pdf', [PDFController::class, 'upload'])->name('upload.pdf');