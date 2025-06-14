<?php

Breadcrumbs::register('admin.testtypes.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.testtypes.management'), route('admin.testtypes.index'));
});

Breadcrumbs::register('admin.testtypes.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.testtypes.index');
    $breadcrumbs->push(_tr('menus.backend.testtypes.create'), route('admin.testtypes.create'));
});

Breadcrumbs::register('admin.testtypes.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.testtypes.index');
    $breadcrumbs->push(_tr('menus.backend.testtypes.edit'), route('admin.testtypes.edit', $id));
});
