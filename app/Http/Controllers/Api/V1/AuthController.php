<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Currencies\Currency;
use App\Models\Branches\Branche;
use App\Models\PaymentMethods\PaymentMethod;
use App\Models\Seasons\Season;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class AuthController extends APIController
{
    /**
     * Log the user in.
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'email'    => 'required|email',
            'password' => 'required|min:4',
        ]);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $credentials = $request->only(['email', 'password']);

        try {
            if (!Auth::attempt($credentials)) {
                return $this->throwValidation(_tr('api.messages.login.failed'));
            }

            $user = $request->user();
            // Also append the first role id for frontend usage
            $user->setAttribute('role_id', optional($user->roles()->first())->id);

            $passportToken = $user->createToken('API Access Token');

            // Save generated token
            $passportToken->token->save();

            $token = $passportToken->accessToken;
        } catch (\Exception $e) {
            return $this->respondInternalError($e->getMessage());
        }

        return $this->respond([
            'message'   => _tr('api.messages.login.success'),
            'token'     => $token,
            'me' => $user,
            'seasons' => Season::all(),
            'default_season' => Season::first(),
            'branches' => Branche::all(),
            'default_branche' => Branche::first(),
            'payment_methods' => PaymentMethod::all(),
            'currencies' => Currency::where('status', 1)->get()

        ]);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        $user = $this->guard()->user();
        $user->setAttribute('role_id', optional($user->roles()->first())->id);
        return response()->json($user);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        try {
            $request->user()->token()->revoke();
        } catch (\Exception $e) {
            return $this->respondInternalError($e->getMessage());
        }

        return $this->respond([
            'message'   => _tr('api.messages.logout.success'),
        ]);
    }
}
