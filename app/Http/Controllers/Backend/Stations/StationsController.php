<?php

namespace App\Http\Controllers\Backend\Stations;

use App\Http\Controllers\Controller;
use App\Http\Requests\Backend\Stations\StationRequest;
use App\Repositories\Backend\Stations\StationRepository;
use App\Events\Backend\Stations\StationCreated;
use App\Events\Backend\Stations\StationUpdated;
use App\Events\Backend\Stations\StationDeleted;
use Exception;

class StationsController extends Controller
{
    protected $stationRepo;

    public function __construct(StationRepository $stationRepo)
    {
        $this->stationRepo = $stationRepo;
    }

    public function index()
    {
        $stations = $this->stationRepo->all();
        return view('backend.stations.stations', ['stations' => $stations]);
    }

    public function store(StationRequest $request)
    {
        $validatedData = $request->validated();

        try {
            $station = $this->stationRepo->create($validatedData);
            event(new StationCreated($station));  // Event tetikleniyor
            return redirect()->route('admin.stations.index')->with('success', 'Durak başarıyla eklendi.');
        } catch (Exception $e) {
            return redirect()->route('admin.stations.index')->with('error', $e->getMessage());
        }
    }

    public function update(StationRequest $request, $id)
    {
        $station = $this->stationRepo->find($id);

        if (!$station) {
            return redirect()->route('admin.stations.index')->with('error', 'Durak bulunamadı.');
        }

        $validatedData = $request->validated();

        try {
            $this->stationRepo->update($station, $validatedData);
            event(new StationUpdated($station));  // Event tetikleniyor
            return redirect()->route('admin.stations.index')->with('success', 'Durak başarıyla güncellendi.');
        } catch (Exception $e) {
            return redirect()->route('admin.stations.index')->with('error', $e->getMessage());
        }
    }

    public function destroy($id)
    {
        $station = $this->stationRepo->find($id);

        if (!$station) {
            return redirect()->route('admin.stations.index')->with('error', 'Durak bulunamadı.');
        }

        try {
            $this->stationRepo->delete($station);
            event(new StationDeleted($station));  // Event tetikleniyor
            return redirect()->route('admin.stations.index')->with('success', 'Durak başarıyla silindi.');
        } catch (Exception $e) {
            return redirect()->route('admin.stations.index')->with('error', $e->getMessage());
        }
    }
}
