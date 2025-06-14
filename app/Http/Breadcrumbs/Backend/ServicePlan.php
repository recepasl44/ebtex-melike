<?php

Breadcrumbs::register('admin.serviceplans.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.serviceplans.management'), route('admin.serviceplans.index'));
});

Breadcrumbs::register('admin.serviceplans.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.serviceplans.index');
    $breadcrumbs->push(_tr('menus.backend.serviceplans.create'), route('admin.serviceplans.create'));
});

Breadcrumbs::register('admin.serviceplans.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.serviceplans.index');
    $breadcrumbs->push(_tr('menus.backend.serviceplans.edit'), route('admin.serviceplans.edit', $id));
});
