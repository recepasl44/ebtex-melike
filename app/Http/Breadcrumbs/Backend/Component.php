<?php

Breadcrumbs::register('admin.components.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.components.management'), route('admin.components.index'));
});

Breadcrumbs::register('admin.components.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.components.index');
    $breadcrumbs->push(_tr('menus.backend.components.create'), route('admin.components.create'));
});

Breadcrumbs::register('admin.components.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.components.index');
    $breadcrumbs->push(_tr('menus.backend.components.edit'), route('admin.components.edit', $id));
});
