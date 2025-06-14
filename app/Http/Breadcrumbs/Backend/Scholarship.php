<?php

Breadcrumbs::register('admin.scholarships.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.scholarships.management'), route('admin.scholarships.index'));
});

Breadcrumbs::register('admin.scholarships.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.scholarships.index');
    $breadcrumbs->push(_tr('menus.backend.scholarships.create'), route('admin.scholarships.create'));
});

Breadcrumbs::register('admin.scholarships.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.scholarships.index');
    $breadcrumbs->push(_tr('menus.backend.scholarships.edit'), route('admin.scholarships.edit', $id));
});
