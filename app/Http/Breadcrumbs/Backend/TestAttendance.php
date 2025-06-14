<?php

Breadcrumbs::register('admin.testattendances.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.testattendances.management'), route('admin.testattendances.index'));
});

Breadcrumbs::register('admin.testattendances.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.testattendances.index');
    $breadcrumbs->push(_tr('menus.backend.testattendances.create'), route('admin.testattendances.create'));
});

Breadcrumbs::register('admin.testattendances.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.testattendances.index');
    $breadcrumbs->push(_tr('menus.backend.testattendances.edit'), route('admin.testattendances.edit', $id));
});
