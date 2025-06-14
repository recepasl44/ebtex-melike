<?php

namespace App\Http\Controllers\Backend\References;

use App\Supports\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\References\ReferenceRepository;
use App\Http\Requests\Backend\References\ManageReferenceRequest;
use Illuminate\Support\Facades\Storage;

/**
 * Class ReferencesTableController.
 */
class ReferencesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var ReferenceRepository
     */
    protected $reference;

    /**
     * contructor to initialize repository object
     * @param ReferenceRepository $reference;
     */
    public function __construct(ReferenceRepository $reference)
    {
        $this->reference = $reference;
    }

    /**
     * This method return the data of the model
     * @param ManageReferenceRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageReferenceRequest $request)
    {
        return Datatables::of($this->reference->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('lang', function ($card) {
                return $card->language_label ?? '';
            })
            ->addColumn('created_at', function ($reference) {
                return Carbon::parseToDate($reference->created_at);
            })
            ->addColumn('name', function ($reference) {
                return $reference->link? '<a href="'.$reference->link.'" target="_blank">'.$reference->name.'</a>' : $reference->name ;
            })
            ->addColumn('cover', function ($project) {
                return $project->cover?'<img style="max-width:200px" height="50" src="'.Storage::disk('public')->url($project->cover).'">':'';
            })
            ->addColumn('actions', function ($reference) {
                return $reference->action_buttons;
            })
            ->make(true);
    }
}
