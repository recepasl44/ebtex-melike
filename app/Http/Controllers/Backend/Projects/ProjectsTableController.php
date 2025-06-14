<?php

namespace App\Http\Controllers\Backend\Projects;

use App\Supports\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Projects\ProjectRepository;
use App\Http\Requests\Backend\Projects\ManageProjectRequest;
use Illuminate\Support\Facades\Storage;

/**
 * Class ProjectsTableController.
 */
class ProjectsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var ProjectRepository
     */
    protected $project;

    /**
     * contructor to initialize repository object
     * @param ProjectRepository $project;
     */
    public function __construct(ProjectRepository $project)
    {
        $this->project = $project;
    }

    /**
     * This method return the data of the model
     * @param ManageProjectRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageProjectRequest $request)
    {
        return Datatables::of($this->project->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('cover', function ($project) {
                return $project->cover?'<img height="50" width="50" src="'.Storage::disk('public')->url($project->cover).'">':'';
            })
            ->addColumn('lang', function ($card) {
                return $card->language_label ?? '';
            })
            ->addColumn('status', function ($project) {
                return $project->status?_tr('labels.general.active'):_tr('labels.general.inactive');
            })
            ->addColumn('created_at', function ($project) {
                return Carbon::parseToDate($project->created_at);
            })
            ->addColumn('actions', function ($project) {
                return $project->action_buttons;
            })
            ->make(true);
    }
}
