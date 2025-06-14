<?php
namespace App\Services\Sms\Providers;

use App\Services\Sms\SmsServiceInterface;
use GuzzleHttp\Client;

class VerimorService implements SmsServiceInterface
{
    protected $apiKey;
    protected $apiSecret;
    protected $origin;

    public function __construct(array $config)
    {
        $this->apiKey = $config['api_key'] ?? null;
        $this->apiSecret = $config['api_secret'] ?? null;
        $this->origin = $config['origin'] ?? null;
    }

    public function send(string $phone, string $message): bool|string
    {
        try {
            $client = new Client();
            $response = $client->post('https://api.verimor.com.tr/sms/send', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $this->apiKey,
                ],
                'json' => [
                    'origin' => $this->origin,
                    'phone' => $phone,
                    'message' => $message,
                ],
            ]);
            $body = json_decode((string) $response->getBody(), true);

            if (!empty($body['success']) && $body['success'] === true) {
                return true;
            }
            return $body['error'] ?? 'Unknown error';
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}
