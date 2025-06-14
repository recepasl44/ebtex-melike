<?php

Breadcrumbs::register('admin.smsproviders.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.smsproviders.management'), route('admin.smsproviders.index'));
});

Breadcrumbs::register('admin.smsproviders.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.smsproviders.index');
    $breadcrumbs->push(_tr('menus.backend.smsproviders.create'), route('admin.smsproviders.create'));
});

Breadcrumbs::register('admin.smsproviders.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.smsproviders.index');
    $breadcrumbs->push(_tr('menus.backend.smsproviders.edit'), route('admin.smsproviders.edit', $id));
});
