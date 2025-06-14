<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Rent\Rent;
use App\Models\RentInstallment\RentInstallment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RentController extends Controller
{
    /**
     * Tüm kira kayıtlarını listele.
     */
    public function index(Request $request)
    {
        $limit  = $request->get('paginate', 25);
        $order  = $request->get('orderBy', 'DESC');
        $sortBy = $request->get('sortBy', 'rent_date');

        $rents = \App\Models\Rent\Rent::with('installments')
            ->orderBy($sortBy, $order)
            ->paginate($limit)
            ->appends($request->query());

        return response()->json($rents, 200);
    }

    /**
     * Belirli bir kira kaydını göster.
     */
    public function show($id)
    {
        $rent = Rent::with('installments')->findOrFail($id);
        return response()->json(['data' => $rent], 200);
    }

    /**
     * Yeni kira kaydı oluştur ve taksitleri ekle.
     *
     * Beklenen input:
     * - season_id, branch_id, rent_date, total_rent
     * - installments: array; her biri için due_date ve amount
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'season_id'    => 'required|integer',
            'branch_id'    => 'required|integer',
            'rent_date'    => 'required|date',
            'total_rent'   => 'required|numeric',
            'installments' => 'required|array|min:1',
            'installments.*.due_date' => 'required|date',
            'installments.*.amount'   => 'required|numeric',
        ]);

        // Toplam taksitlerin toplamı kontrolü
        $totalInstallment = array_sum(array_column($data['installments'], 'amount'));
        if (abs($totalInstallment - $data['total_rent']) > 0.01) {
            return response()->json([
                'message' => 'Girilen taksitlerin toplamı, toplam kira tutarına eşit olmalıdır.'
            ], 422);
        }

        DB::beginTransaction();
        try {
            $rent = Rent::create([
                'season_id'  => $data['season_id'],
                'branch_id'  => $data['branch_id'],
                'rent_date'  => $data['rent_date'],
                'total_rent' => $data['total_rent'],
            ]);

            foreach ($data['installments'] as $index => $inst) {
                RentInstallment::create([
                    'rent_id'         => $rent->id,
                    'installment_no'  => $index + 1,
                    'due_date'        => $inst['due_date'],
                    'amount'          => $inst['amount'],
                    'remaining_amount'=> $inst['amount'], // Başlangıçta ödenmemiş
                ]);
            }

            DB::commit();
            return response()->json([
                'message' => 'Kira ve taksit bilgileri başarıyla oluşturuldu.',
                'data'    => $rent->load('installments')
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'İşlem sırasında hata oluştu.',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Kira kaydını güncelle.
     *
     * Not: Bu örnekte sadece ana kira kaydı güncelleniyor.
     * Taksitlerin güncellenmesi için ayrıca ayrı bir yöntem oluşturulabilir.
     */
    public function update(Request $request, $id)
    {
        $rent = Rent::findOrFail($id);

        $data = $request->validate([
            'season_id'  => 'required|integer',
            'branch_id'  => 'required|integer',
            'rent_date'  => 'required|date',
            'total_rent' => 'required|numeric',
        ]);

        $rent->update($data);
        // Gerekirse taksit güncelleme işlemleri eklenebilir

        return response()->json([
            'message' => 'Kira kaydı başarıyla güncellendi.',
            'data'    => $rent->load('installments')
        ], 200);
    }

    /**
     * Kira kaydını sil.
     */
    public function destroy($id)
    {
        $rent = Rent::findOrFail($id);
        $rent->delete();

        return response()->json([
            'message' => 'Kira kaydı başarıyla silindi.'
        ], 200);
    }
}
