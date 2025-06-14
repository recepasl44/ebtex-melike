<?php

namespace App\Repositories\Backend\QuestionPdfs;

use DB;
use Carbon\Carbon;
use App\Models\QuestionPdfs\QuestionPdf;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class QuestionPdfRepository.
 */
class QuestionPdfRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = QuestionPdf::class;

    /**
     * This method is used by Table Controller
     * For getting the table data to show in
     * the grid
     * @return mixed
     */
    public function getForDataTable()
    {
        return $this->query()
            ->select([
                config('module.questionpdfs.table').'.id',
                config('module.questionpdfs.table').'.file_path',
				
                config('module.questionpdfs.table').'.created_at',
                config('module.questionpdfs.table').'.updated_at',
            ]);
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
        $input = $this->uploadFile($input, 'questionpdfs', 'file_path');
        if ($pdf = QuestionPdf::create($input)) {
            return $pdf->id;
        }
        throw new GeneralException(trans('exceptions.backend.questionpdfs.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param QuestionPdf $questionpdf
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(QuestionPdf $questionpdf, array $input)
    {
        if (array_key_exists('file_path', $input)) {
            $this->deleteOldFile($questionpdf, 'file_path');
            $input = $this->uploadFile($input, 'questionpdfs', 'file_path');
        }
    	if ($questionpdf->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.questionpdfs.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param QuestionPdf $questionpdf
     * @throws GeneralException
     * @return bool
     */
    public function delete(QuestionPdf $questionpdf)
    {
        if ($questionpdf->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.questionpdfs.delete_error'));
    }
}
