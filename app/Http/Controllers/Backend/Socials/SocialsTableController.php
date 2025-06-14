<?php

namespace App\Http\Controllers\Backend\Socials;

use App\Supports\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Socials\SocialRepository;
use App\Http\Requests\Backend\Socials\ManageSocialRequest;

/**
 * Class SocialsTableController.
 */
class SocialsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var SocialRepository
     */
    protected $social;

    /**
     * contructor to initialize repository object
     * @param SocialRepository $social;
     */
    public function __construct(SocialRepository $social)
    {
        $this->social = $social;
    }

    /**
     * This method return the data of the model
     * @param ManageSocialRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageSocialRequest $request)
    {
        return Datatables::of($this->social->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('lang', function ($card) {
                return $card->language_label ?? '';
            })
            ->addColumn('created_at', function ($social) {
                return Carbon::parseToDate($social->created_at);
            })
            ->addColumn('actions', function ($social) {
                return $social->action_buttons;
            })
            ->make(true);
    }
}
