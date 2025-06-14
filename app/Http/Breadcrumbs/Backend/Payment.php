<?php

Breadcrumbs::register('admin.payments.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.payments.management'), route('admin.payments.index'));
});

Breadcrumbs::register('admin.payments.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.payments.index');
    $breadcrumbs->push(_tr('menus.backend.payments.create'), route('admin.payments.create'));
});

Breadcrumbs::register('admin.payments.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.payments.index');
    $breadcrumbs->push(_tr('menus.backend.payments.edit'), route('admin.payments.edit', $id));
});
