<?php

Breadcrumbs::register('admin.jobs.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.jobs.management'), route('admin.jobs.index'));
});

Breadcrumbs::register('admin.jobs.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.jobs.index');
    $breadcrumbs->push(_tr('menus.backend.jobs.create'), route('admin.jobs.create'));
});

Breadcrumbs::register('admin.jobs.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.jobs.index');
    $breadcrumbs->push(_tr('menus.backend.jobs.edit'), route('admin.jobs.edit', $id));
});
