<?php

Breadcrumbs::register('admin.teamusers.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.teamusers_management'), route('admin.teamusers.index'));
});

Breadcrumbs::register('admin.teamusers.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.teamusers.index');
    $breadcrumbs->push(_tr('menus.backend.teamusers.create'), route('admin.teamusers.create'));
});

Breadcrumbs::register('admin.teamusers.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.teamusers.index');
    $breadcrumbs->push(_tr('menus.backend.teamusers.edit'), route('admin.teamusers.edit', $id));
});
