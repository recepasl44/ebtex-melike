<?php

Breadcrumbs::register('admin.paymentstatuses.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.paymentstatuses.management'), route('admin.paymentstatuses.index'));
});

Breadcrumbs::register('admin.paymentstatuses.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.paymentstatuses.index');
    $breadcrumbs->push(_tr('menus.backend.paymentstatuses.create'), route('admin.paymentstatuses.create'));
});

Breadcrumbs::register('admin.paymentstatuses.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.paymentstatuses.index');
    $breadcrumbs->push(_tr('menus.backend.paymentstatuses.edit'), route('admin.paymentstatuses.edit', $id));
});
