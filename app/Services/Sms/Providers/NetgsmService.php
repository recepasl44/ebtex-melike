<?php

namespace App\Services\Sms\Providers;

use App\Services\Sms\SmsServiceInterface;
use Illuminate\Support\Facades\Http;

class NetgsmService implements SmsServiceInterface
{
    protected $username, $password, $origin;

    public function __construct(array $config)
    {
        $this->username = $config['username'];
        $this->password = $config['password'];
        $this->origin = $config['origin'];
    }

    public function send(string $phone, string $message): bool|string
    {
        $response = Http::asForm()->post('https://api.netgsm.com.tr/sms/send/get', [
            'usercode' => $this->username,
            'password' => $this->password,
            'msgheader' => $this->origin,
            'gsmno' => $phone,
            'message' => $message,
        ]);

        return $response->successful() ? true : $response->body();
    }
}
