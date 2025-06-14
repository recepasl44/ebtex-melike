<?php

Breadcrumbs::register('admin.cards.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.cards_management'), route('admin.cards.index'));
});

Breadcrumbs::register('admin.cards.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.cards.index');
    $breadcrumbs->push(_tr('menus.backend.cards.create'), route('admin.cards.create'));
});

Breadcrumbs::register('admin.cards.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.cards.index');
    $breadcrumbs->push(_tr('menus.backend.cards.edit'), route('admin.cards.edit', $id));
});
