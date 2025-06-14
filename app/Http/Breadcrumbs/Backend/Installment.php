<?php

Breadcrumbs::register('admin.installments.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.installments.management'), route('admin.installments.index'));
});

Breadcrumbs::register('admin.installments.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.installments.index');
    $breadcrumbs->push(_tr('menus.backend.installments.create'), route('admin.installments.create'));
});

Breadcrumbs::register('admin.installments.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.installments.index');
    $breadcrumbs->push(_tr('menus.backend.installments.edit'), route('admin.installments.edit', $id));
});
