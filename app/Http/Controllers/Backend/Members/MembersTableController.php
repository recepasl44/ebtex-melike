<?php

namespace App\Http\Controllers\Backend\Members;

use App\Supports\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Members\MemberRepository;
use App\Http\Requests\Backend\Members\ManageMemberRequest;
use Illuminate\Support\Facades\Storage;

/**
 * Class MembersTableController.
 */
class MembersTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var MemberRepository
     */
    protected $member;
    protected $social_medias;
    protected $social_icons;

    /**
     * contructor to initialize repository object
     * @param MemberRepository $member;
     */
    public function __construct(MemberRepository $member)
    {
        $this->member = $member;
        $this->social_medias = ['facebook', 'twitter', 'instagram', 'linkedin'];
        $this->social_icons = ['facebook-square', 'twitter-square', 'instagram', 'linkedin'];
    }

    /**
     * This method return the data of the model
     * @param ManageMemberRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageMemberRequest $request)
    {
        return Datatables::of($this->member->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('status', function ($member) {
                return $member->status?_tr('labels.backend.members.table.active'):_tr('labels.backend.members.table.passive');
            })
            ->addColumn('cover', function ($member) {
                return $member->cover?'<img height="50" width="50" src="'.Storage::disk('public')->url($member->cover).'">':'';
            })
            ->addColumn('lang', function ($card) {
                return $card->language_label ?? '';
            })
            ->addColumn('social_media', function ($member) {
                $socials = "";
                foreach($this->social_medias as $key => $sc){
                    if(isset($member->{$sc}) && $member->{$sc} ){
                        $socials .= '<a href="'.$member->{$sc}.'"><i class="fab fa-'.$this->social_icons[$key].'" ></i> </a>';
                    }
                }
                return $socials;
            })
            ->addColumn('created_at', function ($member) {
                return Carbon::parseToDate($member->created_at);
            })
            ->addColumn('actions', function ($member) {
                return $member->action_buttons;
            })
            ->make(true);
    }
}
