<?php

Breadcrumbs::register('admin.firms.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.firms_management'), route('admin.firms.index'));
});

Breadcrumbs::register('admin.firms.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.firms.index');
    $breadcrumbs->push(_tr('menus.backend.firms.create'), route('admin.firms.create'));
});

Breadcrumbs::register('admin.firms.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.firms.index');
    $breadcrumbs->push(_tr('menus.backend.firms.edit'), route('admin.firms.edit', $id));
});
