<?php

Breadcrumbs::register('admin.topics.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.topics.management'), route('admin.topics.index'));
});

Breadcrumbs::register('admin.topics.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.topics.index');
    $breadcrumbs->push(_tr('menus.backend.topics.create'), route('admin.topics.create'));
});

Breadcrumbs::register('admin.topics.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.topics.index');
    $breadcrumbs->push(_tr('menus.backend.topics.edit'), route('admin.topics.edit', $id));
});
