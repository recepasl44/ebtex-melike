<?php

namespace App\Services\Sms;

use App\Models\SmsLogs\SmsLog;
use App\Models\SmsProviders\SmsProvider;

class SmsSender
{
    public static function send(string $phone, string $message): bool|string
    {
        $provider = SmsProvider::where('user_id', access()->user()->id ?? 1 )->firstOrFail();

        $smsService = SmsManager::create($provider->provider, [
            'username' => $provider->username,
            'password' => $provider->password,
            'api_key' => $provider->api_key,
            'api_secret' => $provider->api_secret,
            'origin' => $provider->origin,
        ]);

        $result = $smsService->send($phone, $message);

        SmsLog::create([
            'user_id' => access()->user()->id ?? 1,
            'phone' => $phone,
            'message' => $message,
            'provider' => $provider->provider,
            'status' => $result === true ? 'success' : 'failed',
            'response' => $result === true ? null : (string) $result,
        ]);

        return $result;
    }
}
