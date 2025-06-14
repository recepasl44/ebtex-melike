<?php

Breadcrumbs::register('admin.componentvalues.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.componentvalues.management'), route('admin.componentvalues.index'));
});

Breadcrumbs::register('admin.componentvalues.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.componentvalues.index');
    $breadcrumbs->push(_tr('menus.backend.componentvalues.create'), route('admin.componentvalues.create'));
});

Breadcrumbs::register('admin.componentvalues.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.componentvalues.index');
    $breadcrumbs->push(_tr('menus.backend.componentvalues.edit'), route('admin.componentvalues.edit', $id));
});
