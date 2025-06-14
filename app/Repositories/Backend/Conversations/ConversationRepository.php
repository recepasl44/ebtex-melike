<?php

namespace App\Repositories\Backend\Conversations;

use DB;
use Carbon\Carbon;
use App\Models\Conversations\Conversation;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ConversationRepository.
 */
class ConversationRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Conversation::class;

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
                config('module.conversations.table').'.id',
                config('module.conversations.table').'.name',
                config('module.conversations.table').'.type_id',
                config('module.conversations.table').'.user_one_id',
				config('module.conversations.table').'.user_two_id',
				
                config('module.conversations.table').'.created_at',
                config('module.conversations.table').'.updated_at',
            ]);
        if(request()->has('type_id') && !empty(request()->get('type_id'))){
            $data = $data->where('type_id', request()->get('type_id'));
        }
        if(request()->has('user_one_id') && !empty(request()->get('user_one_id'))){
            $data = $data->where('user_one_id', request()->get('user_one_id'));
        }
        if(request()->has('user_two_id') && !empty(request()->get('user_two_id'))){
            $data = $data->where('user_two_id', request()->get('user_two_id'));
        }
            
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
        if (Conversation::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.conversations.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Conversation $conversation
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Conversation $conversation, array $input)
    {
    	if ($conversation->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.conversations.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Conversation $conversation
     * @throws GeneralException
     * @return bool
     */
    public function delete(Conversation $conversation)
    {
        if ($conversation->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.conversations.delete_error'));
    }
}
