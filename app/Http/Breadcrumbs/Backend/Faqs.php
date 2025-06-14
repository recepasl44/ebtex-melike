<?php

Breadcrumbs::register('admin.faqs.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.faqs_management'), route('admin.faqs.index'));
});

Breadcrumbs::register('admin.faqs.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.faqs.index');
    $breadcrumbs->push(_tr('menus.backend.faqs.create'), route('admin.faqs.create'));
});

Breadcrumbs::register('admin.faqs.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.faqs.index');
    $breadcrumbs->push(_tr('menus.backend.faqs.edit'), route('admin.faqs.edit', $id));
});
