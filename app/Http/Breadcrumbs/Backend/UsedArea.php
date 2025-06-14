<?php

Breadcrumbs::register('admin.usedareas.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.usedareas.management'), route('admin.usedareas.index'));
});

Breadcrumbs::register('admin.usedareas.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.usedareas.index');
    $breadcrumbs->push(_tr('menus.backend.usedareas.create'), route('admin.usedareas.create'));
});

Breadcrumbs::register('admin.usedareas.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.usedareas.index');
    $breadcrumbs->push(_tr('menus.backend.usedareas.edit'), route('admin.usedareas.edit', $id));
});
