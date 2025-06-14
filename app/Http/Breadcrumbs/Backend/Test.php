<?php

Breadcrumbs::register('admin.tests.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.tests.management'), route('admin.tests.index'));
});

Breadcrumbs::register('admin.tests.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.tests.index');
    $breadcrumbs->push(_tr('menus.backend.tests.create'), route('admin.tests.create'));
});

Breadcrumbs::register('admin.tests.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.tests.index');
    $breadcrumbs->push(_tr('menus.backend.tests.edit'), route('admin.tests.edit', $id));
});
