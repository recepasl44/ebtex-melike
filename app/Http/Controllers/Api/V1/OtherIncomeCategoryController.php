<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\OtherIncome\OtherIncomeCategory;

class OtherIncomeCategoryController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
        ]);

        $category = OtherIncomeCategory::create($data);

        return response()->json([
            'message' => 'Other income category successfully created.',
            'data' => $category
        ], 201);
    }

    public function index(Request $request)
    {
        $paginate = $request->get('paginate', 10);
        $search = $request->get('search', '');
        $query = OtherIncomeCategory::query();

        if ($search) {
            $query->where('name', 'LIKE', "%$search%");
        }

        $categories = $query->paginate($paginate)->appends($request->query());

        return response()->json($categories, 200);
    }

    public function show($id)
    {
        $category = OtherIncomeCategory::findOrFail($id);
        return response()->json(['data' => $category], 200);
    }

    public function update(Request $request, $id)
    {
        $category = OtherIncomeCategory::findOrFail($id);

        $data = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
        ]);

        $category->update($data);

        return response()->json([
            'message' => 'Other income category successfully updated.',
            'data' => $category
        ], 200);
    }

    public function destroy($id)
    {
        $category = OtherIncomeCategory::findOrFail($id);
        $category->delete();

        return response()->json([
            'message' => 'Other income category successfully deleted.'
        ], 200);
    }
}
