<?php

namespace App\Http\Responses\Backend\TaskStatuses;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Tasks\Task;


class CreateResponse implements Responsable
{
    /**
     * To Response
     *
     * @param \App\Http\Requests\Request $request
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function toResponse($request)
    {
        $tasks=collect(Task::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });
        $statuses = collect([
            0 => _tr('pending'),
            1 => _tr('user_appointed'),
            2 => _tr('started_task'),
            3 => _tr('waiting_for_order'),
            4 => _tr('finished'),
            5 => _tr('cancel'),
            6 => _tr('additional_work_required'),
        ]);
        
        return view('backend.taskstatuses.create',compact('tasks', 'statuses'));
    }
}