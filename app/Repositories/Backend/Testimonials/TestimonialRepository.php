<?php

namespace App\Repositories\Backend\Testimonials;

use DB;
use App\Supports\Carbon;
use App\Models\Testimonials\Testimonial;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class TestimonialRepository.
 */
class TestimonialRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Testimonial::class;

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
                config('module.testimonials.table').'.id',
                config('module.testimonials.table').'.title',
                config('module.testimonials.table').'.name',
                config('module.testimonials.table').'.cover',
                config('module.testimonials.table').'.comment',
                config('module.testimonials.table').'.updated_at',
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
        if (Testimonial::create($input)) {
            return true;
        }
        throw new GeneralException(_tr('exceptions.backend.testimonials.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Testimonial $testimonial
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Testimonial $testimonial, array $input)
    {
    	if ($testimonial->update($input))
            return true;

        throw new GeneralException(_tr('exceptions.backend.testimonials.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Testimonial $testimonial
     * @throws GeneralException
     * @return bool
     */
    public function delete(Testimonial $testimonial)
    {
        if ($testimonial->delete()) {
            return true;
        }

        throw new GeneralException(_tr('exceptions.backend.testimonials.delete_error'));
    }
}
