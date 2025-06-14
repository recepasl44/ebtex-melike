<?php

Breadcrumbs::register('admin.insurers.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.insurers.management'), route('admin.insurers.index'));
});

Breadcrumbs::register('admin.insurers.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.insurers.index');
    $breadcrumbs->push(_tr('menus.backend.insurers.create'), route('admin.insurers.create'));
});

Breadcrumbs::register('admin.insurers.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.insurers.index');
    $breadcrumbs->push(_tr('menus.backend.insurers.edit'), route('admin.insurers.edit', $id));
});
