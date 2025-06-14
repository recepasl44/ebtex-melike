<?php

Breadcrumbs::register('admin.quiznotes.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.quiznotes.management'), route('admin.quiznotes.index'));
});

Breadcrumbs::register('admin.quiznotes.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.quiznotes.index');
    $breadcrumbs->push(_tr('menus.backend.quiznotes.create'), route('admin.quiznotes.create'));
});

Breadcrumbs::register('admin.quiznotes.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.quiznotes.index');
    $breadcrumbs->push(_tr('menus.backend.quiznotes.edit'), route('admin.quiznotes.edit', $id));
});
