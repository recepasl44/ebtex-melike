<?php

Breadcrumbs::register('admin.notifications.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.notifications.management'), route('admin.notifications.index'));
});

Breadcrumbs::register('admin.notifications.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.notifications.index');
    $breadcrumbs->push(_tr('menus.backend.notifications.create'), route('admin.notifications.create'));
});

Breadcrumbs::register('admin.notifications.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.notifications.index');
    $breadcrumbs->push(_tr('menus.backend.notifications.edit'), route('admin.notifications.edit', $id));
});
