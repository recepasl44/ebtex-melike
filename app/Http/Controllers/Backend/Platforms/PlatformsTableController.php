<?php

namespace App\Http\Controllers\Backend\Platforms;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Platforms\PlatformRepository;
use App\Http\Requests\Backend\Platforms\ManagePlatformRequest;

/**
 * Class PlatformsTableController.
 */
class PlatformsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var PlatformRepository
     */
    protected $platform;

    /**
     * contructor to initialize repository object
     * @param PlatformRepository $platform;
     */
    public function __construct(PlatformRepository $platform)
    {
        $this->platform = $platform;
    }

    /**
     * This method return the data of the model
     * @param ManagePlatformRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManagePlatformRequest $request)
    {
        return Datatables::of($this->platform->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($platform) {
                return Carbon::parse($platform->created_at)->toDateString();
            })
            ->addColumn('actions', function ($platform) {
                return $platform->action_buttons;
            })
            ->make(true);
    }
}
