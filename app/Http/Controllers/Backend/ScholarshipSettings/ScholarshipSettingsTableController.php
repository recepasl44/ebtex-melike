<?php

namespace App\Http\Controllers\Backend\ScholarshipSettings;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\ScholarshipSettings\ScholarshipSettingRepository;
use App\Http\Requests\Backend\ScholarshipSettings\ManageScholarshipSettingRequest;

/**
 * Class ScholarshipSettingsTableController.
 */
class ScholarshipSettingsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var ScholarshipSettingRepository
     */
    protected $scholarshipsetting;

    /**
     * contructor to initialize repository object
     * @param ScholarshipSettingRepository $scholarshipsetting;
     */
    public function __construct(ScholarshipSettingRepository $scholarshipsetting)
    {
        $this->scholarshipsetting = $scholarshipsetting;
    }

    /**
     * This method return the data of the model
     * @param ManageScholarshipSettingRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageScholarshipSettingRequest $request)
    {
        return Datatables::of($this->scholarshipsetting->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($scholarshipsetting) {
                return Carbon::parse($scholarshipsetting->created_at)->toDateString();
            })
            ->addColumn('actions', function ($scholarshipsetting) {
                return $scholarshipsetting->action_buttons;
            })
            ->make(true);
    }
}
