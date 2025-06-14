<?php

namespace App\Repositories\Backend\ScholarshipSettings;

use DB;
use Carbon\Carbon;
use App\Models\ScholarshipSettings\ScholarshipSetting;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ScholarshipSettingRepository.
 */
class ScholarshipSettingRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = ScholarshipSetting::class;

    /**
     * This method is used by Table Controller
     * For getting the table data to show in
     * the grid
     * @return mixed
     */
    public function getForDataTable()
    {
        $data = $this->query()
            ->select([
                config('module.scholarshipsettings.table').'.id',
                config('module.scholarshipsettings.table').'.display_status',
				config('module.scholarshipsettings.table').'.class_appointment',
				config('module.scholarshipsettings.table').'.application_received_sms',
				config('module.scholarshipsettings.table').'.phone_verification',
				config('module.scholarshipsettings.table').'.own_student_registration',
				config('module.scholarshipsettings.table').'.scholarship_rate',
				config('module.scholarshipsettings.table').'.result_score',
				config('module.scholarshipsettings.table').'.result_sorting',
				config('module.scholarshipsettings.table').'.exam_price_status',
				config('module.scholarshipsettings.table').'.exam_price',
				config('module.scholarshipsettings.table').'.information_document',
				config('module.scholarshipsettings.table').'.specification',
				config('module.scholarshipsettings.table').'.doc_announcement_date',
				config('module.scholarshipsettings.table').'.bank_name',
				config('module.scholarshipsettings.table').'.bank_branch_code',
				config('module.scholarshipsettings.table').'.bank_account_number',
				config('module.scholarshipsettings.table').'.bank_account_type',
				config('module.scholarshipsettings.table').'.payment_receipt',

                config('module.scholarshipsettings.table').'.created_at',
                config('module.scholarshipsettings.table').'.updated_at',
            ]);

        return $data;
    }

    /**
     * For Creating the respective model in storage
     *
     * @param array $input
     * @throws GeneralException
     * @return bool
     */
    public function create(array $input)
    {
        if (ScholarshipSetting::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.scholarshipsettings.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param ScholarshipSetting $scholarshipsetting
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(ScholarshipSetting $scholarshipsetting, array $input)
    {
    	if ($scholarshipsetting->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.scholarshipsettings.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param ScholarshipSetting $scholarshipsetting
     * @throws GeneralException
     * @return bool
     */
    public function delete(ScholarshipSetting $scholarshipsetting)
    {
        if ($scholarshipsetting->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.scholarshipsettings.delete_error'));
    }
}
