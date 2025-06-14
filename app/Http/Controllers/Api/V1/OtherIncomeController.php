<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OtherIncomeController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search', '');
        $paginate = $request->query('paginate', 10);

        // İlişkileri (customer ve kategori) yükleyerek sorguya dahil ediyoruz.
        $query = \App\Models\OtherIncome\OtherIncome::with(['customer', 'category']);

        if ($search) {
            $query->where(function($q) use ($search) {
                $q->whereHas('customer', function ($q) use ($search) {
                    $q->where('name', 'LIKE', "%$search%");
                })->orWhereHas('category', function ($q) use ($search) {
                    $q->where('name', 'LIKE', "%$search%");
                });
            });
        }

        $incomes = $query->paginate($paginate);

        return response()->json($incomes, 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'season' => 'required|string',
            'date' => 'required|date',
            'customer_id' => 'required|exists:customers,id',
            'other_income_category_id' => 'required|exists:other_income_categories,id',
            'income_item' => 'required|string',
            'payment_method' => 'required|string',
            'amount' => 'required|numeric',
            'description' => 'nullable|string',
        ]);

        $income = \App\Models\OtherIncome\OtherIncome::create($data);

        return response()->json([
            'message' => 'Other income successfully added.',
            'income' => $income,
        ], 201);
    }

    public function show($id)
    {
        $income = \App\Models\OtherIncome\OtherIncome::with(['customer', 'category'])->findOrFail($id);

        return response()->json($income, 200);
    }

    public function update(Request $request, $id)
    {
        $income = \App\Models\OtherIncome\OtherIncome::findOrFail($id);

        $data = $request->validate([
            'season' => 'required|string',
            'date' => 'required|date',
            'customer_id' => 'required|exists:customers,id',
            'other_income_category_id' => 'required|exists:other_income_categories,id',
            'income_item' => 'required|string',
            'payment_method' => 'required|string',
            'amount' => 'required|numeric',
            'description' => 'nullable|string',
        ]);

        $income->update($data);

        return response()->json([
            'message' => 'Other income successfully updated.',
            'income' => $income,
        ], 200);
    }

    public function destroy($id)
    {
        $income = \App\Models\OtherIncome\OtherIncome::findOrFail($id);
        $income->delete();

        return response()->json([
            'message' => 'Other income successfully deleted.',
        ], 200);
    }
}
