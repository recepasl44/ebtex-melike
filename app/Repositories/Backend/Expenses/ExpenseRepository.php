<?php
namespace App\Repositories\Backend\Expenses;

use App\Models\Expenses\Expenses;

class ExpenseRepository
{
    public function getAllExpenses()
    {
        return Expenses::with(['supplier', 'category'])->get();
    }

    public function storeExpense($data)
    {
        return Expenses::create($data);
    }
}
