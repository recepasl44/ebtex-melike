<?php

Breadcrumbs::register('admin.grouptypes.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.grouptypes.management'), route('admin.grouptypes.index'));
});

Breadcrumbs::register('admin.grouptypes.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.grouptypes.index');
    $breadcrumbs->push(_tr('menus.backend.grouptypes.create'), route('admin.grouptypes.create'));
});

Breadcrumbs::register('admin.grouptypes.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.grouptypes.index');
    $breadcrumbs->push(_tr('menus.backend.grouptypes.edit'), route('admin.grouptypes.edit', $id));
});
