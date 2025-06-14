<?php

Breadcrumbs::register('admin.vehicletypes.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.vehicletypes.management'), route('admin.vehicletypes.index'));
});

Breadcrumbs::register('admin.vehicletypes.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.vehicletypes.index');
    $breadcrumbs->push(_tr('menus.backend.vehicletypes.create'), route('admin.vehicletypes.create'));
});

Breadcrumbs::register('admin.vehicletypes.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.vehicletypes.index');
    $breadcrumbs->push(_tr('menus.backend.vehicletypes.edit'), route('admin.vehicletypes.edit', $id));
});
