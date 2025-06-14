<?php

Breadcrumbs::register('admin.meetings.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.meetings.management'), route('admin.meetings.index'));
});

Breadcrumbs::register('admin.meetings.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.meetings.index');
    $breadcrumbs->push(_tr('menus.backend.meetings.create'), route('admin.meetings.create'));
});

Breadcrumbs::register('admin.meetings.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.meetings.index');
    $breadcrumbs->push(_tr('menus.backend.meetings.edit'), route('admin.meetings.edit', $id));
});
