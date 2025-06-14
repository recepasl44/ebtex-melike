<?php

Breadcrumbs::register('admin.opticalforms.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.opticalforms.management'), route('admin.opticalforms.index'));
});

Breadcrumbs::register('admin.opticalforms.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.opticalforms.index');
    $breadcrumbs->push(_tr('menus.backend.opticalforms.create'), route('admin.opticalforms.create'));
});

Breadcrumbs::register('admin.opticalforms.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.opticalforms.index');
    $breadcrumbs->push(_tr('menus.backend.opticalforms.edit'), route('admin.opticalforms.edit', $id));
});
