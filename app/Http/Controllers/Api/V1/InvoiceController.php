<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB; // Raw sorgu için
use App\Services\InvoiceSerialService;

// Modeller
use App\Models\Invoice\Invoice;
use App\Models\Invoice\InvoiceDetail\InvoiceDetail;
use App\Models\Enrollments\Enrollment;
use App\Models\Installments\Installment; // Tekil model
use App\Models\Payments;

class InvoiceController extends Controller
{
    /**
     * 1) Listeleme - index()
     *    GET /api/v1/invoice?search=&page=&limit=...
     */
    public function index(Request $request)
    {
        $limit   = $request->get('limit', 25);
        $search  = $request->get('search', '');
        $orderBy = $request->get('orderBy', 'ASC');
        $sortBy  = $request->get('sortBy', 'id');

        $query = Invoice::query();

        if ($search) {
            $query->where('invoice_number', 'LIKE', "%$search%")
                  ->orWhere('fis_seri_no', 'LIKE', "%$search%");
        }

        $invoices = $query->orderBy($sortBy, $orderBy)
                          ->paginate($limit);

        return response()->json($invoices, 200);
    }

    /**
     * 2) Store: İstek içeriğine göre manuel veya toplu fatura oluşturma
     */
    public function store(Request $request)
    {
        // "enrollments_id" veya "invoice_count_status" varsa toplu (auto-generate)
        $isAutoGenerate = $request->filled('enrollments_id') || $request->filled('invoice_count_status');

        return $isAutoGenerate
            ? $this->storeAutoGenerate($request)
            : $this->storeManual($request);
    }

    /**
     * 2A) Manuel Fatura Oluşturma
     */
    private function storeManual(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'student_id'             => 'required|integer',
            'issue_date'             => 'required|date',
            'invoice_type_code'      => 'required|string|max:100',
            'document_currency_code' => 'required|string|max:3',
            'enrollment_id'          => 'required|integer',
            'installment_id'         => 'required|integer',
            'payment_id'             => 'nullable|integer',
            'payable_amount'         => 'required|numeric',
            'details'                => 'required|array',
            'details.*.item_name'    => 'required|string|max:255',
            'details.*.unit_price'   => 'required|numeric',
            'details.*.quantity'     => 'required|numeric',
            'details.*.line_extension_amount' => 'required|numeric',
            'details.*.vat_rate'     => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error (manual)',
                'errors'  => $validator->errors()
            ], 422);
        }

        // Fatura numarası API üzerinden oluşturuluyor
        $invoiceNumber = (new InvoiceSerialService)->getNextSerial();

        // Manuel fatura: fatura kaydı, enrollment ve taksit bilgileri ekleniyor
        $invoice = Invoice::create([
            'student_id'             => $request->student_id,
            'invoice_number'         => $invoiceNumber,
            'fis_seri_no'            => 'FTR',
            'issue_date'             => $request->issue_date,
            'invoice_type_code'      => $request->invoice_type_code,
            'document_currency_code' => $request->document_currency_code,
            'enrollment_id'          => $request->enrollment_id,
            'installment_id'         => $request->installment_id,
            'payment_id'             => $request->payment_id,
            'payable_amount'         => $request->payable_amount,
        ]);

        foreach ($request->details as $detail) {
            InvoiceDetail::create([
                'invoice_id'            => $invoice->id,
                'item_name'             => $detail['item_name'],
                'unit_price'            => $detail['unit_price'],
                'invoiced_quantity'     => $detail['quantity'],
                'line_extension_amount' => $detail['line_extension_amount'],
                'tax_amount'            => $this->calculateTax($detail['line_extension_amount'], $detail['vat_rate']),
                'vat_rate'              => $detail['vat_rate'],
            ]);
        }

        return response()->json([
            'message' => 'Manuel fatura başarıyla oluşturuldu.',
            'data'    => $invoice->load('details')
        ], 201);
    }

    /**
     * 2B) Toplu (Otomatik) Fatura Oluşturma
     */
    public function storeAutoGenerate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'student_id'             => 'required|integer',
            'enrollments_id'         => 'required|array',
            'enrollments_id.*'       => 'integer',
            'invoice_count_status'   => 'required|boolean',
            'invoice_count'          => 'required|integer',
            'issue_date'             => 'required|date',
            'invoice_type_code'      => 'required|string|max:100',
            'document_currency_code' => 'required|string|max:3',
            'details'                => 'required|array',
            'details.*.item_name'    => 'required|string|max:255',
            'details.*.unit_price'   => 'required|numeric',
            'details.*.quantity'     => 'required|numeric',
            'details.*.line_extension_amount' => 'required|numeric',
            'details.*.vat_rate'     => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error (auto-generate)',
                'errors'  => $validator->errors()
            ], 422);
        }

        $invoiceCountStatus = $request->invoice_count_status;
        $createdInvoices    = [];
        $enrollmentIds      = $request->enrollments_id;
        $enrollments        = Enrollment::whereIn('id', $enrollmentIds)->get();

        if ($invoiceCountStatus) {
            // Bulk fatura modu: Tüm enrollment'ların final_fee toplamını bölüyoruz.
            // Bulk fatura için enrollment_id olarak ilk enrollment'ın id'si set ediliyor, installment_id NULL.
            $firstEnrollment = $enrollments->first();
            $firstEnrollmentId = $firstEnrollment ? $firstEnrollment->id : null;
            $total = 0;
            foreach ($enrollments as $enrollment) {
                $fee = $enrollment->final_fee ?? 0;
                $total += $fee;
            }
            $splitAmount = ($request->invoice_count > 0)
                ? round($total / $request->invoice_count, 2)
                : $total;

            for ($i = 1; $i <= $request->invoice_count; $i++) {
                $invoiceNumber = (new InvoiceSerialService)->getNextSerial();

                $invoice = Invoice::create([
                    'student_id'             => $request->student_id,
                    'invoice_number'         => $invoiceNumber,
                    'fis_seri_no'            => 'FTR',
                    'issue_date'             => $request->issue_date,
                    'invoice_type_code'      => $request->invoice_type_code,
                    'document_currency_code' => $request->document_currency_code,
                    'payable_amount'         => $splitAmount,
                    'enrollment_id'          => $firstEnrollmentId, // Bulk: ilk enrollment'a referans
                    'installment_id'         => null,
                ]);

                foreach ($request->details as $detail) {
                    InvoiceDetail::create([
                        'invoice_id'            => $invoice->id,
                        'item_name'             => $detail['item_name'],
                        'unit_price'            => $detail['unit_price'],
                        'invoiced_quantity'     => $detail['quantity'],
                        'line_extension_amount' => $detail['line_extension_amount'],
                        'tax_amount'            => $this->calculateTax($detail['line_extension_amount'], $detail['vat_rate']),
                        'vat_rate'              => $detail['vat_rate'],
                    ]);
                }

                $createdInvoices[] = $invoice->load('details');
            }
        } else {
            // Per-taksit fatura modu: Her enrollment'daki her taksit için fatura oluştur.
            foreach ($enrollments as $enrollment) {
                $installments = Installment::where('enrollment_id', $enrollment->id)->get();

                foreach ($installments as $inst) {
                    $invoiceNumber = (new InvoiceSerialService)->getNextSerial();

                    $invoice = Invoice::create([
                        'student_id'             => $request->student_id,
                        'invoice_number'         => $invoiceNumber,
                        'fis_seri_no'            => 'FTR',
                        'issue_date'             => $request->issue_date,
                        'invoice_type_code'      => $request->invoice_type_code,
                        'document_currency_code' => $request->document_currency_code,
                        'payable_amount'         => $inst->amount,
                        'enrollment_id'          => $enrollment->id,
                        'installment_id'         => $inst->id,
                    ]);

                    foreach ($request->details as $detail) {
                        InvoiceDetail::create([
                            'invoice_id'            => $invoice->id,
                            'item_name'             => $detail['item_name'],
                            'unit_price'            => $detail['unit_price'],
                            'invoiced_quantity'     => $detail['quantity'],
                            'line_extension_amount' => $inst->amount,
                            'tax_amount'            => $this->calculateTax($inst->amount, $detail['vat_rate']),
                            'vat_rate'              => $detail['vat_rate'],
                        ]);
                    }

                    $createdInvoices[] = $invoice->load('details');
                }
            }
        }

        return response()->json([
            'message'  => 'Toplu fatura oluşturma işlemi başarıyla tamamlandı.',
            'invoices' => $createdInvoices
        ], 201);
    }

    /**
     * 3) Show - Tek fatura
     */
    public function show($id)
    {
        $invoice = Invoice::with('details')->findOrFail($id);
        return response()->json([
            'data' => $invoice
        ], 200);
    }
public function getInvoicesByStudent(Request $request, $studentId)
{
    $limit = (int) $request->input('limit', 10);
    $invoices = Invoice::with('details')
        ->where('student_id', $studentId)
        ->orderBy('issue_date', 'desc')
        ->paginate($limit);
    $response = [
        'data' => $invoices->items(),
        'meta' => [
            'current_page' => $invoices->currentPage(),
            'per_page'     => $invoices->perPage(),
            'total'        => $invoices->total(),
            'last_page'    => $invoices->lastPage(),
        ],
    ];

    return response()->json($response, 200);
}

    public function update(Request $request, $id)
    {
        $invoice = Invoice::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'issue_date'             => 'required|date',
            'invoice_type_code'      => 'required|string|max:100',
            'document_currency_code' => 'required|string|max:3',
            'payable_amount'         => 'required|numeric',
            'details'                => 'required|array',
            'details.*.id'           => 'nullable|exists:invoice_details,id',
            'details.*.item_name'    => 'required|string',
            'details.*.unit_price'   => 'required|numeric',
            'details.*.quantity'     => 'required|numeric',
            'details.*.line_extension_amount' => 'required|numeric',
            'details.*.vat_rate'     => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error (update)',
                'errors'  => $validator->errors()
            ], 422);
        }

        $invoice->update($request->only([
            'issue_date',
            'invoice_type_code',
            'document_currency_code',
            'payable_amount',
        ]));

        foreach ($request->details as $d) {
            if (!empty($d['id'])) {
                $detail = InvoiceDetail::find($d['id']);
                if ($detail) {
                    $detail->update([
                        'item_name'             => $d['item_name'],
                        'unit_price'            => $d['unit_price'],
                        'invoiced_quantity'     => $d['quantity'],
                        'line_extension_amount' => $d['line_extension_amount'],
                        'tax_amount'            => $this->calculateTax($d['line_extension_amount'], $d['vat_rate']),
                        'vat_rate'              => $d['vat_rate'],
                    ]);
                }
            } else {
                InvoiceDetail::create([
                    'invoice_id'            => $invoice->id,
                    'item_name'             => $d['item_name'],
                    'unit_price'            => $d['unit_price'],
                    'invoiced_quantity'     => $d['quantity'],
                    'line_extension_amount' => $d['line_extension_amount'],
                    'tax_amount'            => $this->calculateTax($d['line_extension_amount'], $d['vat_rate']),
                    'vat_rate'              => $d['vat_rate'],
                ]);
            }
        }

        return response()->json([
            'message' => 'Fatura güncellendi.',
            'data'    => $invoice->load('details')
        ], 200);
    }

    /**
     * 5) Destroy - Fatura Sil
     */
    public function destroy($id)
    {
        $invoice = Invoice::findOrFail($id);
        $invoice->delete();

        return response()->json([
            'message' => 'Fatura silindi.'
        ], 200);
    }

    /**
     * Basit vergi hesaplama fonksiyonu
     */
    private function calculateTax($lineExtension, $vatRate)
    {
        return round(($lineExtension * $vatRate / 100), 2);
    }

    /**
     * getStudentInvoiceSummary: Öğrenci bazında fatura özetlerini döner.
     */
    public function getStudentInvoiceSummary(Request $request)
    {
        // Filtre parametreleri
        $firstName = $request->get('first_name', '');
        $lastName  = $request->get('last_name', '');
        $branchId  = $request->get('branch_id', '');
        $levelId   = $request->get('level_id', '');
        $invoiceFilter = $request->get('invoice_filter', '');

        // Sayfalama parametreleri
        $page = (int) $request->get('page', 1);
        $limit = (int) $request->get('limit', 25);
        $offset = ($page - 1) * $limit;

        $sql = "SELECT 
                    s.id,
                    b.name as branch_name,
                    s.register_no as contract_no,
                    s.first_name,
                    s.last_name,
                    l.name as class_name,
                    CONCAT(s.first_name, ' ', s.last_name) as ad_soyad,
                   (SELECT COALESCE(SUM(e.final_fee), 0) FROM enrollments e WHERE e.student_id = s.id) as tutar,
     
                    (SELECT COUNT(*) FROM invoices i WHERE i.student_id = s.id) as invoices_count,
                    (SELECT COALESCE(SUM(i.payable_amount),0) FROM invoices i WHERE i.student_id = s.id) as invoices_total,
                    (SELECT COUNT(*) FROM invoices i WHERE i.student_id = s.id AND i.pdf_path IS NOT NULL) as printed_invoices_count,
                    (SELECT COALESCE(SUM(i.payable_amount),0) FROM invoices i WHERE i.student_id = s.id AND i.pdf_path IS NOT NULL) as printed_invoices_total,
                    (SELECT CONCAT('[', GROUP_CONCAT(JSON_OBJECT('enrollment_id', e.id, 'service_name', sv.name, 'final_fee', e.final_fee)), ']')
                        FROM enrollments e 
                        JOIN services sv ON e.service_id = sv.id
                        WHERE e.student_id = s.id AND EXISTS (SELECT 1 FROM invoices i WHERE i.enrollment_id = e.id)
                    ) as invoiced_services,
                    (SELECT CONCAT('[', GROUP_CONCAT(JSON_OBJECT('enrollment_id', e.id, 'service_name', sv.name, 'final_fee', e.final_fee)), ']')
                        FROM enrollments e 
                        JOIN services sv ON e.service_id = sv.id
                        WHERE e.student_id = s.id AND NOT EXISTS (SELECT 1 FROM invoices i WHERE i.enrollment_id = e.id)
                    ) as not_invoiced_services,
                    (SELECT CONCAT('[', GROUP_CONCAT(JSON_OBJECT('installment_id', inst.id, 'amount', inst.amount, 'due_date', inst.due_date)), ']')
                        FROM installments inst
                        WHERE inst.student_id = s.id AND EXISTS (SELECT 1 FROM invoices i WHERE i.installment_id = inst.id)
                    ) as invoiced_installments,
                    (SELECT CONCAT('[', GROUP_CONCAT(JSON_OBJECT('installment_id', inst.id, 'amount', inst.amount, 'due_date', inst.due_date)), ']')
                        FROM installments inst
                        WHERE inst.student_id = s.id AND NOT EXISTS (SELECT 1 FROM invoices i WHERE i.installment_id = inst.id)
                    ) as not_invoiced_installments
                FROM students s
                JOIN branches b ON s.branche_id = b.id
                JOIN levels l ON s.level_id = l.id
                WHERE 1 = 1
                AND s.id IN (SELECT DISTINCT student_id FROM enrollments)";

        $bindings = [];

        if ($firstName) {
            $sql .= " AND s.first_name LIKE ?";
            $bindings[] = "%$firstName%";
        }
        if ($lastName) {
            $sql .= " AND s.last_name LIKE ?";
            $bindings[] = "%$lastName%";
        }
        if ($branchId) {
            $sql .= " AND s.branche_id = ?";
            $bindings[] = $branchId;
        }
        if ($levelId) {
            $sql .= " AND s.level_id = ?";
            $bindings[] = $levelId;
        }

        if ($invoiceFilter === 'invoiced') {
            $sql .= " AND (SELECT COUNT(*) FROM invoices i WHERE i.student_id = s.id) > 0";
        } elseif ($invoiceFilter === 'not_invoiced') {
            $sql .= " AND (SELECT COUNT(*) FROM invoices i WHERE i.student_id = s.id) = 0";
        } elseif ($invoiceFilter === 'service_invoiced') {
            $sql .= " AND (SELECT COUNT(*) FROM enrollments e WHERE e.student_id = s.id AND EXISTS (SELECT 1 FROM invoices i WHERE i.enrollment_id = e.id)) > 0";
        } elseif ($invoiceFilter === 'service_not_invoiced') {
            $sql .= " AND (SELECT COUNT(*) FROM enrollments e WHERE e.student_id = s.id AND EXISTS (SELECT 1 FROM invoices i WHERE i.enrollment_id = e.id)) = 0";
        } elseif ($invoiceFilter === 'installment_invoiced') {
            $sql .= " AND (SELECT COUNT(*) FROM installments inst WHERE inst.student_id = s.id AND EXISTS (SELECT 1 FROM invoices i WHERE i.installment_id = inst.id)) > 0";
        } elseif ($invoiceFilter === 'installment_not_invoiced') {
            $sql .= " AND (SELECT COUNT(*) FROM installments inst WHERE inst.student_id = s.id AND EXISTS (SELECT 1 FROM invoices i WHERE i.installment_id = inst.id)) = 0";
        }

        $sql .= " GROUP BY s.id";

        $countSql = "SELECT COUNT(*) as total FROM (" . $sql . ") as sub";
        $totalResult = DB::select($countSql, $bindings);
        $total = isset($totalResult[0]->total) ? (int) $totalResult[0]->total : 0;

        $sql .= " LIMIT ? OFFSET ?";
        $bindings[] = $limit;
        $bindings[] = $offset;

        $results = DB::select($sql, $bindings);

        $response = [
            'data' => $results,
            'meta' => [
                'current_page' => $page,
                'per_page' => $limit,
                'total' => $total,
                'last_page' => ceil($total / $limit),
            ],
        ];

        return response()->json($response, 200);
    }
}
