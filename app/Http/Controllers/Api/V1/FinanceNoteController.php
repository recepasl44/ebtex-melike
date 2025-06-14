<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\FinanceNoteResource;
use App\Models\FinanceNotes\FinanceNote;
use App\Exports\FinanceNotesExport;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Facades\Excel;
use PDF;

class FinanceNoteController extends Controller
{
    protected function applyFilters(Request $request)
    {
        $query = FinanceNote::with(['student.branch', 'student.level', 'user']);

        if ($branch = $request->get('branch')) {
            $query->whereHas('student', fn($q) => $q->where('branche_id', $branch));
        }
        if ($season = $request->get('season')) {
            $query->whereHas('student', fn($q) => $q->where('season_id', $season));
        }
        if ($level = $request->get('level')) {
            $query->whereHas('student', fn($q) => $q->where('level_id', $level));
        }

        if ($student = $request->get('student')) {
            $query->where('student_id', $student);
        }
        return $query;
    }

    public function index(Request $request)
    {
        $limit = $request->get('paginate', 25);
        $notes = $this->applyFilters($request)->orderBy('created_at', 'desc')->paginate($limit)->appends($request->query());
        return FinanceNoteResource::collection($notes);
    }

    public function export(Request $request)
    {
        $type = $request->get('type', 'excel');
        $notes = $this->applyFilters($request)->orderBy('created_at', 'desc')->get();

        if ($type === 'pdf') {
            $pdf = PDF::loadView('exports.finance_notes_pdf', ['notes' => $notes]);
            return $pdf->download('finance_notes.pdf');
        }

        $data = $notes->map(function ($note) {
            $student = $note->student;
            return [
                optional($student->branch)->name,
                $student->school_no ?? '',
                $student->tc_kimlik_no ?? '',
                trim(($student->first_name ?? '').' '.($student->last_name ?? '')),
                optional($student->level)->name,

                optional($note->created_at)->format('Y-m-d'),
                $note->note,
                $note->promise_date,
                optional($note->user)->name,
            ];
        });

        return Excel::download(new FinanceNotesExport(new Collection($data)), 'finance_notes.xlsx');
    }
}
