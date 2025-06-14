<?php

namespace App\Repositories\Backend\ConversationUsers;

use DB;
use Carbon\Carbon;
use App\Models\ConversationUsers\ConversationUser;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ConversationUserRepository.
 */
class ConversationUserRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = ConversationUser::class;

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
                config('module.conversationusers.table').'.id',
                config('module.conversationusers.table').'.conversation_id',
				config('module.conversationusers.table').'.user_id',
				
                config('module.conversationusers.table').'.created_at',
                config('module.conversationusers.table').'.updated_at',
            ]);
            
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
        if (ConversationUser::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.conversationusers.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param ConversationUser $conversationuser
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(ConversationUser $conversationuser, array $input)
    {
    	if ($conversationuser->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.conversationusers.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param ConversationUser $conversationuser
     * @throws GeneralException
     * @return bool
     */
    public function delete(ConversationUser $conversationuser)
    {
        if ($conversationuser->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.conversationusers.delete_error'));
    }
}
