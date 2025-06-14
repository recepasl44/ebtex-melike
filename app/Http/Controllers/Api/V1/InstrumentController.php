<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Instrument\Instrument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;  // Base64 resmi kaydetmek için kullanacağız

class InstrumentController extends Controller
{
    /**
     * 1) index: Tüm çek/senet kayıtlarını filtreleyerek listeler.
     */
    public function index(Request $request)
    {
        $query = Instrument::query();

        if ($request->filled('branch_id')) {
            $query->where('branch_id', $request->branch_id);
        }

        if ($request->filled('document_type')) {
            $query->where('document_type', $request->document_type);
        }

        if ($request->filled('receive_document_type')) {
            $query->where('receive_document_type', $request->receive_document_type);
        }

        if ($request->filled('receive_document_name')) {
            $query->where('receive_document_name', 'LIKE', "%{$request->receive_document_name}%");
        }

        if ($request->filled('supplier_id')) {
            $query->where('supplier_id', $request->supplier_id);
        }

        if ($request->filled('document_owner_name')) {
            $query->where('document_owner_name', 'LIKE', "%{$request->document_owner_name}%");
        }

        if ($request->filled('document_status')) {
            $query->where('document_status', $request->document_status);
        }

        if ($request->filled('min_price')) {
            $query->where('amount', '>=', $request->min_price);
        }

        if ($request->filled('max_price')) {
            $query->where('amount', '<=', $request->max_price);
        }

        // Örneğin vade tarihine göre sıralama
        $instruments = $query->orderBy('due_date', 'asc')
            ->paginate($request->get('paginate', 10));

        return response()->json($instruments, 200);
    }

    /**
     * 2) store: Yeni çek/senet kaydı oluşturur.
     *    Beklenen alanlar (örn. request):
     *    - branch_id, document_type (1=çek,2=senet), supplier_id, amount, bank vb.
     *    - 'image_base64' (string, opsiyonel): Çek/Senet resmi base64 formatında
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'branch_id'              => 'required|integer',
            'document_type'          => 'required|in:1,2',
            'receive_document_type'  => 'nullable|string',
            'receive_document_name'  => 'nullable|string',
            'supplier_id'            => 'nullable|exists:suppliers,id',
            'document_owner_name'    => 'required|string',
            'document_status'        => 'required|in:bozdurulmuş,henüz_bozturulmamış,swap_edilmiş',
            'amount'                 => 'required|numeric|min:0',
            'due_date'               => 'required|date',
            'bank'                   => 'required|string',
            'check_no'               => 'required|string',
            'transaction_no'         => 'nullable|string',
            'guarantors'             => 'nullable|string',
            'season_id'                 => 'required|integer',
            'instrument_no'          => 'required|string',
            'owner_name'             => 'required|string',
            'school_no'              => 'nullable|string',
            'bozdur_swap'            => 'nullable|boolean',
            'status'            => 'nullable|integer',


            // Base64 görsel
            'image_base64'           => 'nullable|string', // opsiyonel
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        // Eğer base64 görsel geldiyse, decode edip storage'a kaydediyoruz.
        if (!empty($data['image_base64'])) {
            // Base64 decode
            $decodedImage = base64_decode($data['image_base64']);

            // Dosya adını benzersiz oluşturabiliriz
            // Örneğin: instrument_1682091045.png
            $filename = 'instrument_' . time() . '.png';

            // Storage'a kaydetme (disk: public, path: /instruments/...)
            Storage::disk('public')->put('instruments/'.$filename, $decodedImage);

            // DB'de kaydetmek için image_path
            $data['image_path'] = 'instruments/'.$filename;
        }

        // Swap ise, ek mantık
        if ($data['document_status'] === 'swap_edilmiş') {
            // Swap işlemi iş mantığı
            // Örneğin: Supplier::cancelDebt($data['supplier_id'], $data['amount']);
        }

        // Kayıt oluştur
        $instrument = Instrument::create($data);

        return response()->json([
            'message' => 'Evrak (çek/senet) başarıyla oluşturuldu.',
            'data'    => $instrument
        ], 201);
    }

    /**
     * 3) show: Belirtilen ID'ye ait çek/senet kaydını gösterir.
     */
    public function show($id)
    {
        $instrument = Instrument::findOrFail($id);
        return response()->json($instrument, 200);
    }

    /**
     * 4) update: Belirtilen çek/senet kaydını günceller.
     *    Burada da base64 resim gelebilir; varsa güncellenir.
     */
 public function update(Request $request, $id)
{
    $instrument = Instrument::findOrFail($id);

    $validator = Validator::make($request->all(), [
        'branch_id'              => 'required|integer',
        'document_type'          => 'required|integer',
        'supplier_id'            => 'required|integer',
        'document_owner_name'    => 'required|string|max:191',
            'document_status'        => 'required|in:bozdurulmuş,henüz_bozturulmamış,swap_edilmiş',
          // Örnek: "swap_edilmiş", "bekliyor", "tahsil" gibi seçenekler
        'amount'                 => 'required|numeric',
        'due_date'               => 'required|date',
        'bank'                   => 'nullable|string|max:191',
        'check_no'               => 'nullable|string|max:191',
        'transaction_no'         => 'nullable|string|max:191',
        'season'                 => 'nullable|string|max:191',
        'instrument_no'          => 'nullable|string|max:191',
        'owner_name'             => 'nullable|string|max:191',
        'receive_document_type'  => 'nullable|string|max:191',
        'receive_document_name'  => 'nullable|string|max:191',
        'guarantors'             => 'nullable|string',
        'school_no'              => 'nullable|string',
        'bozdur_swap'            => 'sometimes|boolean',
        'image_base64'           => 'nullable|string', // base64 data
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    $data = $validator->validated();

    if (!empty($data['image_base64'])) {
        $decodedImage = base64_decode($data['image_base64']);
        $filename = 'instrument_' . time() . '.png';

        Storage::disk('public')->put('instruments/' . $filename, $decodedImage);

        // Eski resmi silmek isterseniz
        if ($instrument->image_path) {
            Storage::disk('public')->delete($instrument->image_path);
        }

        $data['image_path'] = 'instruments/' . $filename;
    }

    if (isset($data['document_status']) && $data['document_status'] === 'swap_edilmiş') {
        // Swap işlemine dair ek mantık burada
    }

    $instrument->update($data);

    return response()->json([
        'message' => 'Evrak (çek/senet) başarıyla güncellendi.',
        'data'    => $instrument
    ], 200);
}

    /**
     * 5) destroy: Belirtilen çek/senet kaydını siler.
     */
    public function destroy($id)
    {
        $instrument = Instrument::findOrFail($id);

        // Silmeden önce kaydedilmiş resim varsa diskten silmek isterseniz:
        if (!empty($instrument->image_path)) {
            Storage::disk('public')->delete($instrument->image_path);
        }

        $instrument->delete();

        return response()->json([
            'message' => 'Evrak (çek/senet) başarıyla silindi.'
        ], 200);
    }
}
