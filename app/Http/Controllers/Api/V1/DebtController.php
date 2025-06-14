<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Supplier;
use App\Models\Debts\Debt;
use App\Models\Invoice\Invoice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Services\InvoiceSerialService;
use Illuminate\Support\Facades\DB;

class DebtController extends Controller
{
    public function index(Request $request, Supplier $supplier)
    {
        $limit   = $request->get('paginate', 25);
        $orderBy = $request->get('orderBy', 'ASC');
        $sortBy  = $request->get('sortBy', 'created_at');

        $debts = Debt::where('supplier_id', $supplier->id)
                     ->with(['branch', 'season', 'expenseCategory'])
                     ->orderBy($sortBy, $orderBy)
                     ->paginate($limit);

        // Her bir borcu dönüştürelim
        $debts->getCollection()->transform(function ($debt) {
            return $this->transformDebt($debt);
        });

        return response()->json($debts, 200);
    }
    public function indexlist(Request $request)
    {
        $limit   = $request->get('paginate', 25);
        $orderBy = $request->get('orderBy', 'ASC');
        $sortBy  = $request->get('sortBy', 'created_at');

        $debts = Debt::with(['branch', 'season', 'expenseCategory'])
                     ->orderBy($sortBy, $orderBy)
                     ->paginate($limit);

        // Her bir borcu dönüştürelim
        $debts->getCollection()->transform(function ($debt) {
            return $this->transformDebt($debt);
        });

        return response()->json($debts, 200);
    }


    public function store(Request $request, $supplierId)
    {
        $validator = Validator::make($request->all(), [
            'amount'              => 'required|numeric',
            'due_date'            => 'required|date',
            'description'         => 'nullable|string',
            'branch_id'           => 'nullable|integer|exists:branches,id',
            'seasson_id'          => 'nullable|integer|exists:seasons,id',
            'expense_category_id' => 'nullable|integer|exists:expense_categories,id',

            'with_invoice'        => 'nullable|boolean',
            'invoice_date'        => 'required_if:with_invoice,true|date',
            'invoice_pdf'         => 'nullable|string',  // base64 PDF
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        DB::beginTransaction();
        try {
            // 1) Borç kaydı
            $debt = new Debt();
            $debt->supplier_id         = $supplierId;
            $debt->amount              = $request->amount;
            $debt->due_date            = $request->due_date;
            $debt->description         = $request->description;
            $debt->branch_id           = $request->branch_id;
            $debt->seasson_id          = $request->seasson_id;
            $debt->expense_category_id = $request->expense_category_id;
            $debt->save();

            // 2) Fatura oluşturma (opsiyonel)
            $invoice = null;
            if ($request->has('with_invoice') && $request->with_invoice == true) {
                $serialService = new InvoiceSerialService();
                $fisSeriNo    = $serialService->getNextSerial();

                $invoice = new Invoice();
                $invoice->supplier_id       = $supplierId;
                $invoice->issue_date        = $request->invoice_date;
                $invoice->invoice_type_code = 'BORC';
                $invoice->fis_seri_no       = $fisSeriNo;
                $invoice->payable_amount    = $request->amount;
                if ($request->invoice_pdf) {
                    $invoice->pdf_content = $request->invoice_pdf;
                }
                $invoice->save();
            }

            DB::commit();

            $debt->load(['branch', 'season', 'expenseCategory']);
            $transformedDebt = $this->transformDebt($debt);

            return response()->json([
                'message' => 'Borç eklendi (fatura isteğe bağlı).',
                'debt'    => $transformedDebt,
                'invoice' => $invoice,
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Kayıt hatası: ' . $e->getMessage()
            ], 500);
        }
    }

    public function show(Supplier $supplier, Debt $debt)
    {
        if ($debt->supplier_id !== $supplier->id) {
            return response()->json(['message' => 'Borç bulunamadı'], 404);
        }
        $debt->load(['branch', 'season', 'expenseCategory']);

        return response()->json($this->transformDebt($debt), 200);
    }

    public function update(Request $request, Supplier $supplier, Debt $debt)
    {
        if ($debt->supplier_id !== $supplier->id) {
            return response()->json(['message' => 'Borç bulunamadı'], 404);
        }

        $validator = Validator::make($request->all(), [
            'amount'              => 'required|numeric',
            'due_date'            => 'nullable|date',
            'description'         => 'nullable|string',
            'branch_id'           => 'nullable|integer|exists:branches,id',
            'seasson_id'          => 'nullable|integer|exists:seasons,id',
            'expense_category_id' => 'nullable|integer|exists:expense_categories,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $debt->update([
            'amount'              => $request->amount,
            'due_date'            => $request->due_date,
            'description'         => $request->description,
            'branch_id'           => $request->branch_id,
            'seasson_id'          => $request->seasson_id,
            'expense_category_id' => $request->expense_category_id,
        ]);

        $debt->load(['branch', 'season', 'expenseCategory']);

        return response()->json([
            'message' => 'Borç güncellendi',
            'data'    => $this->transformDebt($debt),
        ], 200);
    }

    public function destroy(Supplier $supplier, Debt $debt)
    {
        if ($debt->supplier_id !== $supplier->id) {
            return response()->json(['message' => 'Borç bulunamadı'], 404);
        }

        $debt->delete();

        return response()->json(['message' => 'Borç silindi'], 200);
    }

    /**
     * Helper: Borç kaydını daha açıklayıcı şekilde döndürür.
     */
    private function transformDebt(Debt $debt)
    {
        return [
            'id'                  => $debt->id,
            'supplier_id'         => $debt->supplier_id,
            'branch_id'           => $debt->branch_id,
            'branch_name'         => optional($debt->branch)->name,
            'seasson_id'          => $debt->seasson_id,
            'seasson_name'        => optional($debt->season)->name,
            'expense_category_id' => $debt->expense_category_id,
            'expense_category_name' => optional($debt->expenseCategory)->name,
            'payment_method_id' => $debt->paymentMethod_id,
            'amount'      => $debt->amount,
            'due_date'    => $debt->due_date,
            'description' => $debt->description,
            'created_at'  => $debt->created_at,
            'updated_at'  => $debt->updated_at,
        ];
    }
}