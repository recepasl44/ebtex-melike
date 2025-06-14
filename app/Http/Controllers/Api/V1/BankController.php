<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Bank\Bank;  // Model dizininize göre güncelleyiniz
use Illuminate\Http\Request;

class BankController extends Controller
{
    /**
     * 1) index: Tüm bank kayıtlarını listeler (isteğe göre filtre ekleyebilirsiniz).
     */
    public function index(Request $request)
    {
        // Örnek filtreleme
        $query = Bank::query();

        // branch_id, season_id, bank_name gibi örnek filtreler
        if ($request->filled('branch_id')) {
            $query->where('branch_id', $request->branch_id);
        }
        if ($request->filled('season_id')) {
            $query->where('season_id', $request->season_id);
        }
        if ($request->filled('bank_name')) {
            $query->where('bank_name', 'LIKE', '%' . $request->bank_name . '%');
        }

        // Sayfalandırma
        $banks = $query->orderBy('created_at', 'desc')
                       ->paginate($request->get('paginate', 10));

        return response()->json($banks, 200);
    }

    /**
     * 2) store: Yeni bank kaydı oluşturur.
     */
    public function store(Request $request)
    {
        // Validasyon
        $request->validate([
            'bank_name' => 'required|string',
            'amount'    => 'required|numeric|min:0',
            // opsiyonel alanlar
            'iban'      => 'nullable|string',
            'description'      => 'nullable|string',
            'branch_id' => 'nullable|integer',
            'season_id' => 'nullable|integer',
        ]);

        // Kayıt oluştur
        $bank = Bank::create($request->all());

        return response()->json([
            'message' => 'Banka kaydı başarıyla oluşturuldu.',
            'data'    => $bank
        ], 201);
    }

    /**
     * 3) show: Belirtilen ID'ye ait bank kaydını gösterir.
     */
    public function show($id)
    {
        $bank = Bank::findOrFail($id);
        return response()->json($bank, 200);
    }

    /**
     * 4) update: Belirtilen bank kaydını günceller.
     */
    public function update(Request $request, $id)
    {
        $bank = Bank::findOrFail($id);

        // Validasyon
        $request->validate([
            'bank_name' => 'required|string',
            'amount'    => 'required|numeric|min:0',
            'iban'      => 'nullable|string',
            'description'      => 'nullable|string',
            'branch_id' => 'nullable|integer',
            'season_id' => 'nullable|integer',
        ]);

        // Kaydı güncelle
        $bank->update($request->all());

        return response()->json([
            'message' => 'Banka kaydı başarıyla güncellendi.',
            'data'    => $bank
        ], 200);
    }

    /**
     * 5) destroy: Belirtilen bank kaydını siler.
     */
    public function destroy($id)
    {
        $bank = Bank::findOrFail($id);
        $bank->delete();

        return response()->json([
            'message' => 'Banka kaydı başarıyla silindi.'
        ], 200);
    }
}
