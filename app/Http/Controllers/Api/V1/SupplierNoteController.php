<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Supplier;
use App\Models\SupplierNote\SupplierNote;
use Illuminate\Http\Request;

class SupplierNoteController extends Controller
{
    /**
     * Not Listele
     */
    public function index(Request $request, Supplier $supplier)
    {
        $perPage = $request->input('per_page', 10); // Varsayılan olarak 1
        $notes = $supplier->notes()->latest()->paginate($perPage);
    
        return response()->json($notes, 200);
    }
    
    

    /**
     * Not Oluştur
     */
    public function store(Request $request, Supplier $supplier)
    {
        $request->validate([
            'note' => 'required|string',
        ]);

        $note = new SupplierNote();
        $note->supplier_id = $supplier->id;
        $note->note = $request->input('note');
        $note->save();

        return response()->json([
            'message' => 'Note created successfully.',
            'data' => $note
        ], 201);
    }

    /**
     * Tekil Not Göster
     */
    public function show(Supplier $supplier, SupplierNote $supplierNote)
    {
        if ($supplierNote->supplier_id !== $supplier->id) {
            return response()->json(['message' => 'Not found'], 404);
        }
        return response()->json($supplierNote, 200);
    }

    /**
     * Not Güncelle
     */
    public function update(Request $request, Supplier $supplier, SupplierNote $supplierNote)
    {
        if ($supplierNote->supplier_id !== $supplier->id) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $request->validate([
            'note' => 'required|string',
        ]);

        $supplierNote->update([
            'note' => $request->input('note'),
        ]);

        return response()->json([
            'message' => 'Note updated successfully.',
            'data' => $supplierNote
        ], 200);
    }

    /**
     * Not Sil
     */
    public function destroy(Supplier $supplier, SupplierNote $supplierNote)
    {
        if ($supplierNote->supplier_id !== $supplier->id) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $supplierNote->delete();

        return response()->json(['message' => 'Note deleted successfully.'], 200);
    }
}
