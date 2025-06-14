<?php
namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\CustomerOther\CustomerOther;
use Illuminate\Http\Request;

class CustomerOtherController extends Controller
{
    // Müşteri Listeleme
    public function index(Request $request)
    {
        $search = $request->query('search', '');
        $paginate = $request->query('paginate', 10);

        $query = CustomerOther::query();

        if ($search) {
            $query->where('name', 'LIKE', "%$search%")
                ->orWhere('email', 'LIKE', "%$search%")
                ->orWhere('phone', 'LIKE', "%$search%");
        }

        $customers = $query->paginate($paginate);

        return response()->json($customers, 200);
    }

    // Müşteri Ekleme
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'fax' => 'nullable|string|max:20',
            'iban' => 'nullable|string|max:34',
            'city' => 'nullable|string|max:255',
            'district' => 'nullable|string|max:255',
            'neighborhood' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'tax_number' => 'nullable|string|max:20',
            'tax_office' => 'nullable|string|max:255',
            'is_legal_entity' => 'nullable|boolean',
        ]);

        $customer = CustomerOther::create($data);

        return response()->json([
            'message' => 'Customer successfully added.',
            'customer' => $customer,
        ], 201);
    }

    // Müşteri Detay
    public function show($id)
    {
        $customer = CustomerOther::findOrFail($id);

        return response()->json($customer, 200);
    }

    // Müşteri Güncelleme
    public function update(Request $request, $id)
    {
        $customer = CustomerOther::findOrFail($id);

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'fax' => 'nullable|string|max:20',
            'iban' => 'nullable|string|max:34',
            'city' => 'nullable|string|max:255',
            'district' => 'nullable|string|max:255',
            'neighborhood' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'tax_number' => 'nullable|string|max:20',
            'tax_office' => 'nullable|string|max:255',
            'is_legal_entity' => 'nullable|boolean',
        ]);

        $customer->update($data);

        return response()->json([
            'message' => 'Customer successfully updated.',
            'customer' => $customer,
        ], 200);
    }

    // Müşteri Silme
    public function destroy($id)
    {
        $customer = CustomerOther::findOrFail($id);
        $customer->delete();

        return response()->json([
            'message' => 'Customer successfully deleted.',
        ], 200);
    }
}
