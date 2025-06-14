<?php

Breadcrumbs::register('admin.districts.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.districts.management'), route('admin.districts.index'));
});

Breadcrumbs::register('admin.districts.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.districts.index');
    $breadcrumbs->push(_tr('menus.backend.districts.create'), route('admin.districts.create'));
});

Breadcrumbs::register('admin.districts.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.districts.index');
    $breadcrumbs->push(_tr('menus.backend.districts.edit'), route('admin.districts.edit', $id));
});
