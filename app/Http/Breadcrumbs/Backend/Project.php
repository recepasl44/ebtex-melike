<?php

Breadcrumbs::register('admin.projects.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.projects_management'), route('admin.projects.index'));
});

Breadcrumbs::register('admin.projects.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.projects.index');
    $breadcrumbs->push(_tr('menus.backend.projects.create'), route('admin.projects.create'));
});

Breadcrumbs::register('admin.projects.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.projects.index');
    $breadcrumbs->push(_tr('menus.backend.projects.edit'), route('admin.projects.edit', $id));
});
