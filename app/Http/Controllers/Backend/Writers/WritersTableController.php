<?php

namespace App\Http\Controllers\Backend\Writers;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Writers\WriterRepository;
use App\Http\Requests\Backend\Writers\ManageWriterRequest;

/**
 * Class WritersTableController.
 */
class WritersTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var WriterRepository
     */
    protected $writer;

    /**
     * contructor to initialize repository object
     * @param WriterRepository $writer;
     */
    public function __construct(WriterRepository $writer)
    {
        $this->writer = $writer;
    }

    /**
     * This method return the data of the model
     * @param ManageWriterRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageWriterRequest $request)
    {
        return Datatables::of($this->writer->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($writer) {
                return Carbon::parse($writer->created_at)->toDateString();
            })
            ->addColumn('actions', function ($writer) {
                return $writer->action_buttons;
            })
            ->make(true);
    }
}
