<?php

Breadcrumbs::register('admin.features.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.features_management'), route('admin.features.index'));
});

Breadcrumbs::register('admin.features.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.features.index');
    $breadcrumbs->push(_tr('menus.backend.features.create'), route('admin.features.create'));
});

Breadcrumbs::register('admin.features.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.features.index');
    $breadcrumbs->push(_tr('menus.backend.features.edit'), route('admin.features.edit', $id));
});
