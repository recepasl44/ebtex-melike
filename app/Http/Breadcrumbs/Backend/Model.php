<?php

Breadcrumbs::register('admin.models.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.models.management'), route('admin.models.index'));
});

Breadcrumbs::register('admin.models.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.models.index');
    $breadcrumbs->push(_tr('menus.backend.models.create'), route('admin.models.create'));
});

Breadcrumbs::register('admin.models.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.models.index');
    $breadcrumbs->push(_tr('menus.backend.models.edit'), route('admin.models.edit', $id));
});
