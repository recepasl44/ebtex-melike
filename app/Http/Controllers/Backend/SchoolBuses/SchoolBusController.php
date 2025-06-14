<?php

namespace App\Http\Controllers\Backend\SchoolBuses;

use App\Http\Controllers\Controller;
use App\Http\Requests\SchoolBusRequest;
use App\Repositories\Backend\SchoolBuses\SchoolBusRepository;
use App\Events\Backend\SchoolBuses\SchoolBusCreated;
use App\Events\Backend\SchoolBuses\SchoolBusUpdated;
use App\Events\Backend\SchoolBuses\SchoolBusDeleted;
use Exception;

class SchoolBusController extends Controller
{
    protected $schoolBusRepo;

    public function __construct(SchoolBusRepository $schoolBusRepo)
    {
        $this->schoolBusRepo = $schoolBusRepo;
    }

    public function index()
    {
        $schoolbuses = $this->schoolBusRepo->all();
        return view('backend.schoolbuses.schoolbus', ['schoolbuses' => $schoolbuses]);
    }

    public function store(SchoolBusRequest $request)
    {
        $validatedData = $request->validated();

        try {
            $schoolbus = $this->schoolBusRepo->create($validatedData);
            event(new SchoolBusCreated($schoolbus));  // Event tetikleniyor
            return redirect()->route('admin.schoolbuses.index')->with('success', 'Araç başarıyla eklendi.');
        } catch (Exception $e) {
            return redirect()->route('admin.schoolbuses.index')->with('error', $e->getMessage());
        }
    }

    public function update(SchoolBusRequest $request, $id)
    {
        $schoolbus = $this->schoolBusRepo->find($id);

        if (!$schoolbus) {
            return redirect()->route('admin.schoolbuses.index')->with('error', 'Araç bulunamadı.');
        }

        $validatedData = $request->validated();

        try {
            $this->schoolBusRepo->update($schoolbus, $validatedData);
            event(new SchoolBusUpdated($schoolbus));  // Event tetikleniyor
            return redirect()->route('admin.schoolbuses.index')->with('success', 'Araç başarıyla güncellendi.');
        } catch (Exception $e) {
            return redirect()->route('admin.schoolbuses.index')->with('error', $e->getMessage());
        }
    }

    public function destroy($id)
    {
        $schoolbus = $this->schoolBusRepo->find($id);

        if (!$schoolbus) {
            return redirect()->route('admin.schoolbuses.index')->with('error', 'Araç bulunamadı.');
        }

        try {
            $this->schoolBusRepo->delete($schoolbus);
            event(new SchoolBusDeleted($schoolbus));  // Event tetikleniyor
            return redirect()->route('admin.schoolbuses.index')->with('success', 'Araç başarıyla silindi.');
        } catch (Exception $e) {
            return redirect()->route('admin.schoolbuses.index')->with('error', $e->getMessage());
        }
    }
}