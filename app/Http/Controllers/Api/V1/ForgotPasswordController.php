<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Access\User\User;
use App\Notifications\Frontend\Auth\UserNeedsPasswordReset;
use App\Repositories\Frontend\Access\User\UserRepository;
use Illuminate\Http\Request;
use Validator;

class ForgotPasswordController extends APIController
{
    /**
     * __construct.
     *
     * @param $repository
     */
    public function __construct(UserRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Send a reset link to the given user.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendResetLinkEmail(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $user = $this->repository->findByEmail($request->get('email'));

        if (!$user) {
            return $this->respondNotFound(_tr('api.messages.forgot_password.validation.email_not_found'));
        }

        $token = $this->repository->saveToken();

        $user->notify(new UserNeedsPasswordReset($token));

        return $this->respond([
            'status'    => 'ok',
            'message'   => _tr('api.messages.forgot_password.success'),
        ]);
    }
}
