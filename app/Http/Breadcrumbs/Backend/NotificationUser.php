<?php

Breadcrumbs::register('admin.notificationusers.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.notificationusers.management'), route('admin.notificationusers.index'));
});

Breadcrumbs::register('admin.notificationusers.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.notificationusers.index');
    $breadcrumbs->push(_tr('menus.backend.notificationusers.create'), route('admin.notificationusers.create'));
});

Breadcrumbs::register('admin.notificationusers.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.notificationusers.index');
    $breadcrumbs->push(_tr('menus.backend.notificationusers.edit'), route('admin.notificationusers.edit', $id));
});
