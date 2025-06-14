<?php

namespace App\Models\Conversations\Traits;

/**
 * Class ConversationRelationship
 */
use App\Models\Messages\Message;
use App\Models\Access\User\User;



trait ConversationRelationship
{
    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function userOne()
    {
        return $this->belongsTo(User::class, 'user_one_id');
    }

    public function userTwo()
    {
        return $this->belongsTo(User::class, 'user_two_id');
    }
				
}
