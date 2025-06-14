<?php

Breadcrumbs::register('admin.reporttypes.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.reporttypes_management'), route('admin.reporttypes.index'));
});

Breadcrumbs::register('admin.reporttypes.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.reporttypes.index');
    $breadcrumbs->push(_tr('menus.backend.reporttypes.create'), route('admin.reporttypes.create'));
});

Breadcrumbs::register('admin.reporttypes.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.reporttypes.index');
    $breadcrumbs->push(_tr('menus.backend.reporttypes.edit'), route('admin.reporttypes.edit', $id));
});
