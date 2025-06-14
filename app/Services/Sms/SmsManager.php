<?php

namespace App\Services\Sms;

use App\Services\Sms\Providers\CorvassService;
use App\Services\Sms\Providers\NetgsmService;
use App\Services\Sms\Providers\IletimerkeziService;
use App\Services\Sms\Providers\InteraktifSmsService;
use App\Services\Sms\Providers\VatanSmsService;
use App\Services\Sms\Providers\TurkiyeSmsService;
use App\Services\Sms\Providers\MobildevService;
use App\Services\Sms\Providers\VerimorService;
use App\Services\Sms\Providers\SmslocalService;
use App\Services\Sms\Providers;

class SmsManager
{
    public static function create(string $provider, array $config): SmsServiceInterface
    {
        return match ($provider) {
            'netgsm' => new NetgsmService($config),
            'iletimerkezi' => new IletimerkeziService($config),
            'interaktifsms' => new InteraktifSmsService($config),
            'vatansms' => new VatanSmsService($config),
            'turkiyesms' => new TurkiyeSmsService($config),
            'mobildev' => new MobildevService($config),
            'corvass' => new CorvassService($config),
            'verimor' => new VerimorService($config),
            'smslocal' => new SmslocalService($config),
            default => throw new \Exception('Unsupported provider')
        };
    }
}