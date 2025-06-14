<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Invoice\Invoice;
use App\Models\Invoice\InvoiceDetail\InvoiceDetail;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class InvoiceSupplierController extends Controller
{
    // Listele
    public function index(Request $request, Supplier $supplier)
    {
        $limit = $request->get('paginate', 25);
        $orderBy = $request->get('orderBy', 'ASC');
        $sortBy = $request->get('sortBy', 'created_at');
        $search = $request->get('search', '');

        $query = Invoice::where('supplier_id', $supplier->id);

        if ($search) {
            $query->where('fis_seri_no', 'LIKE', "%$search%")
                  ->orWhere('invoice_type_code', 'LIKE', "%$search%");
        }

        $invoices = $query->orderBy($sortBy, $orderBy)
                          ->with('details')
                          ->paginate($limit);

        return response()->json($invoices, 200);
    }

    // Oluştur
public function store(Request $request, Supplier $supplier)
{
    // 1) JSON decode (gider_kalemi, items) - mevcuttaki gibi
    if ($request->has('gider_kalemi') && is_string($request->gider_kalemi)) {
        $decodedKalem = json_decode($request->gider_kalemi, true);
        if (is_array($decodedKalem)) {
            $request->merge(['gider_kalemi' => $decodedKalem]);
        }
    }
    if ($request->has('items') && is_string($request->items)) {
        $decodedItems = json_decode($request->items, true);
        if (is_array($decodedItems)) {
            $request->merge(['items' => $decodedItems]);
        }
    }

    // 2) Validasyon: 'date_format:d-m-Y'
    $validator = Validator::make($request->all(), [
        'fis_seri_no'       => 'nullable|string|max:50',
        'invoice_type_code' => 'required|string',
        'issue_date'        => 'required|date_format:d-m-Y', 
        'gider_kalemi'      => 'nullable|array',
        'gider_kalemi.*'    => 'string|max:100',
        'payable_amount'    => 'required|numeric',
        'fatura_adi'        => 'nullable|string|max:200',
        'pdf_file'          => 'nullable|file|mimes:pdf|max:2048',
        'items'             => 'nullable|array',
        'items.*.item_name' => 'required|string',
        'items.*.invoiced_quantity'    => 'required|numeric',
        'items.*.unit_price'           => 'required|numeric',
        'items.*.line_extension_amount'=> 'required|numeric',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'message' => 'Validation error',
            'errors'  => $validator->errors()
        ], 422);
    }

    // 3) Tarihi manuel dönüştürme
    //    '25-03-2025' => '2025-03-25'
    $issueDateStr = $request->input('issue_date'); 
    try {
        $issueDateDB = \Carbon\Carbon::createFromFormat('d-m-Y', $issueDateStr)
                        ->format('Y-m-d');
    } catch (\Exception $e) {
        // date parse error; normalde validasyondan geçmemesi lazım ama 
        return response()->json(['message' => 'Tarih format hatası: '.$e->getMessage()], 422);
    }

    // 4) Invoice oluşturulacak verileri al
    $invoiceData = $request->only([
        'fis_seri_no',
        'invoice_type_code',
        'payable_amount',
        'fatura_adi',
    ]);
    $invoiceData['supplier_id'] = $supplier->id;
    $invoiceData['issue_date']  = $issueDateDB; // db'ye uygun format

    // 5) Kaydet
    $invoice = Invoice::create($invoiceData);

    // 6) Gider kalemi dizi halinde kaydetmek istiyorsanız
    if (is_array($request->gider_kalemi)) {
        $invoice->gider_kalemi = json_encode($request->gider_kalemi);
        $invoice->save();
    }

    // 7) PDF varsa
    if ($request->hasFile('pdf_file')) {
        $path = $request->file('pdf_file')->store('invoices', 'public');
        $invoice->pdf_path = $path;
        $invoice->save();
    }

    // 8) Items ekleme
    if (is_array($request->items)) {
        foreach ($request->items as $item) {
            InvoiceDetail::create([
                'invoice_id'           => $invoice->id,
                'item_name'            => $item['item_name'],
                'invoiced_quantity'    => $item['invoiced_quantity'],
                'unit_price'           => $item['unit_price'],
                'line_extension_amount'=> $item['line_extension_amount'],
            ]);
        }
    }

    return response()->json([
        'message' => 'Fatura başarıyla oluşturuldu.',
        'data'    => $invoice->load('details')
    ], 201);
}

    // Göster
    public function show(Supplier $supplier, Invoice $invoice)
    {
        if ($invoice->supplier_id !== $supplier->id) {
            return response()->json(['message' => 'Fatura bulunamadı'], 404);
        }

        $invoice->load('details');
        return response()->json(['data' => $invoice], 200);
    }

    // Güncelle
   public function update(Request $request, Supplier $supplier, Invoice $invoice)
{
    // 1) Tedarikçi kontrolü
    if ($invoice->supplier_id !== $supplier->id) {
        return response()->json(['message' => 'Fatura bulunamadı'], 404);
    }

    // 2) Gider kalemi ve items alanı string gelmişse decode et
    if ($request->has('gider_kalemi') && is_string($request->gider_kalemi)) {
        $decoded = json_decode($request->gider_kalemi, true);
        if (is_array($decoded)) {
            $request->merge(['gider_kalemi' => $decoded]);
        }
    }

    if ($request->has('items') && is_string($request->items)) {
        $decoded = json_decode($request->items, true);
        if (!is_array($decoded)) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => ['items' => ['items alanı geçerli bir JSON array olmalıdır.']]
            ], 422);
        }
        $request->merge(['items' => $decoded]);
    }

    // 3) Validasyon
    $validator = Validator::make($request->all(), [
        'issue_date'                 => 'required|date_format:d-m-Y',
        'invoice_type_code'         => 'required|string',
        'payable_amount'            => 'required|numeric',
        'fis_seri_no'               => 'nullable|string|max:50',
        'fatura_adi'                => 'nullable|string|max:200',
        'gider_kalemi'              => 'nullable|array',
        'gider_kalemi.*'            => 'string',

        'remove_pdf'                => 'sometimes|boolean',
        'pdf_file'                  => 'nullable|file|mimes:pdf|max:2048',

        'items'                     => 'required|array',
        'items.*.id'                => 'nullable|exists:invoice_details,id',
        'items.*.item_name'         => 'required|string',
        'items.*.invoiced_quantity' => 'required|numeric',
        'items.*.unit_price'        => 'required|numeric',
        'items.*.line_extension_amount' => 'required|numeric',
        'items.*.item_description'  => 'nullable|string',
        'items.*.unit_code'         => 'nullable|string|max:10',
        'items.*.tax_amount'        => 'nullable|numeric',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'message' => 'Validation error',
            'errors' => $validator->errors()
        ], 422);
    }

    // 4) issue_date format dönüşümü (d-m-Y → Y-m-d)
    try {
        $issueDateDB = \Carbon\Carbon::createFromFormat('d-m-Y', $request->issue_date)->format('Y-m-d');
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Tarih formatı hatalı: ' . $e->getMessage()
        ], 422);
    }

    // 5) PDF silinmesi istenmişse işle
    if ($request->boolean('remove_pdf') && $invoice->pdf_path) {
        Storage::disk('public')->delete($invoice->pdf_path);
        $invoice->pdf_path = null;
        $invoice->save();
    }

    // 6) Fatura bilgilerini güncelle
    $invoice->update([
        'issue_date'        => $issueDateDB,
        'invoice_type_code' => $request->invoice_type_code,
        'payable_amount'    => $request->payable_amount,
        'fis_seri_no'       => $request->fis_seri_no,
        'fatura_adi'        => $request->fatura_adi,
    ]);

    // 7) Gider kalemlerini JSON olarak kaydet
    if ($request->filled('gider_kalemi')) {
        $invoice->gider_kalemi = json_encode($request->gider_kalemi);
        $invoice->save();
    } else {
        $invoice->gider_kalemi = null;
        $invoice->save();
    }

    // 8) Yeni PDF dosyası yüklendiyse kaydet
    if ($request->hasFile('pdf_file')) {
        $path = $request->file('pdf_file')->store('invoices', 'public');
        $invoice->pdf_path = $path;
        $invoice->save();
    }

    // 9) Invoice detay kalemlerini işle
    if (is_array($request->items)) {
        foreach ($request->items as $itemData) {
            if (isset($itemData['id'])) {
                // Güncelle
                $detail = InvoiceDetail::find($itemData['id']);
                if ($detail) {
                    $detail->update($itemData);
                }
            } else {
                // Yeni detay ekle
                InvoiceDetail::create([
                    'invoice_id'             => $invoice->id,
                    'item_name'              => $itemData['item_name'],
                    'item_description'       => $itemData['item_description'] ?? '',
                    'invoiced_quantity'      => $itemData['invoiced_quantity'],
                    'unit_code'              => $itemData['unit_code'] ?? '',
                    'unit_price'             => $itemData['unit_price'],
                    'line_extension_amount'  => $itemData['line_extension_amount'],
                    'tax_amount'             => $itemData['tax_amount'] ?? 0,
                ]);
            }
        }
    }

    return response()->json([
        'message' => 'Fatura güncellendi.',
        'data'    => $invoice->load('details')
    ], 200);
}

    // Uyumsoft veya benzeri entegrasyona gönder
    public function sendEInvoice(Supplier $supplier, Invoice $invoice)
    {
        // Basit örnek
        if ($invoice->supplier_id !== $supplier->id) {
            return response()->json(['message' => 'Fatura bulunamadı'], 404);
        }

        // ... e-fatura gönderme logic ...
        $invoice->update([
            'is_sent' => true,
            'sent_at' => now(),
        ]);

        return response()->json(['message' => 'Fatura gönderildi.'], 200);
    }
        public function pdf(Supplier $supplier, Invoice $invoice)
    {
        // 1) Bu fatura ilgili tedarikçiye mi ait?
        if ($invoice->supplier_id !== $supplier->id) {
            return response()->json(['message' => 'Fatura bulunamadı'], 404);
        }

     
        if (!$invoice->pdf_path) {
            return response()->json(['message' => 'Fatura PDF kaydı yok'], 404);
        }

     
        $pdfUrl = Storage::disk('public')->url($invoice->pdf_path);

        // 4) Sonuç JSON
        return response()->json([
            'pdf_url' => $pdfUrl,
        ], 200);
    }
    public function destroy(Supplier $supplier, Invoice $invoice)
{
    // 1) Bu fatura ilgili tedarikçiye mi ait?
    if ($invoice->supplier_id !== $supplier->id) {
        return response()->json(['message' => 'Fatura bulunamadı'], 404);
    }

    // 2) Faturaya bağlı InvoiceDetail kayıtlarını sil
    $invoice->details()->delete();

    // 3) Eğer PDF dosyası varsa, storage'dan sil
    if ($invoice->pdf_path) {
        Storage::disk('public')->delete($invoice->pdf_path);
    }

    // 4) Fatura kaydını veritabanından sil
    $invoice->delete();

    // 5) Başarılı dönüş
    return response()->json(['message' => 'Fatura başarıyla silindi.'], 200);
}

  
}
