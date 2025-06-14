<?php

namespace App\Http\Responses\Backend\Tasks;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Access\User\User;



class EditResponse implements Responsable
{
    /**
     * @var App\Models\Tasks\Task
     */
    protected $tasks;

    /**
     * @param App\Models\Tasks\Task $tasks
     */
    public function __construct($tasks)
    {
        $this->tasks = $tasks;
    }

    /**
     * To Response
     *
     * @param \App\Http\Requests\Request $request
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function toResponse($request)
    {
        $users= collect(User::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$users= collect(User::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.tasks.edit',compact('users', 'users', ))->with([
            'tasks' => $this->tasks
        ]);
    }
}