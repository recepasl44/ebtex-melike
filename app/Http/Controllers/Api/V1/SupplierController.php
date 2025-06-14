<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SupplierController extends Controller
{
    public function index(Request $request)
    {
        $limit   = $request->get('paginate', 25);
        $orderBy = $request->get('orderBy', 'ASC');
        $sortBy  = $request->get('sortBy', 'created_at');
        $search  = $request->get('search', '');
    
        $query = Supplier::query();
    
        if ($search) {
            $query->where('name', 'LIKE', "%$search%")
                  ->orWhere('mail', 'LIKE', "%$search%")
                  ->orWhere('phone', 'LIKE', "%$search%");
        }
    
        // Normal şekilde paginate
        $suppliers = $query->orderBy($sortBy, $orderBy)->paginate($limit);
    
        // Her bir supplier’a borç/ödeme/kalan borç değerlerini ekleyelim
        // (borç: debts tablosundaki amount toplamı, ödeme: payments tablosundaki amount toplamı)
        $suppliers->getCollection()->transform(function ($supplier) {
            $totalDebts     = (float) $supplier->debts()->sum('amount');
            $totalPayments  = (float) $supplier->payments()->sum('amount');
            $remainingDebt  = $totalDebts - $totalPayments;
    
            // Laravel model objesine istediğiniz alanları ekleyebilirsiniz (sanatçık).
            // Bu alanlar JSON'a yansır.
            $supplier->total_debts     = $totalDebts;
            $supplier->total_payments  = $totalPayments;
            $supplier->remaining_debt  = $remainingDebt;
    
            return $supplier;
        });
    
        return response()->json($suppliers, 200);
    }
    

    public function show(Supplier $supplier)
    {
        // Gerekli ilişkileri yüklüyoruz (opsiyonel)
        $supplier->load(['invoices', 'debts', 'payments']);
    
        // Toplam borç
        $totalDebts = (float) $supplier->debts()->sum('amount');
    
        // Toplam ödeme
        $totalPayments = (float) $supplier->payments()->sum('amount');
    
        // Kalan borç
        $remainingDebt = $totalDebts - $totalPayments;
    
        // Ödeme yöntemlerini DB'den çekip (id => name) şeklinde dize elde edelim
        // PaymentMethod modeliniz Paymentmethods tablosunu temsil eder.
        // Örn: PaymentMethod::pluck('name','id');
        $paymentMethods = \App\Models\PaymentMethods\PaymentMethod::pluck('name', 'id')->toArray();
    
        // Supplier’ın payments tablosundan groupBy ile
        // payment_method_id bazında amount toplamları:
        // ->selectRaw('payment_method_id, SUM(amount) as total_amount')
        $paymentsByMethod = $supplier->payments()
            ->selectRaw('payment_method_id, SUM(amount) as total_amount')
            ->groupBy('payment_method_id')
            ->pluck('total_amount', 'payment_method_id'); 
            // Sonuç: [ 1 => 15000, 2 => 30000, ... ]
    
        // Bu veriyi methodId => methodName => sum formatına dönüştürelim
        $formattedPayments = [];
        foreach ($paymentsByMethod as $methodId => $sum) {
            // payment method tablosundaki name
            $methodName = $paymentMethods[$methodId] ?? 'Diğer';
            $formattedPayments[$methodName] = (float) $sum;
        }
    
        // Son olarak supplier verisi + aggregator değerlerini JSON’a dönüyoruz
        return response()->json([
            'data' => $supplier,              // Tekil tedarikçi
            'totalDebts' => $totalDebts,      // Tüm borçlar
            'totalPayments' => $totalPayments,// Tüm ödemeler
            'remainingDebt' => $remainingDebt,// Kalan borç
            'paymentsByMethod' => $formattedPayments,
        ], 200);
    }
    

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191',
            'mail' => 'nullable|email|max:191',
            'phone' => 'nullable|max:15',
            'fax' => 'nullable|max:15',
            'address' => 'nullable|max:255',
            'register_no' => 'required|unique:suppliers,register_no',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $supplier = Supplier::create($request->all());

        return response()->json([
            'message' => 'Supplier created successfully.',
            'data' => $supplier
        ], 201);
    }

    public function update(Request $request, Supplier $supplier)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191',
            'mail' => 'nullable|email|max:191',
            'phone' => 'nullable|max:15',
            'fax' => 'nullable|max:15',
            'address' => 'nullable|max:255',
            'register_no' => 'required|unique:suppliers,register_no,'.$supplier->id,
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $supplier->update($request->all());

        return response()->json([
            'message' => 'Supplier updated successfully.',
            'data' => $supplier
        ], 200);
    }

    public function destroy(Supplier $supplier)
    {
        $supplier->delete();
        return response()->json(['message' => 'Supplier deleted successfully.'], 200);
    }
    public function getRegisterNo(Request $request)
{
    // Mevcut en yüksek register_no değerini alıyoruz.
    $maxRegisterNo = Supplier::max('register_no');
    // Eğer daha önce kayıt yapılmamışsa 1, yapılmışsa mevcut değerin integer hali + 1
    $newNumber = $maxRegisterNo ? ((int)$maxRegisterNo + 1) : 1;
    // 4 haneli olacak şekilde başında sıfır olacak şekilde formatlıyoruz.
    $formattedRegisterNo = str_pad($newNumber, 4, '0', STR_PAD_LEFT);

    return response()->json(['no' => $formattedRegisterNo]);
}

}
