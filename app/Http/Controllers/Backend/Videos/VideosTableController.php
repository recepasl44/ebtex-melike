<?php

namespace App\Http\Controllers\Backend\Videos;

use App\Supports\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Videos\VideoRepository;
use App\Http\Requests\Backend\Videos\ManageVideoRequest;

/**
 * Class VideosTableController.
 */
class VideosTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var VideoRepository
     */
    protected $video;
    protected $status;
    protected $types;
    protected $sites;

    /**
     * contructor to initialize repository object
     * @param VideoRepository $video;
     */
    public function __construct(VideoRepository $video)
    {
        $this->video = $video;

        $this->status = $status = [
            0 => _tr('labels.backend.videos.table.inactive'),
            1 => _tr('labels.backend.videos.table.published'),
            2 => _tr('labels.backend.videos.table.draft'),
            3 => _tr('labels.backend.videos.table.scheduled'),
        ];
        $this->types = $types =[
            0 => _tr('labels.backend.videos.table.lesson'),
            1 => _tr('labels.backend.videos.table.question'),
            2 => _tr('labels.backend.videos.table.solution'),
        ];
        $this->sites = $sites =[
            0 => _tr('labels.backend.videos.table.vimeo'),
            1 => _tr('labels.backend.videos.table.youtube'),
            2 => _tr('labels.backend.videos.table.other'),
        ];
    }

    /**
     * This method return the data of the model
     * @param ManageVideoRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageVideoRequest $request)
    {
        return Datatables::of($this->video->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($video) {
                return Carbon::parseToDate($video->created_at);
            })
            ->addColumn('site', function ($video) {
                return $this->sites[$video->site]?$this->sites[$video->site]:'';
            })
            ->addColumn('type', function ($video) {
                return $this->types[$video->type]?$this->types[$video->type]:'';
            })
            ->addColumn('status', function ($video) {
                return $this->status[$video->status]?$this->status[$video->status]:'';
            })
            ->addColumn('actions', function ($video) {
                return $video->action_buttons;
            })
            ->make(true);
    }
}
