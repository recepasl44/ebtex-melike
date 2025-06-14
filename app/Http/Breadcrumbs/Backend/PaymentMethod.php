<?php

Breadcrumbs::register('admin.paymentmethods.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.paymentmethods.management'), route('admin.paymentmethods.index'));
});

Breadcrumbs::register('admin.paymentmethods.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.paymentmethods.index');
    $breadcrumbs->push(_tr('menus.backend.paymentmethods.create'), route('admin.paymentmethods.create'));
});

Breadcrumbs::register('admin.paymentmethods.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.paymentmethods.index');
    $breadcrumbs->push(_tr('menus.backend.paymentmethods.edit'), route('admin.paymentmethods.edit', $id));
});
