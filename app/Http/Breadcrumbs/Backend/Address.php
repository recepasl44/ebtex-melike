<?php

Breadcrumbs::register('admin.addresses.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.addresses.management'), route('admin.addresses.index'));
});

Breadcrumbs::register('admin.addresses.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.addresses.index');
    $breadcrumbs->push(_tr('menus.backend.addresses.create'), route('admin.addresses.create'));
});

Breadcrumbs::register('admin.addresses.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.addresses.index');
    $breadcrumbs->push(_tr('menus.backend.addresses.edit'), route('admin.addresses.edit', $id));
});
