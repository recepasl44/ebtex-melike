<?php
namespace App\Services\Sms\Providers;

use App\Services\Sms\SmsServiceInterface;
use GuzzleHttp\Client;

class MobildevService implements SmsServiceInterface
{
    protected $username;
    protected $password;
    protected $origin;

    public function __construct(array $config)
    {
        $this->username = $config['username'] ?? null;
        $this->password = $config['password'] ?? null;
        $this->origin = $config['origin'] ?? null;
    }

    public function send(string $phone, string $message): bool|string
    {
        try {
            $client = new Client();
            $response = $client->post('https://api.mobildev.com/sms/send', [
                'form_params' => [
                    'username' => $this->username,
                    'password' => $this->password,
                    'origin' => $this->origin,
                    'phone' => $phone,
                    'message' => $message,
                ],
            ]);
            $body = json_decode((string) $response->getBody(), true);

            if (!empty($body['status']) && $body['status'] === 'success') {
                return true;
            }
            return $body['error'] ?? 'Unknown error';
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}
