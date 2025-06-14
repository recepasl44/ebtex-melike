<?php

namespace App\Services\Sms\Providers;

use App\Services\Sms\SmsServiceInterface;
use Illuminate\Support\Facades\Http;

class InteraktifSmsService implements SmsServiceInterface
{
    protected $apiKey, $apiSecret, $origin;

    public function __construct(array $config)
    {
        $this->apiKey = $config['api_key'];
        $this->apiSecret = $config['api_secret'];
        $this->origin = $config['origin'];
    }

    public function send(string $phone, string $message): bool|string
    {
        $response = Http::withHeaders([
            'Authorization' => 'Basic ' . base64_encode("{$this->apiKey}:{$this->apiSecret}"),
        ])->post('https://api.interaktifsms.com/sms/send', [
            'sender' => $this->origin,
            'message' => $message,
            'recipients' => [$phone],
        ]);

        return $response->successful() ? true : $response->body();
    }
}
