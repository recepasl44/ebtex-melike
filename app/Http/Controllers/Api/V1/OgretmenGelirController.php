<?php
namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Ogretmen\OgretmenGelir;
use Illuminate\Http\Request;

class OgretmenGelirController extends Controller
{
    public function index()
    {
        $ozelDersGelirleri = OgretmenGelir::where('tip', 'ozel_ders')->get();
        $kuponGelirleri = OgretmenGelir::where('tip', 'kupon')->get();

        return response()->json([
            'ozel_ders_gelirleri' => $ozelDersGelirleri,
            'kupon_gelirleri' => $kuponGelirleri
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'tip' => 'required|in:ozel_ders,kupon',
            'miktar' => 'required|numeric',
            'tarih' => 'required|date',
        ]);

        $gelir = OgretmenGelir::create($data);

        return response()->json(['message' => 'Gelir başarıyla kaydedildi.', 'data' => $gelir]);
    }

    public function destroy($id)
    {
        $gelir = OgretmenGelir::findOrFail($id);
        $gelir->delete();

        return response()->json(['message' => 'Gelir başarıyla silindi.']);
    }
}
