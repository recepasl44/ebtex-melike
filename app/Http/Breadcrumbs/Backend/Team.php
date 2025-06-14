<?php

Breadcrumbs::register('admin.teams.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.teams_management'), route('admin.teams.index'));
});

Breadcrumbs::register('admin.teams.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.teams.index');
    $breadcrumbs->push(_tr('menus.backend.teams.create'), route('admin.teams.create'));
});

Breadcrumbs::register('admin.teams.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.teams.index');
    $breadcrumbs->push(_tr('menus.backend.teams.edit'), route('admin.teams.edit', $id));
});
