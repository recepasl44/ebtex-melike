<?php

namespace App\Services\Sms\Providers;

use App\Services\Sms\SmsServiceInterface;
use Illuminate\Support\Facades\Http;

class IletimerkeziService implements SmsServiceInterface
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
        $response = Http::asForm()->post('https://api.iletimerkezi.com/v1/send-sms', [
            'username' => $this->username,
            'password' => $this->password,
            'origin' => $this->origin,
            'destination' => $phone,
            'message' => $message,
        ]);

        return $response->successful() ? true : $response->body();
    }
}
