<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\OpenAccount\OpenAccount;  // Model dizininize göre güncelleyiniz
use Illuminate\Http\Request;

class OpenAccountController extends Controller
{
    public function index(Request $request)
    {
        $query = OpenAccount::query();

        // Örnek filtreler
        if ($request->filled('branch_id')) {
            $query->where('branch_id', $request->branch_id);
        }
        if ($request->filled('season_id')) {
            $query->where('season_id', $request->season_id);
        }
        if ($request->filled('customer_name')) {
            $query->where('customer_name', 'LIKE', '%' . $request->customer_name . '%');
        }

        $openAccounts = $query->orderBy('created_at', 'desc')
                              ->paginate($request->get('paginate', 10));

        return response()->json($openAccounts, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'customer_name'    => 'nullable|string',
            'amount'           => 'required|numeric|min:0',
            'some_description' => 'nullable|string',
            'branch_id'        => 'nullable|integer',
            'description'      => 'nullable|string',
            'season_id'        => 'nullable|integer',
        ]);

        $openAccount = OpenAccount::create($request->all());

        return response()->json([
            'message' => 'Açık hesap kaydı başarıyla oluşturuldu.',
            'data'    => $openAccount
        ], 201);
    }

    public function show($id)
    {
        $openAccount = OpenAccount::findOrFail($id);
        return response()->json($openAccount, 200);
    }

    public function update(Request $request, $id)
    {
        $openAccount = OpenAccount::findOrFail($id);

        $request->validate([
            'customer_name'    => 'nullable|string',
            'amount'           => 'required|numeric|min:0',
            'some_description' => 'nullable|string',
            'branch_id'        => 'nullable|integer',
            'description'      => 'nullable|string',
            'season_id'        => 'nullable|integer',
        ]);

        $openAccount->update($request->all());

        return response()->json([
            'message' => 'Açık hesap kaydı başarıyla güncellendi.',
            'data'    => $openAccount
        ], 200);
    }

    public function destroy($id)
    {
        $openAccount = OpenAccount::findOrFail($id);
        $openAccount->delete();

        return response()->json([
            'message' => 'Açık hesap kaydı başarıyla silindi.'
        ], 200);
    }
}
