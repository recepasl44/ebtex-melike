<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\CreditCard\CreditCard;  // Model dizininize göre güncelleyiniz
use Illuminate\Http\Request;

class CreditCardController extends Controller
{
    public function index(Request $request)
    {
        $query = CreditCard::query();

        // Örnek filtreler
        if ($request->filled('branch_id')) {
            $query->where('branch_id', $request->branch_id);
        }
        if ($request->filled('season_id')) {
            $query->where('season_id', $request->season_id);
        }
        if ($request->filled('card_holder_name')) {
            $query->where('card_holder_name', 'LIKE', '%' . $request->card_holder_name . '%');
        }

        $creditCards = $query->orderBy('created_at', 'desc')
                             ->paginate($request->get('paginate', 10));

        return response()->json($creditCards, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'card_holder_name' => 'required|string',
            'card_number'      => 'required|string',
            'expire_month'     => 'required|integer',
            'expire_year'      => 'required|integer',
            'cvv'              => 'required|string',
            'amount'           => 'required|numeric|min:0',
            'description'      => 'nullable|string',
            'branch_id'        => 'nullable|integer',
            'season_id'        => 'nullable|integer',
        ]);

        $card = CreditCard::create($request->all());

        return response()->json([
            'message' => 'Kredi kartı kaydı başarıyla oluşturuldu.',
            'data'    => $card
        ], 201);
    }

    public function show($id)
    {
        $card = CreditCard::findOrFail($id);
        return response()->json($card, 200);
    }

    public function update(Request $request, $id)
    {
        $card = CreditCard::findOrFail($id);

        $request->validate([
            'card_holder_name' => 'required|string',
            'card_number'      => 'required|string',
            'expire_month'     => 'required|integer',
            'expire_year'      => 'required|integer',
            'cvv'              => 'required|string',
            'amount'           => 'required|numeric|min:0',
            'description'      => 'nullable|string',
            'branch_id'        => 'nullable|integer',
            'season_id'        => 'nullable|integer',
        ]);

        $card->update($request->all());

        return response()->json([
            'message' => 'Kredi kartı kaydı başarıyla güncellendi.',
            'data'    => $card
        ], 200);
    }

    public function destroy($id)
    {
        $card = CreditCard::findOrFail($id);
        $card->delete();

        return response()->json([
            'message' => 'Kredi kartı kaydı başarıyla silindi.'
        ], 200);
    }
}
