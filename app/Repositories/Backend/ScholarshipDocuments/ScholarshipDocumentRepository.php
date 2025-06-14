<?php

namespace App\Repositories\Backend\ScholarshipDocuments;

use DB;
use Carbon\Carbon;
use App\Models\ScholarshipDocuments\ScholarshipDocument;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ScholarshipDocumentRepository.
 */
class ScholarshipDocumentRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = ScholarshipDocument::class;

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
                config('module.scholarshipdocuments.table').'.id',
                config('module.scholarshipdocuments.table').'.scholarship_id',
				config('module.scholarshipdocuments.table').'.campus_name',
				config('module.scholarshipdocuments.table').'.building_name',
				config('module.scholarshipdocuments.table').'.hall_name',
				config('module.scholarshipdocuments.table').'.hall_date',
				config('module.scholarshipdocuments.table').'.hall_session',
				config('module.scholarshipdocuments.table').'.duration',
				config('module.scholarshipdocuments.table').'.program_id',
				config('module.scholarshipdocuments.table').'.level_id',
				config('module.scholarshipdocuments.table').'.school_id',
				config('module.scholarshipdocuments.table').'.phone',
				config('module.scholarshipdocuments.table').'.birth_date',
				config('module.scholarshipdocuments.table').'.first_name',
				config('module.scholarshipdocuments.table').'.last_name',
				config('module.scholarshipdocuments.table').'.identity_no',
				config('module.scholarshipdocuments.table').'.gender',
				config('module.scholarshipdocuments.table').'.payment_status',
				config('module.scholarshipdocuments.table').'.payment_receipt',

                config('module.scholarshipdocuments.table').'.created_at',
                config('module.scholarshipdocuments.table').'.updated_at',
            ]);

        if(request()->has('scholarship_id') && !empty(request()->get('scholarship_id'))){
            $data = $data->where('scholarship_id', request()->get('scholarship_id'));
        }

        if(request()->has('program_id') && !empty(request()->get('program_id'))){
            $data = $data->where('program_id', request()->get('program_id'));
        }

        if(request()->has('level_id') && !empty(request()->get('level_id'))){
            $data = $data->where('level_id', request()->get('level_id'));
        }

        if(request()->has('school_id') && !empty(request()->get('school_id'))){
            $data = $data->where('school_id', request()->get('school_id'));
        }

        if(request()->has('identity_no') && !empty(request()->get('identity_no'))){
            $data = $data->where('identity_no', request()->get('identity_no'));
        }

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
        if (ScholarshipDocument::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.scholarshipdocuments.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param ScholarshipDocument $scholarshipdocument
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(ScholarshipDocument $scholarshipdocument, array $input)
    {
    	if ($scholarshipdocument->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.scholarshipdocuments.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param ScholarshipDocument $scholarshipdocument
     * @throws GeneralException
     * @return bool
     */
    public function delete(ScholarshipDocument $scholarshipdocument)
    {
        if ($scholarshipdocument->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.scholarshipdocuments.delete_error'));
    }
}
