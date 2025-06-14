<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Expenses\Expenses;
use App\Models\Expenses\ExpenseCategory;
use App\Models\Supplier;
use Illuminate\Http\Request;
use DB;

class ExpenseController extends Controller
{
    /**
     * Frontend'in istediği tip yapısına uygun veri dönüşümü.
     * Eğer giderin durumu "ödenecek" ise IPayable,
     * "ödendi" ise IPaid tipinde dönüş yapılır.
     */
    private function transformExpense($expense)
    {
        // Ortak veriler
        $baseData = [
            'id'          => $expense->id,
            'branch_id'   => $expense->branch_id,
            'branch_name' => $expense->branch ? $expense->branch->name : null,
            'seasson_id'  => $expense->seasson_id,
            'seasson_name'=> $expense->seasons ? $expense->seasons->name : null,
            'supplier_id' => $expense->supplier_id,
            'supplier_name' => $expense->supplier ? $expense->supplier->name : null,
            'invoice_serial_no' => $expense->invoice_serial_no,
            'invoice_date' => $expense->invoice_date,
            'category_id' => $expense->expense_category_id,
            'category_name' => $expense->category ? $expense->category->name : null,
            'status'      => $expense->status,
            'amount'     => $expense->amount,
            'description' => $expense->description,
            'created_at'   => $expense->created_at,
            'updated_at'   => $expense->updated_at,
        
        ];
    
        // Duruma göre IPayable veya IPaid tipinde
        if ($expense->status === 'ödenecek') {
            return array_merge($baseData, [
                'due_date'    => $expense->due_date,
                'amount'      => $expense->amount,
                'description' => $expense->description,
            ]);
        } elseif ($expense->status === 'ödendi') {
            return array_merge($baseData, [
                'payment_method_id' => $expense->payment_method_id,
                'amount'            => $expense->amount,
                'bank'              => $expense->bank,
                'description'       => $expense->description,
            ]);
        }
    
        // Diğer durumlar
        return array_merge($baseData, [
            // ...
        ]);
    }
    

    public function index(Request $request)
    {
        $paginate = $request->get('paginate', 10);
        $search = $request->get('search', '');
        $orderBy = $request->get('orderBy', 'ASC');
        $sortBy = $request->get('sortBy', 'created_at');
    
        // Bu satırda with içerisine branch ve season ekliyoruz
        $query = Expenses::with(['supplier', 'category', 'branch', 'season']);
    
        // Arama, sıralama vs. kodlarınız devam ediyor...
        if ($search) {
            $query->where('invoice_serial_no', 'LIKE', "%$search%")
                ->orWhere('season', 'LIKE', "%$search%")
                ->orWhere('amount', 'LIKE', "%$search%")
                ->orWhere('description', 'LIKE', "%$search%")
                ->orWhereHas('supplier', function ($q) use ($search) {
                    $q->where('name', 'LIKE', "%$search%");
                })
                ->orWhereHas('category', function ($q) use ($search) {
                    $q->where('name', 'LIKE', "%$search%");
                });
        }
    
        $expenses = $query->orderBy($sortBy, $orderBy)
            ->paginate($paginate)
            ->appends($request->query());
    
        // Her gider kaydını frontend'in beklediği tipe dönüştürüyoruz
        $expenses->getCollection()->transform(function ($expense) {
            return $this->transformExpense($expense);
        });
    
        return response()->json($expenses, 200);
    }

    public function getExpenseSummary(Request $request)
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        $totalSalary = DB::table('personel_maas_borc')
            ->when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
                return $query->whereBetween('created_at', [$startDate, $endDate]);
            })
            ->select(DB::raw('SUM(aylik_ucret * maas_sayisi) as total'))
            ->value('total');
        $totalSalary = $totalSalary ?? 0;

        $paidSalary = DB::table('personel_maas_odeme')
            ->when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
                return $query->whereBetween('created_at', [$startDate, $endDate]);
            })
            ->sum('miktar');
        $remainingSalary = $totalSalary - $paidSalary;

        $totalPrim = DB::table('personel_prim')
            ->when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
                return $query->whereBetween('created_at', [$startDate, $endDate]);
            })
            ->sum('miktar');
        $paidPrim = 0;
        $remainingPrim = $totalPrim - $paidPrim;

        $totalTazminat = DB::table('personel_tazminat')
            ->when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
                return $query->whereBetween('created_at', [$startDate, $endDate]);
            })
            ->sum('miktar');
        $paidTazminat = 0;
        $remainingTazminat = $totalTazminat - $paidTazminat;

        return response()->json([
            'success' => true,
            'data' => [
                'salary' => [
                    'verecek' => number_format($totalSalary, 2, '.', ''),
                    'odenen'  => number_format($paidSalary, 2, '.', ''),
                    'kalan'   => number_format($remainingSalary, 2, '.', ''),
                ],
                'prim' => [
                    'verecek' => number_format($totalPrim, 2, '.', ''),
                    'odenen'  => number_format($paidPrim, 2, '.', ''),
                    'kalan'   => number_format($remainingPrim, 2, '.', ''),
                ],
                'tazminat' => [
                    'verecek' => number_format($totalTazminat, 2, '.', ''),
                    'odenen'  => number_format($paidTazminat, 2, '.', ''),
                    'kalan'   => number_format($remainingTazminat, 2, '.', ''),
                ],
            ],
        ], 200);
    }

    public function store(Request $request)
    {
        // Validasyon örneği (ihtiyaç duyduğunuz diğer alanları da ekleyin)
        $data = $request->validate([
            'supplier_id'         => 'required|exists:suppliers,id',
            'branch_id'              => 'nullable|integer',
            'seasson_id'              => 'nullable|integer',
            'invoice_serial_no'   => 'nullable|string',
            'due_date'            => 'required_if:status,ödenecek|nullable|date',
            'expense_category_id' => 'required|exists:expense_categories,id',
            'description'         => 'nullable|string',
            'status'              => 'required|in:ödenecek,ödendi',
    
            // Burada asıl önemli kısım:
            'payment_method_id'   => 'required_if:status,ödendi|nullable|integer',
            'pay_id'              => 'required_if:status,ödendi|nullable|integer',
    
            // Normalde amount'ı dışarıdan alırsanız
            // ama override edecekseniz min=0 vs. diyebilirsiniz.
            'amount'             => 'required|numeric|min:0',
        ]);
    
        // payment_method_id geldiyse, ilgili tablodan amount alalım:
        if (! empty($data['payment_method_id']) && ! empty($data['pay_id'])) {
            // getAmountByPaymentMethod yardımıyla tabloyu bulup amount çekiyoruz
            $amountFromTable = $this->getAmountByPaymentMethod(
                $data['payment_method_id'],
                $data['pay_id']
            );
            // Dışarıdan gönderilen amount'ı isterseniz tamamen ezebilirsiniz:
            $data['amount'] = $amountFromTable;
            // veya ekleyerek: $data['amount'] += $amountFromTable;
        }
    
        // Artık expense kaydını oluşturabiliriz
        $expense = Expenses::create($data);
    
        // transformExpense mevcut mantığınız
        $transformedExpense = $this->transformExpense($expense);
    
        return response()->json([
            'message' => 'Gider başarıyla oluşturuldu.',
            'data'    => $transformedExpense
        ], 201);
    }
    public function show($id)
    {
        $expense = Expenses::with(['supplier', 'category', 'branch', 'season'])
                    ->findOrFail($id);
    
        $transformedExpense = $this->transformExpense($expense);
        return response()->json(['data' => $transformedExpense], 200);
    }
    public function update(Request $request, $id)
    {
        $expense = Expenses::findOrFail($id);
    
        $data = $request->validate([
            'supplier_id'         => 'required|exists:suppliers,id',
            'seasson_id'              => 'nullable|integer',
            'branch_id'              => 'nullable|integer',

            'invoice_serial_no'   => 'nullable|string',
            'due_date'            => 'required_if:status,ödenecek|nullable|date',
            'expense_category_id' => 'required|exists:expense_categories,id',
            'description'         => 'nullable|string',
            'status'              => 'required|in:ödenecek,ödendi',
    
            'payment_method_id'   => 'required_if:status,ödendi|nullable|integer',
            'pay_id'              => 'required_if:status,ödendi|nullable|integer',
            
            'amount'              => 'required|numeric|min:0',
        ]);
    
        if (! empty($data['payment_method_id']) && ! empty($data['pay_id'])) {
            $amountFromTable = $this->getAmountByPaymentMethod(
                $data['payment_method_id'],
                $data['pay_id']
            );
            $data['amount'] = $amountFromTable;
        }
    
        $expense->update($data);
    
        $transformedExpense = $this->transformExpense($expense);
    
        return response()->json([
            'message' => 'Gider başarıyla güncellendi.',
            'data'    => $transformedExpense
        ], 200);
    }
    public function destroy($id)
    {
        $expense = Expenses::findOrFail($id);
        $expense->delete();
        return response()->json(['message' => 'Gider başarıyla silindi.'], 200);
    }

    public function getExpenseCategories(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
        ]);
        $category = ExpenseCategory::create($data);
        return response()->json([
            'message' => 'Gider kategorisi başarıyla oluşturuldu.',
            'data' => $category
        ], 201);
    }

    public function getExpenseCategoriesIndex(Request $request)
    {
        $paginate = $request->get('paginate', 10);
        $search = $request->get('search', '');
        $query = ExpenseCategory::query();
        if ($search) {
            $query->where('name', 'LIKE', "%$search%");
        }
        $categories = $query->paginate($paginate)->appends($request->query());
        return response()->json($categories, 200);
    }

    public function getExpenseCategoriesShow($id)
    {
        $category = ExpenseCategory::findOrFail($id);
        return response()->json(['data' => $category], 200);
    }

    public function getExpenseCategoriesUpdate(Request $request, $id)
    {
        $category = ExpenseCategory::findOrFail($id);
        $data = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
        ]);
        $category->update($data);
        return response()->json([
            'message' => 'Gider kategorisi başarıyla güncellendi.',
            'data' => $category
        ], 200);
    }

    public function getExpenseCategoriesDestroy($id)
    {
        $category = ExpenseCategory::findOrFail($id);
        $category->delete();
        return response()->json(['message' => 'Gider kategorisi başarıyla silindi.'], 200);
    }
    private function getAmountByPaymentMethod($paymentMethodId, $payId)
{
    // 1) paymentmethods tablosundan method’u bulalım
    $method = \App\Models\PaymentMethods\PaymentMethod::find($paymentMethodId);
    if (! $method) {
        return 0; // Bulamazsak 0 döndürelim veya hata fırlatabilirsiniz
    }

    // 2) Adına göre ilgili tablo/model
    switch ($method->name) {
        case 'Çek & Senet':
            // instruments tablosu
            $instrument = \App\Models\Instrument\Instrument::find($payId);
            return $instrument ? $instrument->amount : 0;

        case 'Kredi Kartı':
            // credit_cards tablosu
            $credit = \App\Models\CreditCard\CreditCard::find($payId);
            return $credit ? $credit->amount : 0;

        case 'Banka Anlaşması':
            // banks tablosu
            $bank = \App\Models\Bank\Bank::find($payId);
            return $bank ? $bank->amount : 0;

        case 'Açık Hesap (Elden)':
            // open_accounts tablosu
            $openAccount = \App\Models\OpenAccount\OpenAccount::find($payId);
            return $openAccount ? $openAccount->amount : 0;

        default:
            // Tanımlı olmayan bir yöntem ise 0 döndür
            return 0;
    }
}
}
