<?php

namespace App\Supports;

use Carbon\Carbon as BaseCarbon;

class Carbon extends BaseCarbon
{
    public static function parseToDate($time = null, $tz = null)
    {
        try {
            return self::toTurkishDateString(BaseCarbon::parse($time, $tz));
        } catch (\Exception $e) {
            // This will allow you to catch on when you pass a string like "tomorrow"
            return BaseCarbon::parse($time, $tz);
        }
    }
    public static function parseToDateTime($time = null, $tz = null)
    {
        try {
            return self::toTurkishDateTimeString(BaseCarbon::parse($time, $tz));
        } catch (\Exception $e) {
            // This will allow you to catch on when you pass a string like "tomorrow"
            return BaseCarbon::parse($time, $tz);
        }
    }

    public static function toTurkishDateString($time)
    {
        return $time->rawFormat('d.m.Y');
    }

    public static function toTurkishDateTimeString($time)
    {
        return $time->format('d.m.Y H:i');
    }
}