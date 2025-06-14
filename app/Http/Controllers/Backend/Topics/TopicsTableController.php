<?php

namespace App\Http\Controllers\Backend\Topics;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Topics\TopicRepository;
use App\Http\Requests\Backend\Topics\ManageTopicRequest;

/**
 * Class TopicsTableController.
 */
class TopicsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var TopicRepository
     */
    protected $topic;

    /**
     * contructor to initialize repository object
     * @param TopicRepository $topic;
     */
    public function __construct(TopicRepository $topic)
    {
        $this->topic = $topic;
    }

    /**
     * This method return the data of the model
     * @param ManageTopicRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageTopicRequest $request)
    {
        return Datatables::of($this->topic->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($topic) {
                return Carbon::parse($topic->created_at)->toDateString();
            })
            ->addColumn('actions', function ($topic) {
                return $topic->action_buttons;
            })
            ->make(true);
    }
}
