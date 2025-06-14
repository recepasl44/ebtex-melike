<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Responses\Backend\Appointments\CreateResponse as AppointmentCreate;
use App\Models\Branches\Branche;
use App\Models\Seasons\Season;
use App\Models\Students\Student;
use Illuminate\Http\Request;

class ModalController extends Controller
{
    public function create(Request $request)
    {
        $module = $request->module;
        $moduleRoute = route('admin.'.$module.'.store');
        $view = $request->view;
        $student = null;
        $student_id = $request->student_id ?? null;
        if ($student_id){
            $student = Student::find($student_id);
        }

        $seasons = Season::pluck('name', 'id');
        $branches = Branche::pluck('name', 'id');

        return
            response()->json([
                'status' => 200,
                'view' => view($view, compact('seasons', 'branches', 'student'))->render(),
                'action' => $moduleRoute,
            ]);
    }
}
