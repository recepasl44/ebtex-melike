<?php

Breadcrumbs::register('admin.sliders.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.sliders_management'), route('admin.sliders.index'));
});

Breadcrumbs::register('admin.sliders.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.sliders.index');
    $breadcrumbs->push(_tr('menus.backend.sliders.create'), route('admin.sliders.create'));
});

Breadcrumbs::register('admin.sliders.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.sliders.index');
    $breadcrumbs->push(_tr('menus.backend.sliders.edit'), route('admin.sliders.edit', $id));
});
