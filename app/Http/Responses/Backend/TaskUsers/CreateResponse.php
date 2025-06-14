<?php

namespace App\Http\Responses\Backend\TaskUsers;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Tasks\Task;
use App\Models\Access\User\User;


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
        $users=collect(User::all()->toArray())->filter(function ($item){
            return empty(access()->user()->workshop_id) || (!empty(access()->user()->workshop_id) && access()->user()->workshop_id == $item['workshop_id']);
        })->mapWithKeys(function ($item) {
            return [$item['id'] => $item['first_name'].' '.$item['last_name']];
        });
        
        return view('backend.taskusers.create',compact('tasks', 'users', ));
    }
}