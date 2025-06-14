<?php

namespace App\Repositories\Backend\Socials;

use DB;
use App\Supports\Carbon;
use App\Models\Socials\Social;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

/**
 * Class SocialRepository.
 */
class SocialRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Social::class;

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
                config('module.socials.table').'.id',
                config('module.socials.table').'.lang',
                config('module.socials.table').'.name',
				config('module.socials.table').'.slug',
				config('module.socials.table').'.url',
				config('module.socials.table').'.icon',
				config('module.socials.table').'.type_id',
				
                config('module.socials.table').'.created_at',
                config('module.socials.table').'.updated_at',
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
        $input['slug'] = Str::slug($input['name']);
        if (Social::create($input)) {
            return true;
        }
        throw new GeneralException(_tr('exceptions.backend.socials.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Social $social
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Social $social, array $input)
    {
        $input['slug'] = Str::slug($input['name']);
    	if ($social->update($input))
            return true;

        throw new GeneralException(_tr('exceptions.backend.socials.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Social $social
     * @throws GeneralException
     * @return bool
     */
    public function delete(Social $social)
    {
        if ($social->delete()) {
            return true;
        }

        throw new GeneralException(_tr('exceptions.backend.socials.delete_error'));
    }
}
