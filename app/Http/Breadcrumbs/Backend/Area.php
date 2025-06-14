<?php

Breadcrumbs::register('admin.areas.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.areas.management'), route('admin.areas.index'));
});

Breadcrumbs::register('admin.areas.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.areas.index');
    $breadcrumbs->push(_tr('menus.backend.areas.create'), route('admin.areas.create'));
});

Breadcrumbs::register('admin.areas.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.areas.index');
    $breadcrumbs->push(_tr('menus.backend.areas.edit'), route('admin.areas.edit', $id));
});
