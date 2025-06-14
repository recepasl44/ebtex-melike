<?php

Breadcrumbs::register('admin.appointments.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.appointments.management'), route('admin.appointments.index'));
});

Breadcrumbs::register('admin.appointments.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.appointments.index');
    $breadcrumbs->push(_tr('menus.backend.appointments.create'), route('admin.appointments.create'));
});

Breadcrumbs::register('admin.appointments.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.appointments.index');
    $breadcrumbs->push(_tr('menus.backend.appointments.edit'), route('admin.appointments.edit', $id));
});
