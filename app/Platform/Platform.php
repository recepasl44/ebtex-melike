<?php
/**
 * Created by IntelliJ IDEA.
 * User: tnhnclskn
 * Date: 2019-03-08
 * Time: 18:18
 */

namespace App\Platform;

use App\Models\Core\Domain;
use App\Models\Core\Platform as PlatformModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Request;

class Platform {
    static private $initialize = false;
    static private $exceptsPrefix = ['core_','permissions','roles','oauth_clients', 'oauth_personal_access_clients', 'oauth_access_tokens'];
    static private $platform;
    static private $domain;

    public static function initialize()
    {
        if (!self::$initialize) {
            self::initPlatform();
            self::$initialize = true;
        }
    }

    private static function initPlatform()
    {
        $hostName = Request::getHost();
        $domain = Domain::with('platform')
            ->ofDomain($hostName)
            ->first();
        if (!$domain){
            $domain = Domain::with('platform')
                ->where('id', 1)
                ->first();
        }
        self::setDomain($domain);
        self::setPlatform($domain->platform);
    }

    private static function setPlatform(PlatformModel $platform)
    {
        
        self::$platform = $platform;
    }

    private static function setDomain(Domain $domain)
    {
        self::$domain = $domain;
    }

    public static function getPlatform()
    {
        self::initialize();
        return self::$platform;
    }

    public static function getDomain()
    {
        self::initialize();
        return self::$domain;
    }

    public static function id()
    {
        return self::getPlatform()->id;
    }

    public static function isExcept(Model $model)
    {
        $table = $model->getTable();
        foreach(self::$exceptsPrefix as $exceptPrefix) {
            $prefixTable = substr($table, 0, strlen($exceptPrefix));
            if ($prefixTable == $exceptPrefix) return true;
        }
        return false;
    }
}