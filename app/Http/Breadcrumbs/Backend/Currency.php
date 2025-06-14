<?php

Breadcrumbs::register('admin.currencies.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.currencies.management'), route('admin.currencies.index'));
});

Breadcrumbs::register('admin.currencies.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.currencies.index');
    $breadcrumbs->push(_tr('menus.backend.currencies.create'), route('admin.currencies.create'));
});

Breadcrumbs::register('admin.currencies.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.currencies.index');
    $breadcrumbs->push(_tr('menus.backend.currencies.edit'), route('admin.currencies.edit', $id));
});
