<?php

Breadcrumbs::register('admin.smslogs.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.smslogs.management'), route('admin.smslogs.index'));
});

Breadcrumbs::register('admin.smslogs.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.smslogs.index');
    $breadcrumbs->push(_tr('menus.backend.smslogs.create'), route('admin.smslogs.create'));
});

Breadcrumbs::register('admin.smslogs.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.smslogs.index');
    $breadcrumbs->push(_tr('menus.backend.smslogs.edit'), route('admin.smslogs.edit', $id));
});
