<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'Welcome')->name('home');

Route::get('/data-table', function () {

    return Inertia::render('DataTable');
})->name('data-table');
