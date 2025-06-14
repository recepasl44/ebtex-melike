<?php

namespace App\Repositories\Backend\Navbars;

use DB;
use App\Supports\Carbon;
use App\Models\Navbars\Navbar;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class NavbarRepository.
 */
class NavbarRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Navbar::class;

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
                config('module.navbars.table').'.id',
                config('module.navbars.table').'.parent_id',
                config('module.navbars.table').'.name',
                config('module.navbars.table').'.url',
                config('module.navbars.table').'.is_spesific',
                config('module.navbars.table').'.status',
                config('module.navbars.table').'.created_at',
                config('module.navbars.table').'.updated_at',
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
        if (Navbar::create($input)) {
            return true;
        }
        throw new GeneralException(_tr('exceptions.backend.navbars.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Navbar $navbar
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Navbar $navbar, array $input)
    {
    	if ($navbar->update($input))
            return true;

        throw new GeneralException(_tr('exceptions.backend.navbars.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Navbar $navbar
     * @throws GeneralException
     * @return bool
     */
    public function delete(Navbar $navbar)
    {
        if ($navbar->delete()) {
            return true;
        }

        throw new GeneralException(_tr('exceptions.backend.navbars.delete_error'));
    }
}
