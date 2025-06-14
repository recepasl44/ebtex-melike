<?php

namespace App\Http\Controllers\Backend\Testimonials;

use App\Supports\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Testimonials\TestimonialRepository;
use App\Http\Requests\Backend\Testimonials\ManageTestimonialRequest;

/**
 * Class TestimonialsTableController.
 */
class TestimonialsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var TestimonialRepository
     */
    protected $testimonial;

    /**
     * contructor to initialize repository object
     * @param TestimonialRepository $testimonial;
     */
    public function __construct(TestimonialRepository $testimonial)
    {
        $this->testimonial = $testimonial;
    }

    /**
     * This method return the data of the model
     * @param ManageTestimonialRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageTestimonialRequest $request)
    {
        return Datatables::of($this->testimonial->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('lang', function ($card) {
                return $card->language_label ?? '';
            })
            ->addColumn('created_at', function ($testimonial) {
                return Carbon::parseToDate($testimonial->created_at);
            })
            ->addColumn('actions', function ($testimonial) {
                return $testimonial->action_buttons;
            })
            ->make(true);
    }
}
