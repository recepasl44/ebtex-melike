<?php

namespace App\Repositories\Backend\Components;

use DB;
use Carbon\Carbon;
use App\Models\Components\Component;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ComponentRepository.
 */
class ComponentRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Component::class;

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
                config('module.components.table').'.id',
                config('module.components.table').'.name',
				config('module.components.table').'.cover',
				config('module.components.table').'.file',
				config('module.components.table').'.variables',
				
                config('module.components.table').'.created_at',
                config('module.components.table').'.updated_at',
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
        $input = $this->uploadImage($input, 'components', 'cover');
        $input['variables'] = json_encode($input['variables']);
        if (Component::create($input)) {
            return true;
        }
        throw new GeneralException(_tr('exceptions.backend.components.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Component $component
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Component $component, array $input)
    {
        if (array_key_exists('cover', $input)) {
            $this->deleteOldFile($component, 'cover');
            $input = $this->uploadImage($input, 'components', 'cover');
        }
        $input['variables'] = json_encode($input['variables']);

    	if ($component->update($input))
            return true;

        throw new GeneralException(_tr('exceptions.backend.components.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Component $component
     * @throws GeneralException
     * @return bool
     */
    public function delete(Component $component)
    {
        if ($component->delete()) {
            return true;
        }

        throw new GeneralException(_tr('exceptions.backend.components.delete_error'));
    }
}
