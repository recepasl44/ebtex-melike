<?php

namespace App\Http\Responses\Backend\TaskUsers;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Tasks\Task;
use App\Models\Access\User\User;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\TaskUsers\TaskUser
     */
    protected $taskusers;

    /**
     * @param App\Models\TaskUsers\TaskUser $taskusers
     */
    public function __construct($taskusers)
    {
        $this->taskusers = $taskusers;
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
        $tasks=collect(Task::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });
        $users=collect(User::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['first_name'].' '.$item['last_name']];
        });
        return view('backend.taskusers.edit',compact('tasks', 'users', ))->with([
            'taskusers' => $this->taskusers
        ]);
    }
}