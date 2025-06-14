<?php

Breadcrumbs::register('admin.contracttypes.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.contracttypes.management'), route('admin.contracttypes.index'));
});

Breadcrumbs::register('admin.contracttypes.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.contracttypes.index');
    $breadcrumbs->push(_tr('menus.backend.contracttypes.create'), route('admin.contracttypes.create'));
});

Breadcrumbs::register('admin.contracttypes.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.contracttypes.index');
    $breadcrumbs->push(_tr('menus.backend.contracttypes.edit'), route('admin.contracttypes.edit', $id));
});
