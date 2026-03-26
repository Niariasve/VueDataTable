<?php

use App\Models\Customer;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'Welcome')->name('home');

Route::get('/data-table', function () {
    $customers = Customer::take(50)->get();

    return Inertia::render('DataTable', compact('customers'));
})->name('data-table');
