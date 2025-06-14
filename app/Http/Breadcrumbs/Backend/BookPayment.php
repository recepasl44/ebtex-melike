<?php

Breadcrumbs::register('admin.bookpayments.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.bookpayments.management'), route('admin.bookpayments.index'));
});

Breadcrumbs::register('admin.bookpayments.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.bookpayments.index');
    $breadcrumbs->push(_tr('menus.backend.bookpayments.create'), route('admin.bookpayments.create'));
});

Breadcrumbs::register('admin.bookpayments.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.bookpayments.index');
    $breadcrumbs->push(_tr('menus.backend.bookpayments.edit'), route('admin.bookpayments.edit', $id));
});
