<?php

namespace App\Http\Controllers\Backend\Drivings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Backend\Drivings\DrivingRequest;
use App\Repositories\Backend\Drivings\DrivingRepository;
use Illuminate\Http\Request;
use Exception;
use App\Services\UploadService;
use App\Events\Backend\Drivings\DrivingCreated;
use App\Events\Backend\Drivings\DrivingUpdated;
use App\Events\Backend\Drivings\DrivingDeleted;

class DrivingsController extends Controller
{
    protected $drivingRepo;

    public function __construct(DrivingRepository $drivingRepo)
    {
        $this->drivingRepo = $drivingRepo;
    }

    public function index()
    {
        $drivings = $this->drivingRepo->all();
        return view('backend.drivings.index', ['drivings' => $drivings]);
    }

    public function store(DrivingRequest $request, UploadService $uploadService)
    {
        $validatedData = $request->validated();

        if ($request->hasFile('src_file')) {
            try {
                $filename = $uploadService->upload($request->file('src_file'), 'drivings');
                $validatedData['src_file_path'] = basename($filename);
            } catch (Exception $e) {
                return redirect()->route('admin.drivings.index')->with('error', $e->getMessage());
            }
        }

        try {
            $driving = $this->drivingRepo->create($validatedData);
            // Event tetikleme
            event(new DrivingCreated($driving));
            return redirect()->route('admin.drivings.index')->with('success', 'Sürücü başarıyla eklendi.');
        } catch (Exception $e) {
            return redirect()->route('admin.drivings.index')->with('error', $e->getMessage());
        }
    }

    public function update(DrivingRequest $request, $id)
    {
        $driving = $this->drivingRepo->find($id);

        if (!$driving) {
            return redirect()->route('admin.drivings.index')->with('error', 'Sürücü bulunamadı.');
        }

        $validatedData = $request->validated();

        try {
            $this->drivingRepo->update($driving, $validatedData);
            // Event tetikleme
            event(new DrivingUpdated($driving));
            return redirect()->route('admin.drivings.index')->with('success', 'Sürücü başarıyla güncellendi.');
        } catch (Exception $e) {
            return redirect()->route('admin.drivings.index')->with('error', $e->getMessage());
        }
    }

    public function destroy($id)
    {
        $driving = $this->drivingRepo->find($id);

        if (!$driving) {
            return redirect()->route('admin.drivings.index')->with('error', 'Sürücü bulunamadı.');
        }

        try {
            $this->drivingRepo->delete($driving);
            // Event tetikleme
            event(new DrivingDeleted($driving));
            return redirect()->route('admin.drivings.index')->with('success', 'Sürücü başarıyla silindi.');
        } catch (Exception $e) {
            return redirect()->route('admin.drivings.index')->with('error', $e->getMessage());
        }
    }    

}