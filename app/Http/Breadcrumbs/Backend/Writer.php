<?php

Breadcrumbs::register('admin.writers.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.writers.management'), route('admin.writers.index'));
});

Breadcrumbs::register('admin.writers.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.writers.index');
    $breadcrumbs->push(_tr('menus.backend.writers.create'), route('admin.writers.create'));
});

Breadcrumbs::register('admin.writers.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.writers.index');
    $breadcrumbs->push(_tr('menus.backend.writers.edit'), route('admin.writers.edit', $id));
});
