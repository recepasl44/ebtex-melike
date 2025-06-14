<?php

Breadcrumbs::register('admin.periods.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.periods.management'), route('admin.periods.index'));
});

Breadcrumbs::register('admin.periods.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.periods.index');
    $breadcrumbs->push(_tr('menus.backend.periods.create'), route('admin.periods.create'));
});

Breadcrumbs::register('admin.periods.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.periods.index');
    $breadcrumbs->push(_tr('menus.backend.periods.edit'), route('admin.periods.edit', $id));
});
