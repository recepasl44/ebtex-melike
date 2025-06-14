<?php

Breadcrumbs::register('admin.platforms.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.platforms.management'), route('admin.platforms.index'));
});

Breadcrumbs::register('admin.platforms.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.platforms.index');
    $breadcrumbs->push(_tr('menus.backend.platforms.create'), route('admin.platforms.create'));
});

Breadcrumbs::register('admin.platforms.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.platforms.index');
    $breadcrumbs->push(_tr('menus.backend.platforms.edit'), route('admin.platforms.edit', $id));
});
