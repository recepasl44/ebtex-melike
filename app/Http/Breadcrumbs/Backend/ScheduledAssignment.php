<?php

Breadcrumbs::register('admin.scheduledassignments.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.scheduledassignments.management'), route('admin.scheduledassignments.index'));
});

Breadcrumbs::register('admin.scheduledassignments.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.scheduledassignments.index');
    $breadcrumbs->push(_tr('menus.backend.scheduledassignments.create'), route('admin.scheduledassignments.create'));
});

Breadcrumbs::register('admin.scheduledassignments.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.scheduledassignments.index');
    $breadcrumbs->push(_tr('menus.backend.scheduledassignments.edit'), route('admin.scheduledassignments.edit', $id));
});
