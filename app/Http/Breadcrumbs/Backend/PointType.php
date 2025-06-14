<?php

Breadcrumbs::register('admin.pointtypes.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.pointtypes.management'), route('admin.pointtypes.index'));
});

Breadcrumbs::register('admin.pointtypes.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.pointtypes.index');
    $breadcrumbs->push(_tr('menus.backend.pointtypes.create'), route('admin.pointtypes.create'));
});

Breadcrumbs::register('admin.pointtypes.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.pointtypes.index');
    $breadcrumbs->push(_tr('menus.backend.pointtypes.edit'), route('admin.pointtypes.edit', $id));
});
