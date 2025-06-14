<?php

Breadcrumbs::register('admin.chapters.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.chapters.management'), route('admin.chapters.index'));
});

Breadcrumbs::register('admin.chapters.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.chapters.index');
    $breadcrumbs->push(_tr('menus.backend.chapters.create'), route('admin.chapters.create'));
});

Breadcrumbs::register('admin.chapters.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.chapters.index');
    $breadcrumbs->push(_tr('menus.backend.chapters.edit'), route('admin.chapters.edit', $id));
});
