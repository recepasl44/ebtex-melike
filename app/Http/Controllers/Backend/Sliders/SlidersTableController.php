<?php

namespace App\Http\Controllers\Backend\Sliders;

use App\Supports\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Sliders\SliderRepository;
use App\Http\Requests\Backend\Sliders\ManageSliderRequest;
use Illuminate\Support\Facades\Storage;

/**
 * Class SlidersTableController.
 */
class SlidersTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var SliderRepository
     */
    protected $slider;

    /**
     * contructor to initialize repository object
     * @param SliderRepository $slider;
     */
    public function __construct(SliderRepository $slider)
    {
        $this->slider = $slider;
    }

    /**
     * This method return the data of the model
     * @param ManageSliderRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageSliderRequest $request)
    {
        return Datatables::of($this->slider->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('lang', function ($card) {
                return $card->language_label ?? '';
            })
            ->addColumn('status', function ($slider) {
                return $slider->status?_tr('labels.general.active'):_tr('labels.general.inactive');
            })
            ->addColumn('cover', function ($slider) {
                return $slider->cover?'<img height="50" width="50" src="'.Storage::disk('public')->url($slider->cover).'">':'';
            })
            ->addColumn('created_at', function ($slider) {
                return Carbon::parseToDate($slider->created_at);
            })
            ->addColumn('actions', function ($slider) {
                return $slider->action_buttons;
            })
            ->make(true);
    }
}
